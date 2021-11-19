import ActionTypes from '../../constant/action-types';

const initialState = {
    focusContentRight : true,
    isDesktop : true,
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

        default:
            return state;
    }

}

export default pure;
