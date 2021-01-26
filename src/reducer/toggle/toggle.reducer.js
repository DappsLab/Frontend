import ToggleActionTypes from "./toggle.types";
const INITIAL_STATE={
    hidden:true
};
const toggleReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ToggleActionTypes.TOGGLE_HIDDEN:
            return{
                ...state,
                hidden:!state.hidden
            }
        default:
            return state;
    }
}

export default toggleReducer;