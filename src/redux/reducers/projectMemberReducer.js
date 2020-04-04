import {
    CHANGE_MANAGEMEMBER,
    CHANGE_PERISSIONS,
    CHANGE_ROLES,
    CHANGE_SUPERIOR_ID, CHANGE_USER_ID,
    CREATE_MEMBER,
    DELETE_MEMBER, GET_MEMBERS, MODIFY_MANAGESTATE,
    MODIFY_MEMBER, SET_ROLEOPTIONS, SET_SUPERIOROPTIONS, UPDATE_MEMBER
} from "../actions";

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
}

export default function projectMember(state=initialState, action){
    switch (action.type) {
        case GET_MEMBERS:
            return {...state, members: action.payload}
        case CHANGE_MANAGEMEMBER:
            return {...state, isManaging: action.payload};
        case MODIFY_MANAGESTATE:
            return {...state, manageState: action.payload};
        case CREATE_MEMBER:
            return {...state, members: [...state.members, action.payload], manageState: ''}
        case MODIFY_MEMBER:
            return {...state, manageState: ''};
        case DELETE_MEMBER:
            let arr2 = state.members.filter((item) => {
                return item.user_id !== action.payload
            });
            return {...state, members: arr2, manageState: ''};
        case CHANGE_USER_ID:
            return {...state, currentUserId: action.payload};
        case CHANGE_SUPERIOR_ID:
            return {...state, currentSuperiorId: action.payload};
        case CHANGE_ROLES:
            console.log('reducer '+action.payload.roleName);
            return {...state, currentRoleId: action.payload.roleId, currentRoleName: action.payload.roleName};
        case CHANGE_PERISSIONS:
            return {...state, currentPermissions: action.payload};
        case UPDATE_MEMBER:
            return {...state, members: action.payload};
        case SET_ROLEOPTIONS:
            return {...state, roleOptions: action.payload};
        case SET_SUPERIOROPTIONS:
            return {...state, superiorOptions: action.payload};
        default:
            return state;
    }
}