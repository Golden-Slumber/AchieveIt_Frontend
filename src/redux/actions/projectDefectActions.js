import {BASE_URL} from "../../constants";
import {GET_URL} from "./actionTypes";
import {formFailed} from "./userActions";

export function getUrl(projectId){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/issue/'+projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: GET_URL,
                    payload: data.result
                })
            }else{
                console.log(data.status);
                dispatch(formFailed('defect'));
            }
        }).catch(error => {
            console.log(error)
            dispatch(formFailed('defect'));
        })
    }
}