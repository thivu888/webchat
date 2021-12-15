import ActionTypes from '../../constant/action-types';

const initialState = {
    video: false,
    audio: false,
    swtichCamera: false,
    isShowIncomingCall: false,
    sessionId: "",
    tokenId: "",
};

const tokbox = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_SHOW_INCOMING:
            return Object.assign({}, state,{
                isShowIncomingCall: action.payload
                }
            );

        case ActionTypes.SET_AUDIO:
            return Object.assign({}, state,{audio: action.payload});

        case ActionTypes.SET_VIDEO:
            return Object.assign({}, state,{video: action.payload});

        case ActionTypes.SET_DATA_CALL:
                return Object.assign({}, state,{...action.payload});

        default:
            return state;
    }
}

export default tokbox;
