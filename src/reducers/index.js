import { combineReducers } from 'redux';
import chatControl from './control/Chat'
import main from './control/main'
const rootReducer = combineReducers({
    chatControl,
    main,
});

export default rootReducer;
