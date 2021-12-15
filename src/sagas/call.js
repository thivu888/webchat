/*eslint-disable*/
import { takeEvery,put, call } from 'redux-saga/effects';
import {TRANFER_CALL_DATA, MAKE_CALL_REQUEST, JOIN_CALL_REQUEST, END_CALL_REQUEST, PICK_CALL_REQUEST, DECLINE_CALL_REQUEST, REQUEST_PREMIUM, REQUEST_MAIN_ROLE} from '../constants/action_constant';
import {CallEvents, CallReasons, CallStates, ReasonEndCall, RoleUsers, UserCallTypes} from "../constants/call-events";
import storage from "../utils/storage";
import UserService from '../services/user';
import AuthService from '../services/authentication';
import {ringing, stopRinging} from "../utils/audioNotification";
import AudioOutGoing from "../statics/audio/outgoing.mp3";
import AudioIncoming from "../statics/audio/incoming.mp3";
import CallService from "../services/toxbox-call";
import endCallSound from "../statics/audio/endcall.wav";
import history from "../utils/history";
import {displaySurveyPopup, setCallDataRedux} from "../actions";
import {AccountType, PrimaryUtilityTypes} from "../constants/types";
import moment from "moment";
import {closeWebView} from "../actions/webview";

const resetCallData = {
    callState: CallStates.END_CALL,
    isAllowRequestPremium: true,
    isShowIncomingCall: false,
    isShowAnimation: false,
    isOpenBuyPoint: false,
    disableBtn: true,
    sessionId: "",
    tokenId: "",
    audio: false,
    video: false,
};

export function* removeDataCall(reasonEndCall) {
    const sessionId = window.store.getState().tokbox.sessionId || storage.getCallData().sessionId;
    const {callType, callState, isShowPopupEndCall} = window.store.getState().tokbox;
    if (isShowPopupEndCall || !sessionId) return;

    stopRinging();
    CallService.clearCallTimeOut();
    storage.deleteCallData()

    // reset call redux data and set show popup end-call data
    const showPopupEndCall = !!(callType === PrimaryUtilityTypes.VIDEO && callState === CallStates.CALL_READY && ReasonEndCall[reasonEndCall]);

    if (showPopupEndCall) {
        const me = yield call(AuthService.getInfo);

        if (me.account_type !== AccountType.APPLE_USER) {
            const checkSurveyPopupResponse = yield call(CallService.checkSurveyPopup);
            yield put(displaySurveyPopup(checkSurveyPopupResponse.is_active));
        }
    }

    yield put(setCallDataRedux({ ...resetCallData, ...{isShowPopupEndCall: showPopupEndCall, reasonEndCall}} ));

    if (location.pathname.indexOf('call') !== -1) history.goBack();
}

export function* makeCallRequest(action) {
    ringing(AudioOutGoing);

    const {partnerId, callType} = action.message;
    const PartnerInfo = yield call(UserService.getUserInfo, partnerId);
    const OwnerInfo   = storage.getUserInfo();

    CallService.setMakeCallTimeOut();
    CallService.tranferCallData({CallerInfo: OwnerInfo, CalleeInfo: PartnerInfo, callType, messageType: CallEvents.MAKE_CALL});
}

export function joinCallRequest(action) {
    CallService.tranferCallData({sessionId: action.message.sessionId, messageType: CallEvents.JOIN_CALL});
}

export function* endCallRequest(action) {
    const reason = action.message.reason;
    CallService.endCall(action.message.reason);

    if (reason !== CallReasons.F5_OR_BACK_PAGE) {
        ringing(endCallSound, false);
    } else {
        yield call(removeDataCall, reason);
    }
}

export function* receiveCallHandle(action) {
    ringing(AudioIncoming);

    storage.saveCallData({role:RoleUsers.MAIN_MALE});
    CallService.setReceiveCallTimeOut();
    CallService.tranferCallData({sessionId: action.message.sessionId, messageType : CallEvents.NOTIFY_RECEIVED});
}

export function* declineCallRequest(action) {
    stopRinging();
    CallService.clearCallTimeOut();
    yield put(setCallDataRedux({isShowIncomingCall: false}));
    CallService.tranferCallData({sessionId: action.message.sessionId, messageType : CallEvents.DECLINE_CALL});
}

export function* requestPremium(action) {
    CallService.tranferCallData({sessionId: action.message.sessionId, messageType : CallEvents.REQUEST_PREMIUM});
}

export function* requestMainRole(action) {
    CallService.tranferCallData({sessionId: action.message.sessionId, messageType : CallEvents.REQUEST_MAIN_ROLE});
}

export function* pickCallRequest(action) {
    stopRinging();
    CallService.clearCallTimeOut();

    const {sessionId, callType, callerId} = action.message;
    const audio = (callType === "VOICE");

    yield put(closeWebView());
    yield put(setCallDataRedux({isShowIncomingCall: false, audio, disableBtn: false}));
    CallService.tranferCallData({sessionId, messageType : CallEvents.PICK_UP});

    const url = (callType === 'VIDEO') ? '/video-call' : '/voice-call';
    history.push({pathname: url, state: {type:UserCallTypes.RECEIVE_CALL, partner_id:callerId, video: !audio, callTime: moment().unix()}});
}

export function* streamReadyCall() {
    stopRinging();
    CallService.clearCallTimeOut();
    CallService.timeCounting();
    CallService.setPingTimeOut();
    CallService.setPongTimeOut();
}

export function* tranferSocketCallData(data) {
    switch (data.message.messageType) {
        case CallEvents.JOIN_CALL_SUCCESS:
            yield streamReadyCall();
            break;

        case CallEvents.STREAMING_READY:
            yield streamReadyCall();
            break;

        case CallEvents.CALL_PONG:
            CallService.updateLastTimePong();
            break;

        case CallEvents.STATE_END:
            yield removeDataCall(data.message.reason);
            break;

        case CallEvents.NOTIFY:
            yield call(receiveCallHandle, data);
            break;

        default:
            CallService.tranferCallData(data);
            break;
    }
}

export function* watchCallAsync() {
    yield takeEvery(TRANFER_CALL_DATA, tranferSocketCallData);
    yield takeEvery(MAKE_CALL_REQUEST, makeCallRequest);
    yield takeEvery(JOIN_CALL_REQUEST, joinCallRequest);
    yield takeEvery(END_CALL_REQUEST, endCallRequest);
}
