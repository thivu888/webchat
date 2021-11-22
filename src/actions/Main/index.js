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
