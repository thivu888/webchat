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

        case ActionTypes.LOAD_CHAT_POOL:
            console.log('LOAD_CHAT_POOL')

            if (action.payload.data) {
                const chain = [];
                action.payload.data.concat().reverse().forEach(piece => {
                    chain[piece.id] = piece;
                });

                const chainEntries = Object.entries(chain);
                const newestMessage = chainEntries.length > 0 ? chainEntries[chainEntries.length - 1][1] : null;
                const currentLastMessage =  action.payload.data.length === 0 ? null : action.payload.data[action.payload.data.length - 1];


                return Object.assign({}, state, {
                    serverChain: chain,
                    clientChain: chain,
                    newestMessage,
                    hasLoadMore: false,
                    currentLastMessage,
                });
            }
            return state;
        
        case ActionTypes.CONCAT_CHAT_POOL:
            console.log('CONCAT_CHAT_POOL')

            if (action.payload.data) {
                const data = action.payload.data
                const pawn = [];
                const chain = state.clientChain;
                const currentLastMessage = action.payload.data.length === 0 ? null : action.payload.data[action.payload.data.length - 1];
                data.concat().reverse().forEach(piece => {
                    pawn[piece.message_id] = piece;
                });
                Object.entries(chain).forEach(([key, value]) => {
                    pawn[key] = value;
                });
                console.log(currentLastMessage)
                return Object.assign({}, state, {
                    clientChain: pawn,
                    hasLoadMore: !!action.payload.data.length,
                    currentLastMessage,
                    hasNewMessageToScroll:false,
                });
            }

            return state;

        case ActionTypes.PUSH_CHAT_POOL:
            console.log('PUSH_CHAT_POOL')
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
