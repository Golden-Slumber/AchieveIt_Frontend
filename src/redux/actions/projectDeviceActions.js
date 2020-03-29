import {
    CHANGE_CURRENTDEVICEPAGE,
    CHANGE_DEVICEMANAGER,
    CHANGE_DEVICEMODAL,
    CHANGE_DEVICEPAGE, CHANGE_MOREDEVICE, CHANGE_RETURNTIME, GET_DEVICE,
    RETURN_DEVICE,
    SET_DEVICEID,
    TENANCY_DEVICE,
    VERIFY_DEVICE
} from "./actionTypes";
import {BASE_URL, PAGE_SIZE} from "../../constants";

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

function getDeviceDetail(device_id){
    let result = null;
    fetch(BASE_URL+'/project/device/'+device_id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res1 => res1.json()
    ).then(data1 => {
        if(data1 === 'SUCCESS'){
            result = {
                deviceId: device_id,
                deviceName: data1.result.device_name,
                deviceStatus: data1.result.device_status
            }
        }else{
            console.log(data1.status);
        }
    }).catch(error1 => {
        console.log(error1);
    });
    return result;
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
                let arr = data.result.device_id;
                let devices = [];
                for(let i=0; i<arr.length; i++){
                   let device = getDeviceDetail(arr[i].device_id);
                   if(device!==null)
                       devices.push(device);
                }
                console.log('devices'+devices);
                dispatch({
                    type: GET_DEVICE,
                    payload: devices
                })
                dispatch({
                    type: CHANGE_CURRENTDEVICEPAGE,
                    payload: devices.length>=PAGE_SIZE
                })
            }else{
                console.log(data.status);
            }
        }).then(error => {
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