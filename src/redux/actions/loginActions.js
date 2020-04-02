import history from '../../history';
import {
    CHANGE_PASSWORD,
    CHANGE_USERNAME,
    CLOSE_LOGIN_FAIL,
    LOG_OUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    TIMELINE_INIT,
    USERID_SET,
    CLOSE_ILLEGAL_ACCESS, SWITCH_HOME, CHANGE_FAILEDSTATE, SET_USERID
} from "./actionTypes";
import {switchHome, switchIndex} from "./pageSwitchActions";
import {BASE_URL} from "../../constants";
import {getRelativeProjects} from "./projectHomeActions";
import MD5 from 'crypto-js/md5';
import {formFailed, setGlobalRole, setUserName} from "./userActions";
import cookie from "react-cookies";
import { sessionService } from 'redux-react-session';

export function login(password, username) {
    return async (dispatch) => {
        let cryptoPassword = MD5(password).toString();
        console.log(cryptoPassword);
        let content = {username: username, password: cryptoPassword};
        await fetch(BASE_URL+'/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(content)
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
            if (data.status === 'SUCCESS') {
                console.log(data.result.JWT);
                // sessionService.saveSession(data.result.JWT);
                history.push('/project');
                dispatch({
                    type: LOGIN_SUCCESS
                });
                dispatch({
                    type: SET_USERID,
                    payload: data.result.user_id
                })
                dispatch(setUserName(username));
                dispatch(setGlobalRole());
            } else {
                console.log(data.status);
                dispatch(formFailed('login'));
            }
        }).catch(error=>{
            console.log('error');
            dispatch(formFailed('login'));
        });
    }
}

export function changePassword(password) {
    return {
        type: CHANGE_PASSWORD,
        payload: password
    }
}

export function changeUsername(username) {
    return {
        type: CHANGE_USERNAME,
        payload: username
    }
}

export function logOut() {
    // sessionService.deleteSession();
    return {
        type: LOG_OUT
    }
}