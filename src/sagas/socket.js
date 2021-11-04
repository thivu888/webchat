import moment from 'moment';
import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import {MessageTypes } from '../constant/types';
import connectSocket from '../utils/socket-io';
import {SocketEvents} from "../constant/events";
import { pushChatPool } from '../actions/Chat';
import {SEND_MESSAGE} from '../constant/action_constant';
import storage from '../utils/storage';

const getConversationId = state => state.chatControl.conversationId;

export const createMessageSocket = (message) => {
    const me = storage.getUserInfo();
    const sender = me._id;
    const now = moment().utc().valueOf();
    const msgId = message.message_id || now + Math.round(Math.random()*10000001);
    let serve = {
        uerId: sender,
        message_id: +msgId,
        type: message.type,
        content: message.content
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
    console.log(action.message)
    const conversationId = yield select(getConversationId);
    if (action.message && action.message.type === MessageTypes.READ) {
        const messageRead = {
            ... action.message,
            roomId: conversationId,
        }
        yield call(send, messageRead);
        return;
    }
    const message = createMessageSocket(action.message);
    message.roomId = conversationId;
    yield put(pushChatPool({message: message }));
    yield call(send, message);
}

export function* watchSocketAsync() {
    yield takeEvery(SEND_MESSAGE, socketSendMessage);
}