import { combineReducers } from 'redux';
import chatControl from './control/Chat'
import main from './control/main'
import tokbox from './control/tokbox'
const rootReducer = combineReducers({
    chatControl,
    main,
    tokbox,
});

export default rootReducer;
