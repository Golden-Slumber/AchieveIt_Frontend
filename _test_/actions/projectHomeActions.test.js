import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as projectHomeActions from "../../src/redux/actions/projectHomeActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectHomeActions Test', () => {

    it('should create an action to change keyword', function () {
        const expectedAction = {
            type: types.CHANGE_KEYWORD,
            payload: 'keyword'
        };

        expect(projectHomeActions.changeKeyword('keyword')).toEqual(expectedAction);
    });

    it('should create an action to change project page', function () {
        const expectedAction = {
            type: types.CHANGE_PROJECTPAGE,
            payload: 'currentPage'
        };

        expect(projectHomeActions.changeProjectPage('currentPage')).toEqual(expectedAction);

    });

    it('should create an action to change project id', function () {
        const expectedAction = {
            type: types.CHANGE_PROJECTID,
            payload: 'projectId'
        };

        expect(projectHomeActions.changeProjectId('projectId')).toEqual(expectedAction);

    });

    it('should create an action to change project name', function () {
        const expectedAction = {
            type: types.CHANGE_PROJECTNAME,
            payload: 'projectName'
        };

        expect(projectHomeActions.changeProjectName('projectName')).toEqual(expectedAction);

    });

    it('should create an action to change project customer', function () {
        const expectedAction = {
            type: types.CHANGE_CUSTOMER,
            payload: 'customer'
        };

        expect(projectHomeActions.changeCustomer('customer')).toEqual(expectedAction);

    });

    it('should create an action to change project start time', function () {
        const expectedAction = {
            type: types.CHANGE_STARTTIME,
            payload: 'startTime'
        };

        expect(projectHomeActions.changeStartTime('startTime')).toEqual(expectedAction);

    });

    it('should create an action to change end time', function () {
        const expectedAction = {
            type: types.CHANGE_ENDTIME,
            payload: 'endTime'
        };

        expect(projectHomeActions.changeEndTime('endTime')).toEqual(expectedAction);

    });

    it('should create an action to change project milestone', function () {
        const expectedAction = {
            type: types.CHANGE_MILESTONE,
            payload: 'milestone'
        };

        expect(projectHomeActions.changeMilestone('milestone')).toEqual(expectedAction);

    });

    it('should create an action to change project main tech', function () {
        const expectedAction = {
            type: types.CHANGE_MAINTECH,
            payload: 'mainTech'
        };

        expect(projectHomeActions.changeMainTech('mainTech')).toEqual(expectedAction);

    });

    it('should create an action to change project business field', function () {
        const expectedAction = {
            type: types.CHANGE_BUNIESSFIELD,
            payload: 'businessField'
        };

        expect(projectHomeActions.changeBusinessField('businessField')).toEqual(expectedAction);

    });

    it('should create an action to change project main function', function () {
        const expectedAction = {
            type: types.CHANGE_MAINFUNCTION,
            payload: 'mainFunction'
        };

        expect(projectHomeActions.changeMainFunction('mainFunction')).toEqual(expectedAction);

    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to get relative projects', function () {
        nock(BASE_URL)
            .post('/project/listRelative', {'page_size': '10', 'current_page': 'currentPage'})
            .reply(200, {'status': 'SUCCESS', 'result': [{'project_id': 'id', 'project_name': 'name', 'status': 'status'}]});

        const expectedActions = [],
            store = mockStore();

        return store.dispatch(projectHomeActions.getRelativeProjects('currentPage')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to get relative projects by status', function () {
        nock(BASE_URL)
            .post('/project/getByStatus', {'status': 'status'})
            .reply(200, {'status': 'SUCCESS', 'result': [{'project_id': 'id', 'project_name': 'name', 'status': 'status'}]});

        const expectedActions = [
                {type: types.GET_RELATIVE_PROJECTSBYSTATUS, payload: {
                        type: 'status',
                        relativeProjects: [{'id': 'id', 'name': 'name', 'status': 'status'}]
                    }},
                {type: types.CHANGE_MOREPROJECT, payload: false}
            ],
            store = mockStore();

        return store.dispatch(projectHomeActions.getRelativeProjectsbyStatus('status')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to search projects', function () {
        nock(BASE_URL)
            .post('/project/listRelative', {'key_word': 'keyword', 'page_size': '10', 'current_page': 'currentPage'})
            .reply(200, {'status': 'SUCCESS', 'result': [{'project_id': 'id', 'project_name': 'name', 'status': 'status'}]});

        const expectedActions = [
                {type: types.CHANGE_FAILEDSTATE, payload: 'search'}
            ],
            store = mockStore();

        return store.dispatch(projectHomeActions.searchProject('keyword','currentPage')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to setup project', function () {

        let projectSetupInfo = {
            'project_id': 'projectId',
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
            .put('/project/setUp', projectSetupInfo)
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.CHNAGE_SUCCESSSTATE, payload: 'setup'},
            ],
            store = mockStore();

        return store.dispatch(projectHomeActions.projectSetup('userId', 'projectId', 'projectName', 'customer', 'startTime', 'endTime', 'milestone', 'mainTech', 'businessField', 'mainFunction')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});