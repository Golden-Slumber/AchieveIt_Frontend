import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as projectFunctionActions from "../../src/redux/actions/projectFunctionActions";
import store from "../../src/redux";
import {CHANGE_FUNCTIONMANAGE, FUNCTION_MANAGESTATE} from "../../src/redux/actions/actionTypes";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectFunctionActions Test', () => {

    it('should create an action to set superior function options', function () {
        const functions = [
                {
                    functionId: 'functionId'
                }
            ],
            expectedAction = {
                type: types.SET_SUPERIORFUNCTIONS,
                payload: [{key: 'self', value: 'self', text: 'self'},
                    {key: 'functionId', value: 'functionId', text: 'functionId'}]
            };

        expect(projectFunctionActions.setSuperiorFunctionOptions(functions)).toEqual(expectedAction);
    });

    it('should create an action to start uploading', function () {
        const expectedAction = {
                type: types.CHANGE_UPLOADSTATE,
                payload: true
            };

        expect(projectFunctionActions.startUploading()).toEqual(expectedAction);

    });

    it('should create an action to cancel uploading', function () {
        const expectedAction = {
            type: types.CHANGE_UPLOADSTATE,
            payload: false
        };

        expect(projectFunctionActions.cancelUploading()).toEqual(expectedAction);

    });

    it('should create an action to start uploading', function () {
        const expectedAction = {
            type: types.CHANGE_UPLOADSTATE,
            payload: true
        };

        expect(projectFunctionActions.startUploading()).toEqual(expectedAction);

    });

    it('should create an action to start function managing', function () {
        const expectedAction = {
            type: types.CHANGE_FUNCTIONMANAGE,
            payload: true
        };

        expect(projectFunctionActions.functionManaging()).toEqual(expectedAction);

    });

    it('should create an action to cancel function managing', function () {
        const expectedAction = {
            type: types.FUNCTION_MANAGESTATE,
            payload: ''
        };

        expect(projectFunctionActions.cancelFunctionManage()).toEqual(expectedAction);

    });

    it('should create an action to start creating', function () {
        const expectedAction = {
            type: types.FUNCTION_MANAGESTATE,
            payload: 'create'
        };

        expect(projectFunctionActions.startCreating()).toEqual(expectedAction);

    });

    it('should create an action to start modifying', function () {
        const expectedActions = [
            {
                type: types.SET_FUNCTIONID,
                payload: 'functionId'
            },
            {
                type: types.SET_FUNCTIONSUPERIOR,
                payload: 'superiorId'
            },
            {
                type: FUNCTION_MANAGESTATE,
                payload: 'modify'
            }
        ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.startModifying('functionId', 'superiorId')).then(() => {
           expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to start deleting', function () {
        const expectedActions = [
                {
                    type: types.SET_FUNCTIONID,
                    payload: 'functionId'
                },
                {
                    type: FUNCTION_MANAGESTATE,
                    payload: 'delete'
                }
            ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.startDeleting('functionId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to create function', function () {
        const expectedActions = [
                {
                    type: FUNCTION_MANAGESTATE,
                    payload: ''
                },
                {
                    type: types.CREATE_FUNCTION,
                    payload: {
                        'functionId': 'functionId',
                        'superiorId': 'superiorId',
                        'functionDescription': 'description'
                    }
                },
            ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.createFunction('functionId', 'superiorId', 'description')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to modify function', function () {
        const expectedActions = [
                {
                    type: FUNCTION_MANAGESTATE,
                    payload: ''
                },
                {
                    type: types.MODIFY_FUNCTION,
                    payload: {
                        'functionId': 'functionId',
                        'superiorId': 'superiorId',
                        'functionDescription': 'description'
                    }
                },
            ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.modifyFunction('functionId', 'superiorId', 'description')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to delete function', function () {
        const expectedActions = [
                {
                    type: FUNCTION_MANAGESTATE,
                    payload: ''
                },
                {
                    type: types.DELETE_FUNCTION,
                    payload: 'functionId'
                },
            ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.deleteFunction('functionId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to set function id', function () {
        const expectedAction = {
            type: types.SET_FUNCTIONID,
            payload: 'functionId'
        };

        expect(projectFunctionActions.setSuperiorId('functionId')).toEqual(expectedAction);

    });

    it('should create an action to set superior id', function () {
        const expectedAction = {
            type: types.SET_FUNCTIONSUPERIOR,
            payload: 'superiorId'
        };

        expect(projectFunctionActions.setSuperiorId('superiorId')).toEqual(expectedAction);

    });

    it('should create an action to change function description', function () {
        const expectedAction = {
            type: types.CHANGE_FUNCTIONDESCRIPTION,
            payload: 'description'
        };

        expect(projectFunctionActions.changeFunctionDescription('description')).toEqual(expectedAction);

    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create to get project functions', function () {
        nock(BASE_URL)
            .get('/project/function/projectId')
            .reply(200, {'status': 'SUCCESS', 'result': {'first_level_functions': [{'id_for_display': '001', 'superior_display_id': '001', 'function_description': '001'}], 'second_level_functions': []}});

        const expectedActions = [
                {type: types.GET_FUNCTIONS,
                payload: {
                    'firstFunctions': {'functionId': '001', 'superiorId': '001', 'functionDescription': '001'},
                    'secondFunctions': []
                }},
            ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.getProjectFunction('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create to update project functions', function () {
        nock(BASE_URL)
            .put('/project/function/projectId', {'functions': []})
            .reply(200, {'status': 'SUCCESS'});

        const expectedActions = [
                {type: types.CHANGE_FUNCTIONMANAGE,
                    payload: false},
            ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.updateFunction('projectId', [], [])).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create to get download data', function () {
        nock(BASE_URL)
            .get('/project/function/download/projectId')
            .reply(200, 'res');

        const expectedActions = [
                {type: types.CHANGE_DOWNLOADDATA,
                    payload: ['res']},
            ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.getDownloadData('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create to upload functions', function () {
        nock(BASE_URL)
            .post('/project/functionParse', 'project_id=projectId&csv_file=uploadData')
            .reply(200, {'status': 'SUCCESS', 'result': [{'id_for_display': '001', 'superior_display_id': '001', 'description': '001'}]});

        const expectedActions = [
                {type: types.GET_FUNCTIONS,
                    payload: {
                        'firstFunctions': {'functionId': '001', 'superiorId': '001', 'functionDescription': '001'},
                        'secondFunctions': []
                    }},
            ],
            store = mockStore();

        return store.dispatch(projectFunctionActions.updateFunction('projectId', 'uploadData')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});