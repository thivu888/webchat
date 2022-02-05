import ActionTypes from "../../constant/action-types";

const initialState = {
  video: false,
  audio: false,
  swtichCamera: false,
  isShowIncomingCall: null,
  isShowRinging: null,
  sessionId: "",
  token: "",
};

const tokbox = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SHOW_INCOMING:
      return Object.assign({}, state, {
        isShowIncomingCall: action.payload,
      });

    case ActionTypes.SET_SHOW_RINGING:
      return Object.assign({}, state, {
        isShowRinging: action.payload,
      });
    case ActionTypes.SET_AUDIO:
      return Object.assign({}, state, { audio: action.payload });

    case ActionTypes.SET_VIDEO:
      return Object.assign({}, state, { video: action.payload });

    case ActionTypes.SET_DATA_CALL:
      return Object.assign({}, state, { ...action.payload });

    case ActionTypes.RESET_DATA_CALL:
      return Object.assign({}, state, {
        video: false,
        audio: false,
        swtichCamera: false,
        isShowIncomingCall: null,
        isShowRinging: null,
        sessionId: "",
        token: "",
      });
    default:
      return state;
  }
};

export default tokbox;
