import {
    JOIN_CALL_REQUEST,
    MAKE_CALL_REQUEST,
    TRANFER_CALL_DATA,
    END_CALL_REQUEST,
} from "../constants/action_constant";

export function tranferCallData(message) {
    return {
        type: TRANFER_CALL_DATA,
        message,
    };
}

export function makeCallRequest(message) {
    return {
        type: MAKE_CALL_REQUEST,
        message,
    };
}

export function joinCallRequest(message) {
    return {
        type: JOIN_CALL_REQUEST,
        message,
    };
}

export function endCallRequest(message) {
    return {
        type: END_CALL_REQUEST,
        message,
    };
}

