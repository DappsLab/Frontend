import * as actionTypes from "./user.types";

const initialUserState = {
    logged_session:false,
    currentUser:null
};

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
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
export default userReducer;