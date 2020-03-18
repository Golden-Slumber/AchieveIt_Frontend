import {
    CHANGE_ACTIVITY,
    CHANGE_FUNCTIONID,
    CHANGE_HOURMODALSTATE,
    CHANGE_HOURPAGESTATE, CHANGE_VERIFYSTATE, CHANGE_WORKENDTIME,
    CHANGE_WORKSTARTTIME,
    CREATE_WORKINGHOUR,
    MODIFY_WORKINGHOUR,
    SET_WORKINGHOURID,
    VERIFY_WORKINGHOUR

} from "./actionTypes";

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

export function createWorkingHour(activityType, functionType, startTime, endTime){
    let newWorkingHour = {
        workingHourId: 'x',
        activityType: activityType,
        functionType: functionType,
        startTime: startTime,
        endTime: endTime
    }

    return async (dispatch) => {
        dispatch({
            type: CHANGE_HOURMODALSTATE,
            payload: ''
        });
        dispatch({
            type: CREATE_WORKINGHOUR,
            payload: newWorkingHour
        });
    }
}

export function modifyWorkingHour(workingHourId, activityType, functionType, startTime, endTime){
    let newWorkingHour = {
        workingHourId: workingHourId,
        activityType: activityType,
        functionType: functionType,
        startTime: startTime,
        endTime: endTime
    }

    return async (dispatch) => {
        dispatch({
            type: CHANGE_HOURMODALSTATE,
            payload: ''
        });
        dispatch({
            type: MODIFY_WORKINGHOUR,
            payload: newWorkingHour
        });
    }
}

export function judgeWorkingHour(workingHourId) {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_HOURMODALSTATE,
            payload: ''
        });
        dispatch({
            type: VERIFY_WORKINGHOUR,
            payload: workingHourId
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