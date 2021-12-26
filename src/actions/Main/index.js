import ActionTypes from "../../constant/action-types";


export function updateFocusRight(payload) {
    return { type: ActionTypes.UPDATE_FOCUS_RIGHT, payload }
};

export function updateIsDesktop(payload) {
    return { type: ActionTypes.UPDATE_ISDESKTOP, payload }
};

export function updateTargetContent(payload) {
    return { type: ActionTypes.UPDATE_TARGET_CONTENT, payload }
};

export function updateTargetContentRight(payload) {
    return { type: ActionTypes.UPDATE_TARGET_CONTENT_RIGHT, payload }
};

export function updateUserInfo(payload) {
    return { type: ActionTypes.UPDATE_USER_INFO, payload }
};

export function updateShowAddGroup(payload) {
    return { type: ActionTypes.UPDATE_SHOW_ADD_GROUP, payload }
};

export function updateShowAddFriend(payload) {
    return { type: ActionTypes.UPDATE_SHOW_ADD_FRIEND, payload }
};
