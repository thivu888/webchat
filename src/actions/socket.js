import {
    SEND_MESSAGE, UPDATE_CONVERSATION,
} from '../constant/action_constant';

export function sendMessage(message) {
    return {
        type: SEND_MESSAGE,
        message,
    };
}

export function updateconversation(payload) {
    return {
        type: UPDATE_CONVERSATION,
        payload
    };
}