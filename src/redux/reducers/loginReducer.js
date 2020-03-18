import { LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, CHANGE_USERNAME, CHANGE_PASSWORD, USERID_SET, CLOSE_LOGIN_FAIL} from "../actions/actionTypes";

let initialState = {
    username: '',
    password: '',
    isLogin: false,
    failed: false,
    jwtToken: '',
    userid: '',
    globalRole: ''
};

export default function loginReducer(state=initialState, action) {
    switch (action.type) {
        case CHANGE_USERNAME:
            return {...state, username: action.payload};
        case CHANGE_PASSWORD:
            return {...state, password: action.payload};
        case LOGIN_SUCCESS:
            return {...state, isLogin: true, failed: false, globalRole: action.payload};
        case USERID_SET:
            return {...state, userid: action.payload};
        case LOGIN_FAIL:
            return {...state, isLogin: false, failed: true};
        case LOG_OUT:
            return {...state, username: '', password: '', isLogin: false, failed: false, jwtToken: '', userid: ''};
        case CLOSE_LOGIN_FAIL:
            return {...state, failed: false};
        default:
            return state;
    }
}
