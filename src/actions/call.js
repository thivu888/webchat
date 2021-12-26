import ActionTypes from '../constant/action-types';


export function tranferCallData(payload) {
    return {
        type: ActionTypes.SET_DATA_CALL,
        payload,
    };
}

export function setShowIncomming(payload) {
    return {
        type: ActionTypes.SET_SHOW_INCOMING,
        payload,
    };
}

export function setShowRinging(payload) {
    return {
        type: ActionTypes.SET_SHOW_RINGING,
        payload,
    };
}


