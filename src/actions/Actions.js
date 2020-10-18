import * as actionTypes from "./Types";

export const setUser = () => {
    return {
        type: actionTypes.SET_USER,
    };
};
export const clearUser=()=>{
    return{
        type:actionTypes.CLEAR_USER
    }
}