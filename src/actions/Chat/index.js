/* Action typo constants, use keyMirror helper */
import ActionTypes from "../../constant/action-types";

export function initChat(payload) {
    return { type: ActionTypes.INIT_CHAT, payload }
};

export function changeWhoIAm(payload) {
    return { type: ActionTypes.CHANGE_WHO_I_AM, payload }
};

export function changeWhoYouAre(payload) {
    return { type: ActionTypes.CHANGE_WHO_YOU_ARE, payload }
};

export function pushChatPool(payload) {
    return { type: ActionTypes.PUSH_CHAT_POOL, payload }
};

export function loadChatPool(payload) {
    return { type: ActionTypes.LOAD_CHAT_POOL, payload }
};

export function concatChatPool(payload) {
    return { type: ActionTypes.CONCAT_CHAT_POOL, payload }
};