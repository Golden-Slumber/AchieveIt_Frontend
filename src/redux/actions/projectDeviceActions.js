import {
    CHANGE_DEVICEMANAGER,
    CHANGE_DEVICEMODAL,
    CHANGE_DEVICEPAGE, CHANGE_RETURNTIME,
    RETURN_DEVICE,
    SET_DEVICEID,
    TENANCY_DEVICE,
    VERIFY_DEVICE
} from "./actionTypes";

export function startChecking(){
    return {
        type: CHANGE_DEVICEPAGE,
        payload: 'check'
    }
}

export function finishChecking(){
    return {
        type: CHANGE_DEVICEPAGE,
        payload: ''
    }
}

export function cancelDeviceModal(){
    return {
        type: CHANGE_DEVICEMODAL,
        payload: ''
    }
}

export function startTenancying(){
    return {
        type: CHANGE_DEVICEMODAL,
        payload: 'tenancy'
    }
}

export function startReturning(deviceId){
    return async (dispatch) => {
        dispatch({
            type: SET_DEVICEID,
            payload: deviceId
        });
        dispatch({
            type: CHANGE_DEVICEMODAL,
            payload: 'return'
        })
    }
}

export function startVerifying(deviceId){
    return async (dispatch) => {
        dispatch({
            type: SET_DEVICEID,
            payload: deviceId
        });
        dispatch({
            type: CHANGE_DEVICEMODAL,
            payload: 'verify'
        })
    }
}

export function tenancyDevice(deviceId, returnTime, deviceManager){
    let newDevice = {
        deviceId: deviceId,
        deviceStatus: returnTime+deviceManager
    }

    return async (dispatch) => {
        dispatch({
            type: CHANGE_DEVICEMODAL,
            payload: ''
        });
        dispatch({
            type: TENANCY_DEVICE,
            payload: newDevice
        })
    }
}

export function returnDevice(deviceId){
    return async (dispatch) => {
        dispatch({
            type: CHANGE_DEVICEMODAL,
            payload: ''
        });
        dispatch({
            type: RETURN_DEVICE,
            payload: deviceId
        })
    }
}

export function verifyDevice(deviceId){
    return async (dispatch) => {
        dispatch({
            type: CHANGE_DEVICEMODAL,
            payload: ''
        });
        dispatch({
            type: VERIFY_DEVICE,
            payload: deviceId
        })
    }
}

export function setDeviceId(deviceId){
    return {
        type: SET_DEVICEID,
        payload: deviceId
    }
}

export function changeReturnTime(returnTime){
    return {
        type: CHANGE_RETURNTIME,
        payload: returnTime
    }
}

export function changeDeviceManager(deviceManager){
    return {
        type: CHANGE_DEVICEMANAGER,
        payload:deviceManager
    }
}