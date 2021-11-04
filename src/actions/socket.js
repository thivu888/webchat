import {
    SEND_MESSAGE,
} from '../constant/action_constant';

export function sendMessage(message) {
    return {
        type: SEND_MESSAGE,
        message,
    };
}