import reducer from '../../src/redux/reducers/projectMemberReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    members: [],
    isManaging: false,
    manageState: 'null',
    currentUserId: '',
    currentSuperiorId: '',
    currentRoleId: '',
    currentRoleName: '',
    currentPermissions: [],
    roleOptions: [],
    superiorOptions: []
};

describe('projectMemberReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_MEMBERS', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.GET_MEMBERS,
            payload: []
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle CHANGE_MANAGEMEMBER', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.CHANGE_MANAGEMEMBER,
            payload: true
        })).toEqual({
            members: [],
            isManaging: true,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle MODIFY_MANAGESTATE', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.MODIFY_MANAGESTATE,
            payload: 'manageState'
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'manageState',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle CREATE_MEMBER', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.CREATE_MEMBER,
            payload: {user_id: 'user_id'}
        })).toEqual({
            members: [{user_id: 'user_id'}],
            isManaging: false,
            manageState: '',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle MODIFY_MEMBER', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.MODIFY_MEMBER
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: '',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle DELETE_MEMBER', function () {
        expect(reducer({
            members: [{user_id: 'user_id'}],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.DELETE_MEMBER,
            payload: 'user_id'
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: '',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle CHANGE_USER_ID', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.CHANGE_USER_ID,
            payload: 'user_id'
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: 'user_id',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle CHANGE_SUPERIOR_ID', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.CHANGE_SUPERIOR_ID,
            payload: 'superior'
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: 'superior',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle CHANGE_ROLES', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.CHANGE_ROLES,
            payload: {
                roleId: 'roleId',
                roleName: 'roleName'
            }
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: 'roleId',
            currentRoleName: 'roleName',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle CHANGE_PERISSIONS', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.CHANGE_PERISSIONS,
            payload: []
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle UPDATE_MEMBER', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.UPDATE_MEMBER,
            payload: []
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle SET_ROLEOPTIONS', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.SET_ROLEOPTIONS,
            payload: []
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });

    it('should handle SET_SUPERIOROPTIONS', function () {
        expect(reducer({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        }, {
            type: types.SET_SUPERIOROPTIONS,
            payload: []
        })).toEqual({
            members: [],
            isManaging: false,
            manageState: 'null',
            currentUserId: '',
            currentSuperiorId: '',
            currentRoleId: '',
            currentRoleName: '',
            currentPermissions: [],
            roleOptions: [],
            superiorOptions: []
        });
    });
});