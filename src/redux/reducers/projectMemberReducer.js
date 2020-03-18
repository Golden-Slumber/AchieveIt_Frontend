import {
    CHANGE_CREATEMEMBER,
    CHANGE_DELETEMEMBER,
    CHANGE_MANAGEMEMBER,
    CHANGE_MODIFYMEMBER,
    CHANGE_PERISSIONS,
    CHANGE_ROLES,
    CHANGE_SUPERIOR_ID, CHANGE_USER_ID,
    CREATE_MEMBER,
    DELETE_MEMBER, MODIFY_MANAGESTATE,
    MODIFY_MEMBER, UPDATE_MEMBER
} from "../actions";

const initialState = {
    members: [
        {
            userId: '1',
            superiorId: '2',
            projectRolesId: [
                '1',
                '2',
                '3'
            ]
        },
        {
            userId: '1',
            superiorId: '2',
            projectRolesId: [
                '1',
                '2',
                '3'
            ]
        },
        {
            userId: '1',
            superiorId: '2',
            projectRolesId: [
                '1',
                '2',
                '3'
            ]
        }
    ],
    isManaging: false,
    manageState: 'null',
    currentUserId: '',
    currentSuperiorId: '',
    currentRoles: [],
    currentPermissions: []
}

export default function projectMember(state=initialState, action){
    switch (action.type) {
        case CHANGE_MANAGEMEMBER:
            return {...state, isManaging: action.payload};
        case MODIFY_MANAGESTATE:
            return {...state, manageState: action.payload};
        case CREATE_MEMBER:
            let newMember1 = {
                userId: action.payload.userId,
                superiorId: action.payload.superiorId,
                projectRolesId: action.payload.roles
            }
            return {...state, members: [...state.members, newMember1], manageState: ''}
        case MODIFY_MEMBER:
            let arr1 = state.members.filter((item) => {
                return item.userId !== action.payload.userId;
            });
            let newMember2 = {
                userId: action.payload.userId,
                superiorId: action.payload.superiorId,
                projectRolesId: action.payload.roles
            }
            arr1.push(newMember2);
            return {...state, members: arr1, manageState: ''};
        case DELETE_MEMBER:
            let arr2 = state.members.filter((item) => {
                return item.userId !== action.payload
            });
            return {...state, members: arr2, manageState: ''};
        case CHANGE_USER_ID:
            return {...state, currentUserId: action.payload};
        case CHANGE_SUPERIOR_ID:
            return {...state, currentSuperiorId: action.payload};
        case CHANGE_ROLES:
            return {...state, currentRoles: action.payload};
        case CHANGE_PERISSIONS:
            return {...state, currentPermissions: action.payload};
        case UPDATE_MEMBER:
            return {...state, members: action.payload};
        default:
            return state;
    }
}