import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as projectDetailActions from "../../src/redux/actions/projectDetailActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectDetailActions Test', () => {

    it('should create an action to set project id', function () {
        const expectedAction = {
            type: types.PROJECTID_SET,
            payload: 'projectId'
        }

        expect(projectDetailActions.setProjectId('projectId')).toEqual(expectedAction);
    });

    it('should create an action to start modifying', function () {
        const expectedAction = {
            type: types.CHANGE_MODIFYSTATE,
            payload: true
        }

        expect(projectDetailActions.startModifying()).toEqual(expectedAction);
    });

    it('should create an action to modify project name', function () {
        const expectedAction = {
            type: types.MODIFY_PROJECTNAME,
            payload: 'projectName'
        }

        expect(projectDetailActions.modifyProjectName('projectName')).toEqual(expectedAction);
    });

    it('should create an action to modify customer', function () {
        const expectedAction = {
            type: types.MODIFY_CUSTOMER,
            payload: 'customer'
        }

        expect(projectDetailActions.modifyCustomer('customer')).toEqual(expectedAction);
    });

    it('should create an action to modify start time', function () {
        const expectedAction = {
            type: types.MODIFY_STARTTIME,
            payload: 'startTime'
        }

        expect(projectDetailActions.modifyStartTime('startTime')).toEqual(expectedAction);
    });

    it('should create an action to modify end time', function () {
        const expectedAction = {
            type: types.MODIFY_ENDTIME,
            payload: 'endTime'
        }

        expect(projectDetailActions.modifyEndTime('endTime')).toEqual(expectedAction);
    });

    it('should create an action to modify milestone', function () {
        const expectedAction = {
            type: types.MODIFY_MILESTONE,
            payload: 'milestone'
        }

        expect(projectDetailActions.modifyMilestone('milestone')).toEqual(expectedAction);
    });

    it('should create an action to modify main tech', function () {
        const expectedAction = {
            type: types.MODIFY_MAINTECH,
            payload: 'mainTech'
        }

        expect(projectDetailActions.modifyMainTech('mainTech')).toEqual(expectedAction);
    });

    it('should create an action to modify business fields', function () {
        const expectedAction = {
            type: types.MODIFY_BUNIESSFIELD,
            payload: 'businessFields'
        }

        expect(projectDetailActions.modifyBusinessField('businessFields')).toEqual(expectedAction);
    });

    it('should create an action to modify main function', function () {
        const expectedAction = {
            type: types.MODIFY_MAINFUNCTION,
            payload: 'mainFunction'
        }

        expect(projectDetailActions.modifyMainFunction('mainFunction')).toEqual(expectedAction);
    });

    it('should create an action to cancel modifying', function () {
        const expectedAction = {
            type: types.CHANGE_MODIFYSTATE,
            payload: false
        }

        expect(projectDetailActions.cancelModify('projectId')).toEqual(expectedAction);
    });

    it('should create an action to start pushing', function () {
        const expectedAction = {
            type: types.CHANGE_PUSHSTATE,
            payload: true
        }

        expect(projectDetailActions.startPushing()).toEqual(expectedAction);
    });

    it('should create an action to cancel pushing', function () {
        const expectedAction = {
            type: types.CHANGE_PUSHSTATE,
            payload: false
        }

        expect(projectDetailActions.cancelPushing()).toEqual(expectedAction);
    });

    it('should create an action to set project state', function () {
        const expectedAction = {
            type: types.CHANGE_PROJECTSTATE,
            payload: 'projectState'
        }

        expect(projectDetailActions.setProjectState('projectState')).toEqual(expectedAction);
    });

    it('should create an action to change choice', function () {
        const expectedAction = {
            type: types.CHANGE_CHOICE,
            payload: 'choice'
        }

        expect(projectDetailActions.changeChoice('choice')).toEqual(expectedAction);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to modify project info success', function () {
        let content = {
            'project_name': 'projectName',
            'referred_outer_customer_id': 'customer',
            'scheduled_start_time': 'startTime',
            'scheduled_end_time': 'endTime',
            'milestone': 'milestone',
            'technology': 'mainTech',
            'referred_business_field_id': 'businessField',
            'main_function': 'mainFunction'
        }
        nock(BASE_URL)
            .put('/project/detail/projectId', content)
            .reply(200, {'status': 'SUCCESS'});

        const expectedActions = [
                {type: types.CHANGE_MODIFYSTATE, payload: false},
            ],
            store = mockStore();

        return store.dispatch(projectDetailActions.modifyProjectInfo(
            'projectId', 'projectName', 'customer', 'startTime', 'endTime', 'milestone', 'mainTech', 'businessField', 'mainFunction')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to push project', function () {
        nock(BASE_URL)
            .put('/project/status/projectId', {'status': 'projectStatus'})
            .reply(200, {'status': 'SUCCESS'});

        const expectedActions = [
                {type: types.CHANGE_PUSHSTATE, payload: false},
                {type: types.CHANGE_PROJECTSTATE, payload: 'projectStatus'},
                {type: types.CHNAGE_SUCCESSSTATE, payload: 'push'}
            ],
            store = mockStore();

        return store.dispatch(projectDetailActions.pushProject('projectId', 'projectStatus')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to confirm configuration', function () {
        nock(BASE_URL)
            .post('/project/confirmConfigEstablished', {'project_id': 'projectId'})
            .reply(200, {'status': 'SUCCESS'});

        const expectedActions = [
                {type: types.CHNAGE_SUCCESSSTATE, payload: 'confirm'},
            ],
            store = mockStore();

        return store.dispatch(projectDetailActions.confirmConfiguration('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});