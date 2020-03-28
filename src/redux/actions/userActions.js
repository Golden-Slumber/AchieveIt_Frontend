import {CHANGE_FAILEDSTATE, SET_GLOBALROLE, SET_USERNAME} from "./actionTypes";
import {BASE_URL} from "../../constants";
import cookie from "react-cookies";

export function formFailed(form){
    return {
        type: CHANGE_FAILEDSTATE,
        payload: form
    }
}

export function closeFailed(){
    return {
        type: CHANGE_FAILEDSTATE,
        payload: ''
    }
}

export function setUserName(username){
    return {
        type: SET_USERNAME,
        payload: username
    }
}

export function setGlobalRole(){
    return async (dispatch) => {
        await fetch(BASE_URL+'/user/globalRole/self', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: SET_GLOBALROLE,
                    payload: data.result.global_role_name
                });
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}