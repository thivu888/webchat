
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

export function updateSendFile(payload) {
    return { type: ActionTypes.UPDATE_SEND_FILE, payload }
};

export function updateViewFile(payload) {
    return { type: ActionTypes.UPDATE_VIEW_FILE, payload }
};

export function updateConversations(payload) {
    return { type: ActionTypes.UPDATE_CONVERSATIONS, payload }
};

export function updateConversationId(payload) {
    return { type: ActionTypes.UPDATE_CONVERSATIONId, payload }
};

export function updateAvatarsConverSation(payload) {
    return { type: ActionTypes.UPDATE_AVATARS, payload }
};

export function updateNameConverSation(payload) {
    return { type: ActionTypes.UPDATE_NAME, payload }
};

export function updateTime(payload) {
    return { type: ActionTypes.UPDATE_TIME, payload }
};