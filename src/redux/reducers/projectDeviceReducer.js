import {
    CHANGE_CURRENTDEVICEPAGE, CHANGE_CURRENTTIME,
    CHANGE_DEVICEMANAGER,
    CHANGE_DEVICEMODAL,
    CHANGE_DEVICEPAGE, CHANGE_DEVICESTATE,
    CHANGE_MODIFYSTATE, CHANGE_MOREDEVICE, CHANGE_RETURNTIME, GET_DEVICE,
    MODIFY_BUNIESSFIELD,
    MODIFY_CUSTOMER,
    MODIFY_ENDTIME, MODIFY_MAINFUNCTION, MODIFY_MAINTECH,
    MODIFY_MILESTONE,
    MODIFY_PROJECTNAME,
    MODIFY_STARTTIME,
    PROJECTID_SET, RETURN_DEVICE, SET_DEVICEID, SET_DEVICES, TENANCY_DEVICE, VERIFY_DEVICE
} from "../actions";
import currentPage from "./currentPageReducer";

const initialState = {
    devices: [
        {
            deviceId: '1',
            deviceStatus: '2'
        },
        {
            deviceId: '1',
            deviceStatus: '2'
        },
        {
            deviceId: '1',
            deviceStatus: '2'
        },
        {
            deviceId: '1',
            deviceStatus: '2'
        },
        {
            deviceId: '1',
            deviceStatus: '2'
        }
    ],
    verifyDevices: [
        {
            deviceId: '1',
        },
        {
            deviceId: '2',
        },
        {
            deviceId: '3',
        },
        {
            deviceId: '4',
        },
        {
            deviceId: '5',
        }
    ],
    currentPage: 1,
    more: true,
    devicePage: '',
    deviceModal: '',
    currentDeviceId: '',
    currentTime: '',
    currentReturnTime: '',
    currentDeviceManager: '',
    verifyState: ''
};

export default function projectDevice(state = initialState, action) {
    switch (action.type) {
        case GET_DEVICE:
            let arr;
            if(state.currentPage === 1){
                arr = action.payload
            }else{
                arr = state.devices.concat(action.payload);
            }
            return {...state, devices: arr};
        case CHANGE_MOREDEVICE:
            return {...state, more: action.payload};
        case CHANGE_CURRENTDEVICEPAGE:
            return {...state, currentPage: action.payload};
        case CHANGE_DEVICEPAGE:
            return {...state, devicePage: action.payload};
        case CHANGE_DEVICEMODAL:
            return {...state, deviceModal: action.payload};
        case TENANCY_DEVICE:
            return {...state, devices: [...state.devices, action.payload]};
        case VERIFY_DEVICE:
            let arr1 = state.verifyDevices.filter((item) => {
                return item.deviceId !== action.payload
            });
            return {...state, verifyDevices: arr1}
        case RETURN_DEVICE:
            let arr2 = state.devices.filter((item) => {
                return item.deviceId !== action.payload
            });
            return {...state, devices: arr2}
        case SET_DEVICEID:
            return {...state, currentDeviceId: action.payload};
        case CHANGE_RETURNTIME:
            return {...state, currentReturnTime: action.payload};
        case CHANGE_DEVICEMANAGER:
            return {...state, currentDeviceManager: action.payload};
        case CHANGE_CURRENTTIME:
            return {...state, currentTime: action.payload}
        case CHANGE_DEVICESTATE:
            return {...state, verifyState: action.payload}
        default:
            return state;
    }
}