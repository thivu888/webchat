import { combineReducers } from 'redux';
import chatControl from './control/Chat'
const rootReducer = combineReducers({
    chatControl,
});

export default rootReducer;
