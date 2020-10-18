import { combineReducers } from 'redux';
import * as actionTypes from '../actions/Types';


const initialUserState = {
    logged_session:false
};

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                logged_session: true
            };
        case actionTypes.CLEAR_USER:
            return {
                ...initialUserState,
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user: user_reducer
});

export default rootReducer;
