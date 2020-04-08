import {
    CHANGE_MANAGEMEMBER,
    CHANGE_PERISSIONS,
    CHANGE_ROLES,
    CHANGE_SUPERIOR_ID, CHANGE_USER_ID, CLEAR_DETAILMEMBERS,
    CREATE_MEMBER,
    DELETE_MEMBER, GET_MEMBERDETAIL, GET_MEMBERS, MODIFY_MANAGESTATE,
    MODIFY_MEMBER, SET_ROLEOPTIONS, SET_SUPERIOROPTIONS, SWITCH_DETAILMEMBERS, UPDATE_MEMBER
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
    superiorOptions: [],
    detailMembers: [],
    detailed: false
}

export default function projectMember(state=initialState, action){
    switch (action.type) {
        case GET_MEMBERS:
            let arr4 = action.payload;
            for(let i=0; i<arr4.length; i++){
                let trueLeader = false;
                for(let j=0; j<arr4.length; j++){
                    if(i!==j && arr4[i].user_id === action.payload[j].superior_id){
                        trueLeader = true;
                        break;
                    }
                }
                arr4[i] = {user_id: action.payload[i].user_id,
                            project_role_id: action.payload[i].project_role_id,
                            superior_id: action.payload[i].superior_id,
                            project_role_name: action.payload[i].project_role_name,
                            trueLeader: trueLeader}
            }
            return {...state, members: arr4}
        case CHANGE_MANAGEMEMBER:
            return {...state, isManaging: action.payload};
        case MODIFY_MANAGESTATE:
            return {...state, manageState: action.payload};
        case CREATE_MEMBER:
            state.members.push(action.payload);
            let arr5 = state.members;
            for(let i=0; i<arr5.length; i++){
                let trueLeader = false;
                for(let j=0; j<arr5.length; j++){
                    if(i!==j && arr5[i].user_id === state.members[j].superior_id){
                        trueLeader = true;
                        break;
                    }
                }
                arr5[i] = {user_id: state.members[i].user_id,
                    project_role_id: state.members[i].project_role_id,
                    superior_id: state.members[i].superior_id,
                    project_role_name: state.members[i].project_role_name,
                    trueLeader: trueLeader}
            }
            return {...state, members: arr5, manageState: ''}
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
        case GET_MEMBERDETAIL:
            let arr3 = state.members;
            let i = action.payload.index;
            let detailMember = {
                user_id: arr3[i].user_id,
                project_role_id: arr3[i].project_role_id,
                superior_id: arr3[i].superior_id,
                project_role_name: arr3[i].project_role_name,
                user_name: action.payload.detail.user_name,
                user_email: action.payload.detail.user_email,
                user_department: action.payload.detail.user_department,
                user_telephone: action.payload.detail.user_telephone
            };
            arr3 = state.detailMembers;
            let flag = true;
            for (let i=0; i<arr3.length; i++){
                if(arr3[i].user_id===detailMember.user_id&&arr3[i].project_role_id===detailMember.project_role_id){
                    flag = false;
                    break;
                }
            }
            if(flag)
                arr3.push(detailMember);
            return {...state, detailMembers: arr3}
        case SWITCH_DETAILMEMBERS:
            return {...state, detailed: action.payload}
        case CLEAR_DETAILMEMBERS:
            return {...state, detailMembers: []}
        default:
            return state;
    }
}