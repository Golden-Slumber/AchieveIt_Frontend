import {
    CHANGE_ACTIVITY,
    CHANGE_FUNCTIONID,
    CHANGE_HOURMODALSTATE,
    CHANGE_HOURPAGESTATE, CHANGE_VERIFYSTATE, CHANGE_WORKENDTIME,
    CHANGE_WORKSTARTTIME,
    CREATE_WORKINGHOUR, GET_FUNCTIONS, GET_VERIFYHOURS, GET_WORKHOURS,
    MODIFY_WORKINGHOUR, SET_ACTIVITYOPTIONS, SET_FUNCTIONHOUROPTIONS,
    SET_WORKINGHOURID,
    VERIFY_WORKINGHOUR

} from "./actionTypes";
import {BASE_URL} from "../../constants";
import {getProjectFunction} from "./projectFunctionActions";

export function getWorkHours(projectId) {
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/workingHour/'+projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: GET_WORKHOURS,
                    payload: data.result
                })
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

export function getVerifyHours(projectId) {
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/workingHour/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({project_id: projectId})
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: GET_VERIFYHOURS,
                    payload: data.result
                })
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

export function startManaging(){
    return {
        type: CHANGE_HOURPAGESTATE,
        payload: 'manage'
    }
}

export function finishManaging(){
    return {
        type: CHANGE_HOURPAGESTATE,
        payload: ''
    }
}

export function cancelHourModal(){
    return {
        type: CHANGE_HOURMODALSTATE,
        payload: ''
    }
}

export function startVerifying(){
    return {
        type: CHANGE_HOURPAGESTATE,
        payload: 'verify'
    }
}

export function finishVerifying(){
    return {
        type: CHANGE_HOURPAGESTATE,
        payload: ''
    }
}

export function startCreating() {
    return {
        type: CHANGE_HOURMODALSTATE,
        payload: 'create'
    }
}


export function startModifying(workinghourId){
    return async (dispatch) => {
        dispatch({
           type: SET_WORKINGHOURID,
           payload: workinghourId
        });
        dispatch({
            type: CHANGE_HOURMODALSTATE,
            payload: 'modify'
        })
    }
}


export function startJudging(workinghourId) {
    return async (dispatch) => {
        dispatch({
            type: SET_WORKINGHOURID,
            payload: workinghourId
        });
        dispatch({
            type: CHANGE_HOURMODALSTATE,
            payload: 'judge'
        })
    }
}

export function createWorkingHour(projectId, activityType, functionType, startTime, endTime){
    let newWorkingHour = {
        activity_type_id: activityType,
        function_id: functionType,
        start_time: startTime,
        end_time: endTime
    }

    return async (dispatch) => {
        await fetch(BASE_URL+'/project/workingHour/'+projectId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newWorkingHour)
        }).then(res => res.json()
        ).then(data => {
           if(data.status === 'SUCCESS'){
               dispatch({
                   type: CHANGE_HOURMODALSTATE,
                   payload: ''
               });
               dispatch(getWorkHours(projectId));
           }else{
               console.log(data.status);
           }
        }).catch(error => {
            console.log(error);
        });

    }
}

export function modifyWorkingHour(projectId, workingHourId, activityType, functionType, startTime, endTime){
    let newWorkingHour = {
        working_hour_id: workingHourId,
        activity_type_id: activityType,
        function_id: functionType,
        start_time: startTime,
        end_time: endTime
    }

    return async (dispatch) => {
        await fetch(BASE_URL+'/project/workingHour/'+projectId+'/'+workingHourId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newWorkingHour)
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHANGE_HOURMODALSTATE,
                    payload: ''
                });
                dispatch(getWorkHours(projectId));
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

export function judgeWorkingHour(projectId, workingHourId, verifyState) {
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/workingHour/verify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({project_id: projectId, working_hour_id: workingHourId, verified: verifyState==='true'})
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch(getVerifyHours(projectId));
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
        dispatch({
            type: CHANGE_HOURMODALSTATE,
            payload: ''
        });
    }
}

export function changeFunctionType(functionType) {
    return {
        type: CHANGE_FUNCTIONID,
        payload: functionType
    }
}

export function changeActivity(activity){
    return {
        type: CHANGE_ACTIVITY,
        payload: activity
    }
}

export function changeWorkStartTime(startTime){
    return {
        type: CHANGE_WORKSTARTTIME,
        payload: startTime
    }
}

export function changeWorkEndTime(endTime){
    return {
        type: CHANGE_WORKENDTIME,
        payload: endTime
    }
}

export function changeVerifyState(verifyState){
    return {
        type: CHANGE_VERIFYSTATE,
        payload: verifyState
    }
}

export function setFunctionHourOptions(projectId){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/function/'+projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                console.log(data.result);
                let functionHourOptions = [];
                let arr = data.result.first_level_functions;
                for(let i=0; i<arr.length; i++){
                    functionHourOptions.push(
                        {key: arr[i].id_for_display, value: arr[i].id_for_display, text: arr[i].id_for_display+arr[i].function_description}
                    );
                }
                arr = data.result.second_level_functions;
                for(let i=0; i<arr.length; i++){
                    functionHourOptions.push(
                        {key: arr[i].id_for_display, value: arr[i].id_for_display, text: arr[i].id_for_display+arr[i].function_description}
                    );
                }
                dispatch({
                    type: SET_FUNCTIONHOUROPTIONS,
                    payload: functionHourOptions
                })
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        });

    }
}

export function setActivityOptions(){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/workingHour/activityType', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                let activityOptions = [];
                let arr = data.status.result;
                for(let i=0; i<arr.length; i++){
                    activityOptions.push({
                       key: arr[i].activity_type_id, value: arr[i].activity_type_id, text: arr[i].level_1_description+' '+arr[i].level_2_description
                    });
                }
                dispatch({
                    type: SET_ACTIVITYOPTIONS,
                    payload: activityOptions
                })
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}