import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as projectMemberActions from "../../src/redux/actions/projectMemberActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectMemberActions Test', () => {

    it('should create an action to start managing', function () {
        const expectedAction = {
                type: types.CHANGE_MANAGEMEMBER,
                payload: true
            };

        expect(projectMemberActions.startManaging()).toEqual(expectedAction);
    });

    it('should create an action to cancel managing', function () {
        const expectedAction = {
                type: types.MODIFY_MANAGESTATE,
                payload: ''
            };

        expect(projectMemberActions.cancelManage()).toEqual(expectedAction);

    });

    it('should create an action to start creating', function () {
        const expectedAction = {
            type: types.MODIFY_MANAGESTATE,
            payload: 'create'
        };

        expect(projectMemberActions.startCreating()).toEqual(expectedAction);
    });

    it('should create an action to start modifying', function () {
        const expectedActions = [
            {
                type: types.CHANGE_USER_ID,
                payload: 'userId'
            },
            {
                type: types.MODIFY_MANAGESTATE,
                payload: 'modify'
            }
        ],
            store = mockStore();

        return store.dispatch(projectMemberActions.startModifying('userId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to start deleting', function () {
        const expectedActions = [
                {
                    type: types.CHANGE_USER_ID,
                    payload: 'userId'
                },
                {
                    type: types.MODIFY_MANAGESTATE,
                    payload: 'delete'
                }
            ],
            store = mockStore();

        return store.dispatch(projectMemberActions.startDeleting('userId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to change userId', function () {
        const expectedAction = {
            type: types.CHANGE_USER_ID,
            payload: 'userId'
        };

        expect(projectMemberActions.changeUserId('userId')).toEqual(expectedAction);
    });

    it('should create an action to change superiorId', function () {
        const expectedAction = {
            type: types.CHANGE_SUPERIOR_ID,
            payload: 'superiorId'
        };

        expect(projectMemberActions.changeSuperiorId('superiorId')).toEqual(expectedAction);
    });

    it('should create an action to change roles', function () {
        const expectedAction = {
            type: types.CHANGE_ROLES,
            payload: {
                'roleId': 'roleId',
                'roleName': 'roleName'
            }
        };

        expect(projectMemberActions.changeRoles('roleId', 'roleName')).toEqual(expectedAction);
    });

    it('should create an action to change permissions', function () {
        const expectedAction = {
            type: types.CHANGE_PERISSIONS,
            payload: 'permissions'
        };

        expect(projectMemberActions.changePermissions('permissions')).toEqual(expectedAction);
    });

    it('should create an action to create member', function () {
        let member = {
            'user_id': 'user_id',
            'superior_id': 'superior_id',
            'project_role_id': 'project_role_id',
            'project_role_name': 'project_role_name'
        }

        const expectedAction = {
            type: types.CREATE_MEMBER,
            payload: member
        };

        expect(projectMemberActions.createMember('user_id', 'superior_id', 'project_role_id', 'project_role_name')).toEqual(expectedAction);
    });

    it('should create an action to delete member', function () {
        const expectedAction = {
            type: types.DELETE_MEMBER,
            payload: 'userId'
        };

        expect(projectMemberActions.deleteMember('userId')).toEqual(expectedAction);
    });

    it('should create an action to set role options', function () {
        const expectedAction = {
            type: types.SET_ROLEOPTIONS,
            payload: [
                {
                    "key": "290089467161608193",
                    "text": "DevelopmentLeader",
                    "value": "290089467161608193 DevelopmentLeader"
                },
                {
                    "key": "294226508208144384",
                    "text": "TestLeader",
                    "value": "294226508208144384 TestLeader"
                },
                {
                    "key": "294226509294469120",
                    "text": "DevelopmentStaff",
                    "value": "294226509294469120 DevelopmentStaff",
                },
                {
                    "key": "294226508208155935",
                    "text": "TestStaff",
                    "value": "294226508208155935 TestStaff",
                }
            ]
        };

        expect(projectMemberActions.setRoleOptions('globalRole', [], 'userId')).toEqual(expectedAction);
    });

    it('should create an action to set superior options', function () {
        const expectedAction = {
            type: types.SET_SUPERIOROPTIONS,
            payload: []
        };

        expect(projectMemberActions.setSuperiorOptions('role', [], 'userId')).toEqual(expectedAction);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to get project members', function () {
        nock(BASE_URL)
            .get('/project/memberConf/projectId')
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.GET_MEMBERS, payload: 'result'}
            ],
            store = mockStore();

        return store.dispatch(projectMemberActions.getProjectMembers('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to modify members', function () {
        let content = {
            'user_id': 'userId',
            'project_id': 'projectId',
            'privilege_list': 'permissions'
        }

        nock(BASE_URL)
            .put('/user/permission', content)
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.MODIFY_MEMBER},
                {type: types.CHNAGE_SUCCESSSTATE, payload: 'updatePermission'}
            ],
            store = mockStore();

        return store.dispatch(projectMemberActions.modifyMember('userId', 'projectId', 'permissions')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to update members', function () {
        nock(BASE_URL)
            .put('/user/permission', {'members': []})
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.CHANGE_FAILEDSTATE, payload: 'updateMember'}
            ],
            store = mockStore();

        return store.dispatch(projectMemberActions.updateMember('projectId', [])).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

});