import ActionTypes from "../../constant/action-types";

const initialState = {
  me: { id: null, data: {} },
  yous: {},
  avatars: [],
  updatedAt: Date.now(),
  name: null,
  pendingFileMessage: null,
  hasNewMessageToScroll: false,
  newestMessage: null,
  currentLastMessage: null,
  serverChain: [],
  clientChain: [],
  isTyping: false,
  hasLoadMore: true,
  listConversations: [],
  conversationId: null,
  isSendingFile: false,
  isOpenRecordAudio: false,
  isStartRecordingAudio: false,
  isEndRecordingAudio: false,
  isCancelRecordingAudio: false,
  userMedia: null,
  isViewFile: null,
};

const pure = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INIT_CHAT:
      return Object.assign({}, state, {
        me: { id: null, data: {} },
        yous: {},
        avatars: [],
        updatedAt: Date.now(),
        name: null,
        pendingFileMessage: null,
        hasNewMessageToScroll: false,
        newestMessage: null,
        currentLastMessage: null,
        serverChain: [],
        clientChain: [],
        isTyping: false,
        hasLoadMore: true,
        listConversations: [],
        conversationId: null,
        isSendingFile: false,
        isOpenRecordAudio: false,
        isStartRecordingAudio: false,
        isEndRecordingAudio: false,
        isCancelRecordingAudio: false,
        userMedia: null,
        isViewFile: null,
      });

    case ActionTypes.CHANGE_WHO_I_AM:
      return Object.assign({}, state, {
        me: { id: action.payload.id, data: action.payload.data },
      });

    case ActionTypes.CHANGE_WHO_YOU_ARE:
      const newYou = {};
      action.payload.forEach((item) => {
        newYou[item._id] = item;
      });
      return Object.assign({}, state, {
        yous: newYou,
      });

    case ActionTypes.LOAD_CHAT_POOL:
      if (action.payload.data) {
        const chain = [];
        action.payload.data
          .concat()
          .reverse()
          .forEach((piece) => {
            chain[piece._id] = piece;
          });

        const chainEntries = Object.entries(chain);
        const newestMessage =
          chainEntries.length > 0
            ? chainEntries[chainEntries.length - 1][1]
            : null;
        const currentLastMessage =
          action.payload.data.length === 0
            ? null
            : action.payload.data[action.payload.data.length - 1];

        return Object.assign({}, state, {
          serverChain: chain,
          clientChain: chain,
          newestMessage,
          hasLoadMore: false,
          currentLastMessage,
          hasNewMessageToScroll: true,
        });
      }
      return state;

    case ActionTypes.CONCAT_CHAT_POOL:
      if (action.payload.data) {
        const data = action.payload.data;
        const pawn = [];
        const chain = state.clientChain;
        const currentLastMessage =
          action.payload.data.length === 0
            ? null
            : action.payload.data[action.payload.data.length - 1];
        data
          .concat()
          .reverse()
          .forEach((piece) => {
            pawn[piece._id] = piece;
          });
        Object.entries(chain).forEach(([key, value]) => {
          pawn[key] = value;
        });
        return Object.assign({}, state, {
          clientChain: pawn,
          hasLoadMore: !!action.payload.data.length,
          currentLastMessage,
          hasNewMessageToScroll: false,
        });
      }

      return state;

    case ActionTypes.PUSH_CHAT_POOL:
      return Object.assign({}, state, {
        clientChain: ((message) => {
          const chain = state.clientChain;
          const pawn = [];
          chain[message._id] = message;
          Object.entries(chain).forEach(([key, value]) => {
            pawn[key] = value;
          });
          return pawn;
        })(action.payload.message),
        newestMessage: action.payload.message,
        hasNewMessageToScroll: true,
      });

    case ActionTypes.UPDATE_SEND_FILE:
      return Object.assign({}, state, {
        isSendingFile: action.payload,
      });

    case ActionTypes.UPDATE_VIEW_FILE:
      return Object.assign({}, state, {
        isViewFile: action.payload,
      });

    case ActionTypes.UPDATE_CONVERSATIONS:
      return Object.assign({}, state, {
        listConversations: action.payload,
      });

    case ActionTypes.UPDATE_CONVERSATIONId:
      return Object.assign({}, state, {
        conversationId: action.payload,
      });

    case ActionTypes.UPDATE_AVATARS:
      return Object.assign({}, state, {
        avatars: action.payload,
      });

    case ActionTypes.UPDATE_NAME:
      return Object.assign({}, state, {
        name: action.payload,
      });
    case ActionTypes.UPDATE_TIME:
      return Object.assign({}, state, {
        updatedAt: action.payload,
      });
    case ActionTypes.SET_USER_MEDIA:
      return Object.assign({}, state, {
        userMedia: action.payload,
      });

    case ActionTypes.SET_IS_START_RECORD:
      return Object.assign({}, state, {
        isStartRecordingAudio: action.payload,
      });

    case ActionTypes.SET_IS_END_RECORD:
      return Object.assign({}, state, {
        isEndRecordingAudio: action.payload,
      });

    case ActionTypes.SET_IS_RECORD:
      return Object.assign({}, state, {
        isOpenRecordAudio: action.payload,
      });

    default:
      return state;
  }
};

export default pure;
