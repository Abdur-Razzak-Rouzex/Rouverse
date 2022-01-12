import {USER_LOGIN, USER_LOGOUT} from "../actionTypes/userActionType";

export const loginUser = (userInfo) => {
    return {
        type: USER_LOGIN,
        payload: userInfo
    }
}

export const logoutUser = () => {
    return {
        type: USER_LOGOUT
    }
}