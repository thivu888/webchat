import moment from 'moment';
import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import {MessageTypes } from '../constant/types';
import connectSocket from '../utils/socket-io';
import {SocketEvents} from "../constant/events";
import { pushChatPool, updateConversationId, updateAvatarsConverSation, updateNameConverSation, updateTime, changeWhoYouAre } from '../actions/Chat';

import {SEND_MESSAGE, UPDATE_CONVERSATION} from '../constant/action_constant';
import storage from '../utils/storage';
import UserService from '../services/user';
import { hashArr } from '../utils/createConversationId';

const getConversationId = state => state.chatControl.conversationId;
const getUserIdOnConversation = state => state.chatControl.yous;


export const createMessageSocket = (message) => {
    const me = storage.getUserInfo();
    const now = moment().utc().valueOf();
    const msgId = message.message_id || now + Math.round(Math.random()*10000001);
    let serve = {
        _id: +msgId,
        userId: {
            _id: me._id,
            username: me.username,
            avatar: me.avatar
        },
        type: message.type,
        content: message.content,
        createdAt: Date.now(),
        updatedAt:  Date.now(),
    };
    return serve;
};

// ***********************************************************

const send = (message) => new Promise((resolve => {
    const socket = connectSocket();
    if (socket.disconnected) {
        window.queueSocket = window.queueSocket || [];
        window.queueSocket.push(message);
        console.info('Wait connect socket', message);
        resolve();
        return;
    }

    let event = SocketEvents.NEW_MESSAGE;
    switch (message.type) {
        case MessageTypes.STOP_TYPING:
        case MessageTypes.TYPING:
            event = SocketEvents.TYPING;
            break;

        case MessageTypes.READ:
            event = SocketEvents.READ;
            break;
        default:
            break;
    }
    window.socket.emit(event, message);
    console.info('%cEMIT Socket', 'font-weight: bold; color: green', message);
    resolve();
}));

export function* socketSendMessage(action) {
    const conversationId = yield select(getConversationId);
    const userIds = yield select(getUserIdOnConversation);
    const message = createMessageSocket(action.message);
    message.roomId = conversationId;
    message.userIds = Object.keys(userIds);
    if (action.message && action.message.type === MessageTypes.READ) {
        yield call(send, message);
        return;
    }
    yield put(pushChatPool({message: message }));
    yield call(send, message);
}

export function* setConverSation(action) {

    const me = storage.getUserInfo();
    let listUser = [];
    let conversationId = ""; 
    if( Array.isArray(action.payload.roomId) ){
        conversationId = hashArr([...action.payload.roomId,me._id])
    }else {
        conversationId = action.payload.roomId;
    }
    yield put(updateAvatarsConverSation(action.payload.avatars))
    yield put(updateTime(action.payload.updatedAt))
    yield put(updateNameConverSation(action.payload.name))
    yield put(updateConversationId(conversationId))
    const response = yield call(UserService.getUsersInRoom, conversationId);
    if( response.data.length > 1) {
        listUser = [...response.data]
    }
    else {
        listUser = [...action.payload.users,me]
    }
    yield put(changeWhoYouAre(listUser))
}

export function* watchSocketAsync() {
    yield takeEvery(SEND_MESSAGE, socketSendMessage);
    yield takeEvery(UPDATE_CONVERSATION, setConverSation);
}