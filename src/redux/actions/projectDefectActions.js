import {BASE_URL} from "../../constants";
import {CHANGE_CURRENTURL, CHANGE_DEFECTSTATE, GET_URL} from "./actionTypes";
import {formFailed} from "./userActions";

export function startChangeUrl() {
    return {
        type: CHANGE_DEFECTSTATE,
        payload: true
    }
}

export function cancelChangeUrl() {
    return {
        type: CHANGE_DEFECTSTATE,
        payload: false
    }
}

export function changeCurrentUrl(currentUrl) {
    return {
        type: CHANGE_CURRENTURL,
        payload: currentUrl
    }
}

export function changeUrl(projectId, url) {
    return async (dispatch) => {
        await fetch(BASE_URL + '/project/issue/' + projectId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({issue_tracker_url: url})
        }).then(res => res.json()
        ).then(data => {
            if (data.status === 'SUCCESS') {
                dispatch(cancelChangeUrl());
                dispatch({
                    type: GET_URL,
                    payload: url
                })
            } else {
                console.log(data.status);
                dispatch(formFailed('changeUrl'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('changeUrl'));
        });
    }
}

export function getUrl(projectId) {
    return async (dispatch) => {
        await fetch(BASE_URL + '/project/issue/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if (data.status === 'SUCCESS') {
                dispatch({
                    type: GET_URL,
                    payload: data.result
                })
            } else {
                console.log(data.status);
                dispatch(formFailed('defect'));
            }
        }).catch(error => {
            console.log(error)
            dispatch(formFailed('defect'));
        })
    }
}