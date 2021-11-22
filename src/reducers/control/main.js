import ActionTypes from '../../constant/action-types';

const initialState = {
    focusContentRight : true,
    isDesktop : true,
    targetContent: 'message',
    targetContentRight: 'addfriend',
}

const pure = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_FOCUS_RIGHT:
            return Object.assign({},state,{
                focusContentRight: action.payload,
            })

        case ActionTypes.UPDATE_ISDESKTOP:
            return Object.assign({},state,{
                isDesktop: action.payload,
            })
        
        case ActionTypes.UPDATE_TARGET_CONTENT:
            return Object.assign({},state,{
                targetContent: action.payload,
            })

        case ActionTypes.UPDATE_TARGET_CONTENT_RIGHT:
            return Object.assign({},state,{
                targetContentRight: action.payload,
            })
        default:
            return state;
    }

}

export default pure;
