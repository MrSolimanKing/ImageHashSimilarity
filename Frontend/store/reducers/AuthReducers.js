// AuthReducers
import { USERNAME, EMAIL, PASSWORD } from '../actions/AuthType'


const AccountInitialState = {
    userUsername: "",
    userEmail: "",
    userPassword: "",
}


const accountAuthReducer = (state = AccountInitialState, action ) => {
    switch(action.type){
        case USERNAME:
            return {
                ...state,
                userUsername: action.data
            }
        case EMAIL:
            return {
                ...state,
                userEmail: action.data
            }
        case PASSWORD:
            return {
                ...state,
                userPassword: action.data
            }
    default:
        return state  
    }
}

export default accountAuthReducer;