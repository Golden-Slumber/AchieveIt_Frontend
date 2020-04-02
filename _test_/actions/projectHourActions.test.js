import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import * as types from "../../src/redux/actions/actionTypes";
import * as projectHourActions from "../../src/redux/actions/projectHourActions";
import store from "../../src/redux";
import {
    CHANGE_FUNCTIONID,
    CHANGE_HOURMODALSTATE,
    CHANGE_WORKENDTIME,
    CHANGE_WORKSTARTTIME, SET_ACTIVITYOPTIONS, SET_FUNCTIONHOUROPTIONS
} from "../../src/redux/actions/actionTypes";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectHourActions Test', () => {

    it('should create an action to start managing', function () {
        const expectedAction = {
            type: types.CHANGE_HOURPAGESTATE,
            payload: 'manage'
        };

        expect(projectHourActions.startManaging()).toEqual(expectedAction);
    });

    it('should create an action to finish managing', function () {
        const expectedAction = {
            type: types.CHANGE_HOURPAGESTATE,
            payload: ''
        };

        expect(projectHourActions.finishManaging()).toEqual(expectedAction);

    });

    it('should create an action to cancel hour modal', function () {
        const expectedAction = {
            type: types.CHANGE_HOURMODALSTATE,
            payload: ''
        };

        expect(projectHourActions.cancelHourModal()).toEqual(expectedAction);
    });

    it('should create an action to start verifying', function () {
        const expectedAction = {
            type: types.CHANGE_HOURMODALSTATE,
            payload: 'verify'
        };

        expect(projectHourActions.startVerifying()).toEqual(expectedAction);
    });

    it('should create an action to finish verifying', function () {
        const expectedAction = {
            type: types.CHANGE_HOURMODALSTATE,
            payload: ''
        };

        expect(projectHourActions.finishVerifying()).toEqual(expectedAction);
    });

    it('should create an action to start creating', function () {
        const expectedAction = {
            type: types.CHANGE_HOURMODALSTATE,
            payload: 'create'
        };

        expect(projectHourActions.startCreating()).toEqual(expectedAction);
    });

    it('should create an action to start modifying', function () {
        const expectedActions = [
            {
                type: types.SET_WORKINGHOURID,
                payload: 'workinghourId'
            },
            {
                type: CHANGE_HOURMODALSTATE,
                payload: 'modify'
            }
        ],
            store = mockStore();

        return store.dispatch(projectHourActions.startModifying('workinghourId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to start judging', function () {
        const expectedActions = [
            {
                type: types.SET_WORKINGHOURID,
                payload: 'workinghourId'
            },
            {
                type: CHANGE_HOURMODALSTATE,
                payload: 'judge'
            }
        ],
        store = mockStore();

        return store.dispatch(projectHourActions.startJudging('workinghourId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to change function type', function () {
        const expectedAction = {
            type: types.CHANGE_FUNCTIONID,
            payload: 'functionType'
        };

        expect(projectHourActions.changeFunctionType('functionType')).toEqual(expectedAction);
    });

    it('should create an action to change activity', function () {
        const expectedAction = {
            type: types.CHANGE_ACTIVITY,
            payload: 'activity'
        };

        expect(projectHourActions.changeActivity('activity')).toEqual(expectedAction);
    });

    it('should create an action to change work end time', function () {
        const expectedAction = {
            type: types.CHANGE_WORKENDTIME,
            payload: 'endTime'
        };

        expect(projectHourActions.changeWorkEndTime('endTime')).toEqual(expectedAction);
    });

    it('should create an action to change work start time', function () {
        const expectedAction = {
            type: types.CHANGE_WORKSTARTTIME,
            payload: 'startTime'
        };

        expect(projectHourActions.changeWorkStartTime('startTime')).toEqual(expectedAction);
    });

    it('should create an action to change verify state', function () {
        const expectedAction = {
            type: types.CHANGE_VERIFYSTATE,
            payload: 'verifyState'
        };

        expect(projectHourActions.changeVerifyState('verifyState')).toEqual(expectedAction);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action get work hours', function () {
        nock(BASE_URL)
            .get('/project/workingHour/projectId')
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.GET_WORKHOURS, payload: 'result'},
            ],
            store = mockStore();

        return store.dispatch(projectHourActions.getWorkHours('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action get verify hours', function () {
        nock(BASE_URL)
            .post('/project/workingHour/verify', {'project_id': 'projectId'})
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.GET_VERIFYHOURS, payload: 'result'},
            ],
            store = mockStore();

        return store.dispatch(projectHourActions.getVerifyHours('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action create work hour', function () {
        let newWorkingHour = {
            'activity_type_id': 'activityType',
            'function_id': 'functionType',
            'start_time': 'startTime',
            'end_time': 'endTime'
        }

        nock(BASE_URL)
            .put('/project/workingHour/projectId', newWorkingHour)
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.CHANGE_HOURMODALSTATE, payload: ''},
            ],
            store = mockStore();

        return store.dispatch(projectHourActions.createWorkingHour('projectId', 'activityType', 'functionType', 'startTime', 'endTime')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action modify work hour', function () {
        let newWorkingHour = {
            'working_hour_id': 'workingHourId',
            'activity_type_id': 'activityType',
            'function_id': 'functionType',
            'start_time': 'startTime',
            'end_time': 'endTime'
        }

        nock(BASE_URL)
            .put('/project/workingHour/projectId/workingHourId', newWorkingHour)
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.CHANGE_HOURMODALSTATE, payload: ''},
            ],
            store = mockStore();

        return store.dispatch(projectHourActions.modifyWorkingHour('projectId', 'workingHourId', 'activityType', 'functionType', 'startTime', 'endTime')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to set function hour options', function () {
        nock(BASE_URL)
            .get('/project/function/projectId')
            .reply(200, {'status': 'SUCCESS', 'result': {'first_level_functions': [], 'second_level_functions': []}});

        const expectedActions = [
                {type: types.SET_FUNCTIONHOUROPTIONS, payload: []},
            ],
            store = mockStore();

        return store.dispatch(projectHourActions.setFunctionHourOptions('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to set activity options', function () {
        nock(BASE_URL)
            .get('/project/workingHour/activityType')
            .reply(200, {'status': 'SUCCESS', 'result': []});

        const expectedActions = [
                {type: types.SET_ACTIVITYOPTIONS, payload: []},
            ],
            store = mockStore();

        return store.dispatch(projectHourActions.setActivityOptions()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

})