import ActionTypes from '../../constant/action-types';


const initialState = {
    socket: null,
    isSocketNewMessageListenersLoadedFully: false,
    me: { id: null, data: {} },
    you: { id: null, conversationId: null, data: {} },
    pendingFileMessage: null,
    hasNewMessageToScroll: false,
    newestMessage: null,
    arrivedRawMessage: null,
    standbyMessage: '',
    emoji: {},
    currentLastMessage: null,
    serverChain: [],
    clientChain: [],
    isTyping: false,
    hasLoadMore: true,
    listConversation: [],
    conversationId: null,
    isSendingFile: false,
    isOpenRecordAudio: false,
    isStartRecordingAudio: false,
    isEndRecordingAudio: false,
    isCancelRecordingAudio: false,
    userMedia: null,
};

const pure = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.INIT_CHAT:
            return Object.assign({}, state, {
                pendingFileMessage: null,
                standbyMessage: '',
                you: { id: null, conversationId: null, data: {} },
                imageBox: {
                    isOpened: false,
                    message: null,
                },
                isHeaderMenuOpened: false,
                isFooterPlusMenuOpened: false,
                isFooterEmoticonMenuOpened: false,
                isFooterKeyBoardOpened: true,
                isGiftPoolOpened: false,
                isOpenGalleryHistory: false,
                isOpenTemplate: false,
                serverChain: [],
                clientChain: [],
                loadingStatus: { flag: false, message: null },
                hasLoadMore: true,
                isTyping: false,
            });

        case ActionTypes.CHANGE_WHO_I_AM:
            return Object.assign({}, state, {
                me: { id: action.payload.id, data: action.payload.data },
            });

        case ActionTypes.CHANGE_WHO_YOU_ARE:
            return Object.assign({}, state, {
                you: { id: action.payload.id, conversationId: state.conversationId, data: action.payload.data },
            });
        
        case ActionTypes.PUSH_CHAT_POOL:
            return Object.assign({}, state, {
                clientChain: ((message) => {
                    const chain = state.clientChain;
                    const pawn = [];
                    chain[message.message_id] = message;
                    Object.entries(chain).forEach(([key, value]) => {
                        pawn[key] = value;
                    });
                    return pawn;
                })(action.payload.message),
                newestMessage: action.payload.message,
                hasNewMessageToScroll: true,
            });

        default:
            return state;
    }
};

export default pure;
