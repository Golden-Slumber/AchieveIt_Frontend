import {
    CHANGE_CURRENTDEVICEPAGE, CHANGE_CURRENTTIME,
    CHANGE_DEVICEMANAGER,
    CHANGE_DEVICEMODAL,
    CHANGE_DEVICEPAGE, CHANGE_DEVICESTATE, CHANGE_MOREDEVICE, CHANGE_RETURNTIME, CHANGE_VERIFYSTATE, GET_DEVICE,
    RETURN_DEVICE,
    SET_DEVICEID, SET_DEVICES,
    TENANCY_DEVICE,
    VERIFY_DEVICE
} from "./actionTypes";
import {BASE_URL, PAGE_SIZE} from "../../constants";
import {formFailed} from "./userActions";

export function changeMoreDevice(more) {
    return {
        type: CHANGE_MOREDEVICE,
        payload: more
    }
}

export function changeCurrentDevicePage(currentPage){
    return {
        type: CHANGE_CURRENTDEVICEPAGE,
        payload: currentPage
    }
}

export function getDevices(currentPage){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/device', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({page_size: PAGE_SIZE, current_page: currentPage})
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                let arr = data.result.devices.map((item, index) => {
                    return {deviceId: item.device_id, deviceName: item.device_name, deviceStatus: item.device_status}
                })
                dispatch({
                    type: GET_DEVICE,
                    payload: arr
                })
                dispatch({
                    type: CHANGE_MOREDEVICE,
                    payload: arr.length >= PAGE_SIZE
                })
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

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

export function startTenancying(deviceId){
    return async (dispatch) => {
        dispatch({
            type: SET_DEVICEID,
            payload: deviceId
        });
        dispatch({
            type: CHANGE_DEVICEMODAL,
            payload: 'tenancy'
        });
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

export function tenancyDevice(deviceId, projectId, currentTime, returnTime, deviceManager){
    let newDevice = {
        referred_device_id:deviceId,
        referred_project_id:projectId,
        tenancy_time:currentTime,
        scheduled_return_time:returnTime,
        referred_device_manager_id:deviceManager
    }

    return async (dispatch) => {
        await fetch(BASE_URL+'/project/device/tenancy', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newDevice)
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHANGE_DEVICEMODAL,
                    payload: ''
                });
                dispatch(changeCurrentDevicePage(1));
                dispatch(getDevices(1));
            }else{
                console.log(data.status);
                dispatch(formFailed('tenancyDevice'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('tenancyDevice'));
        })
    }
}

export function returnDevice(projectId, deviceId){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/device/'+deviceId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({project_id: projectId, device_status: 'ToBeChecked'})
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHANGE_DEVICEMODAL,
                    payload: ''
                });
                dispatch(changeCurrentDevicePage(1));
                dispatch(getDevices(1));
            }else {
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

export function verifyDevice(deviceId, currentTime, manager, verifyState){

    let content = {
        referred_device_id: deviceId,
        examination_time: currentTime,
        referred_test_id: manager,
        test_result: verifyState
    }
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/device/check', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(content)
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHANGE_DEVICEMODAL,
                    payload: ''
                });
                dispatch(changeCurrentDevicePage(1));
                dispatch(getDevices(1));
            }else{
                console.log(data.status);
                dispatch(formFailed('verifyDevice'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('verifyDevice'));
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

export function changeCurrentTime(currentTime){
    return {
        type: CHANGE_CURRENTTIME,
        payload: currentTime
    }
}

export function changeDeviceVerifyState(verifyState){
    return {
        type: CHANGE_DEVICESTATE,
        payload: verifyState
    }
}