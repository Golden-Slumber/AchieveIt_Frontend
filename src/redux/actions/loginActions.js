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

export function login(password, username) {
    // return async (dispatch) => {
    //     let content = {password: password, username: username};
    //     await fetch(BASE_URL+'/login', {
    //         method: 'POST',
    //         body: JSON.stringify(content),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(res => res.json()
    //     ).then(data=>{
    //         console.log(data);
    //         if(data.status === '200'){
    //             dispatch({type: LOGIN_SUCCESS, payload: data.jwtToken});
    //             dispatch({type: USERID_SET, payload: data.result});
    //             let end = new Date();
    //             dispatch({type: TIMELINE_INIT, payload: end});
    //             let start = new Date(end);
    //             let year = start.getFullYear();
    //             start.setFullYear(year-1);
    //             dispatch(getTimeline(data.jwtToken, start, end));
    //             dispatch({type: CLOSE_ILLEGAL_ACCESS});
    //             history.push('/');
    //             dispatch(switchHome());
    //         }else{
    //             dispatch({type: LOGIN_FAIL})
    //         }
    //     }).catch(error=>{
    //         console.log(error);
    //         dispatch({type: LOGIN_FAIL})
    //     });
    // }

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
    return {
        type: LOG_OUT
    }
}