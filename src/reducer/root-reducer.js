import { combineReducers } from 'redux';
import userReducer from "./user/user.reducer";
import toggleReducer from "./toggle/toggle.reducer";


const rootReducer = combineReducers({
    user: userReducer,
    toggle:toggleReducer,
});

export default rootReducer;
