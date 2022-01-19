import {USER_LOGIN, USER_LOGOUT} from '../actionTypes/userActionType'
import Cookies from "js-cookie";

const initialState = {
    userInfo: Cookies.get('userInfo')
        ? JSON.parse(Cookies.get('userInfo'))
        : null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {...state, userInfo: action.payload};
        case USER_LOGOUT:
            return {...state, userInfo: null};
        default:
            return state;
    }
}

export default userReducer;