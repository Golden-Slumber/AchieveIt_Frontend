import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as projectDeviceActions from "../../src/redux/actions/projectDeviceActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectDeviceActions Test', () => {

    it('should create an action to change current Device Page', function () {
        const expectedAction = {
            type: types.CHANGE_CURRENTDEVICEPAGE,
            payload: 2
        };

        expect(projectDeviceActions.changeCurrentDevicePage(2)).toEqual(expectedAction);
    });

    it('should create an action to start checking', function () {
        const expectedAction = {
            type: types.CHANGE_DEVICEPAGE,
            payload: 'check'
        };

        expect(projectDeviceActions.startChecking()).toEqual(expectedAction);
    });

    it('should create an action to finish checking', function () {
        const expectedAction = {
            type: types.CHANGE_DEVICEPAGE,
            payload: ''
        };

        expect(projectDeviceActions.finishChecking()).toEqual(expectedAction);
    });

    it('should create an action to cancel device modal', function () {
        const expectedAction = {
            type: types.CHANGE_DEVICEMODAL,
            payload: ''
        };

        expect(projectDeviceActions.cancelDeviceModal()).toEqual(expectedAction);
    });

    it('should create an action to start tenancying', function () {
        const expectedActions = [
                {
                    type: types.SET_DEVICEID,
                    payload: 'deviceId'
                },
                {
                    type: types.CHANGE_DEVICEMODAL,
                    payload: 'tenancy'
                }
            ],
            store = mockStore();

        return store.dispatch(projectDeviceActions.startTenancying('deviceId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to start returning', function () {
        const expectedActions = [
                {
                    type: types.SET_DEVICEID,
                    payload: 'deviceId'
                },
                {
                    type: types.CHANGE_DEVICEMODAL,
                    payload: 'return'
                }
            ],
            store = mockStore();

        return store.dispatch(projectDeviceActions.startReturning('deviceId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to start verifying', function () {
        const expectedActions = [
                {
                    type: types.SET_DEVICEID,
                    payload: 'deviceId'
                },
                {
                    type: types.CHANGE_DEVICEMODAL,
                    payload: 'verify'
                }
            ],
            store = mockStore();

        return store.dispatch(projectDeviceActions.startVerifying('deviceId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to set device ID', function () {
        const expectedAction = {
            type: types.SET_DEVICEID,
            payload: 'deviceId'
        };

        expect(projectDeviceActions.setDeviceId('deviceId')).toEqual(expectedAction);
    });

    it('should create an action to change return time', function () {
        const expectedAction = {
            type: types.CHANGE_RETURNTIME,
            payload: 'returnTime'
        };

        expect(projectDeviceActions.changeReturnTime('returnTime')).toEqual(expectedAction);
    });

    it('should create an action to change device manager', function () {
        const expectedAction = {
            type: types.CHANGE_DEVICEMANAGER,
            payload: 'deviceManager'
        };

        expect(projectDeviceActions.changeDeviceManager('deviceManager')).toEqual(expectedAction);
    });

    it('should create an action to change current time', function () {
        const expectedAction = {
            type: types.CHANGE_CURRENTTIME,
            payload: 'currentTime'
        };

        expect(projectDeviceActions.changeCurrentTime('currentTime')).toEqual(expectedAction);
    });

    it('should create an action to change device Verify state', function () {
        const expectedAction = {
            type: types.CHANGE_DEVICESTATE,
            payload: 'verifyState'
        };

        expect(projectDeviceActions.changeDeviceVerifyState('verifyState')).toEqual(expectedAction);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to tenancy device', function () {

        let newDevice = {
            'referred_device_id':'deviceId',
            'referred_project_id':'projectId',
            'tenancy_time':'currentTime',
            'scheduled_return_time':'returnTime',
            'referred_device_manager_id':'deviceManager'
        }

        nock(BASE_URL)
            .put('/project/device/tenancy', newDevice)
            .reply(200, {'status': 'SUCCESS'});

        const expectedActions = [
                {type: types.CHANGE_DEVICEMODAL, payload: ''},
                {type: types.CHANGE_CURRENTDEVICEPAGE, payload: 1}
            ],
            store = mockStore();

        return store.dispatch(projectDeviceActions.tenancyDevice('deviceId', 'projectId', 'currentTime', 'returnTime', 'deviceManager')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to return device', function () {

        let content = {
            'project_id':'projectId',
            'device_status': 'ToBeChecked'
        }

        nock(BASE_URL)
            .put('/project/device/deviceId', content)
            .reply(200, {'status': 'SUCCESS'});

        const expectedActions = [
                {type: types.CHANGE_DEVICEMODAL, payload: ''},
                {type: types.CHANGE_CURRENTDEVICEPAGE, payload: 1}
            ],
            store = mockStore();

        return store.dispatch(projectDeviceActions.returnDevice('projectId', 'deviceId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to verify device', function () {

        let content = {
            'referred_device_id': 'deviceId',
            'examination_time': 'currentTime',
            'referred_test_id': 'manager',
            'test_result': 'verifyState'
        }

        nock(BASE_URL)
            .put('/project/device/check', content)
            .reply(200, {'status': 'SUCCESS'});

        const expectedActions = [
                {type: types.CHANGE_DEVICEMODAL, payload: ''},
                {type: types.CHANGE_CURRENTDEVICEPAGE, payload: 1}
            ],
            store = mockStore();

        return store.dispatch(projectDeviceActions.verifyDevice('deviceId', 'currentTime', 'manager', 'verifyState')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});