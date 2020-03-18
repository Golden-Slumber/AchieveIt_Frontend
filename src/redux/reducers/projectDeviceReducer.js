import {
    CHANGE_DEVICEMANAGER,
    CHANGE_DEVICEMODAL,
    CHANGE_DEVICEPAGE,
    CHANGE_MODIFYSTATE, CHANGE_RETURNTIME,
    MODIFY_BUNIESSFIELD,
    MODIFY_CUSTOMER,
    MODIFY_ENDTIME, MODIFY_MAINFUNCTION, MODIFY_MAINTECH,
    MODIFY_MILESTONE,
    MODIFY_PROJECTNAME,
    MODIFY_STARTTIME,
    PROJECTID_SET, RETURN_DEVICE, SET_DEVICEID, TENANCY_DEVICE, VERIFY_DEVICE
} from "../actions";

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
    devicePage: '',
    deviceModal: '',
    currentDeviceId: '',
    currentReturnTime: '',
    currentDeviceManager: '',
    verifyState: ''
};

export default function projectDevice(state = initialState, action) {
    switch (action.type) {
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
        default:
            return state;
    }
}