import {
    CHANGE_ADMIN,
    CHANGE_FAILEDSTATE,
    CHNAGE_SUCCESSSTATE,
    SET_GLOBALROLE,
    SET_PROJECTROLES,
    SET_USERNAME
} from "./actionTypes";
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

export function formSuccess(form) {
    return {
        type: CHNAGE_SUCCESSSTATE,
        payload: form
    }
}

export function closeSuccess(){
    return {
        type: CHNAGE_SUCCESSSTATE,
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

export function setProjectRoles(projectId, user_id){
    return async (dispatch) => {
        await fetch(BASE_URL+'/user/userProjectRole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({project_id: projectId, user_id: user_id})
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: SET_PROJECTROLES,
                    payload: data.result.project_role_id_list
                });
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

export function checkPropertyAdmin(projectRoles){
    let check = false;
    for(let i=0; i<projectRoles.length; i++){
        if(projectRoles[i].project_role_name === 'PropertyAdmin'){
            check = true;
            break;
        }
    }
    return {
        type: CHANGE_ADMIN,
        payload: check
    }
}