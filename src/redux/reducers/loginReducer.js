import { LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, CHANGE_USERNAME, CHANGE_PASSWORD, USERID_SET, CLOSE_LOGIN_FAIL} from "../actions/actionTypes";

let initialState = {
    username: '',
    password: '',
    isLogin: false
};

export default function loginReducer(state=initialState, action) {
    switch (action.type) {
        case CHANGE_USERNAME:
            return {...state, username: action.payload};
        case CHANGE_PASSWORD:
            return {...state, password: action.payload};
        case LOGIN_SUCCESS:
            return {...state, isLogin: true};
        case LOG_OUT:
            return {...state, username: '', password: '', isLogin: false};
        default:
            return state;
    }
}
