import reducer from '../../src/redux/reducers/projectDeviceReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    devices: [],
    verifyDevices: [],
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

describe('projectDeviceReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_DEVICE', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.GET_DEVICE,
            payload: [{deviceId:'deviceId', deviceName: 'deviceName', deviceStatus: 'deviceStatus'}]
        })).toEqual({
            devices: [{deviceId:'deviceId', deviceName: 'deviceName', deviceStatus: 'deviceStatus'}],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle CHANGE_MOREDEVICE', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.CHANGE_MOREDEVICE,
            payload: false
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: false,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle CHANGE_CURRENTDEVICEPAGE', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.CHANGE_CURRENTDEVICEPAGE,
            payload: 2
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 2,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle CHANGE_DEVICEPAGE', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.CHANGE_DEVICEPAGE,
            payload: 'devicePage'
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: 'devicePage',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle CHANGE_DEVICEMODAL', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.CHANGE_DEVICEMODAL,
            payload: 'deviceModal'
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: 'deviceModal',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle SET_DEVICEID', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.SET_DEVICEID,
            payload: 'deviceId'
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: 'deviceId',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle SET_DEVICEID', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.SET_DEVICEID,
            payload: 'deviceId'
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: 'deviceId',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle CHANGE_RETURNTIME', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.CHANGE_RETURNTIME,
            payload: 'returnTime'
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: 'returnTime',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle CHANGE_DEVICEMANAGER', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.CHANGE_DEVICEMANAGER,
            payload: 'deviceManager'
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: 'deviceManager',
            verifyState: ''
        });
    });

    it('should handle CHANGE_CURRENTTIME', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.CHANGE_CURRENTTIME,
            payload: 'currentTime'
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: 'currentTime',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        });
    });

    it('should handle CHANGE_DEVICESTATE', function () {
        expect(reducer({
            devices: [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: ''
        }, {
            type: types.CHANGE_DEVICESTATE,
            payload: 'verifyState'
        })).toEqual({
            devices:  [],
            verifyDevices: [],
            currentPage: 1,
            more: true,
            devicePage: '',
            deviceModal: '',
            currentDeviceId: '',
            currentTime: '',
            currentReturnTime: '',
            currentDeviceManager: '',
            verifyState: 'verifyState'
        });
    });
});