import {
    CHANGE_CREATEMEMBER,
    CHANGE_DELETEMEMBER,
    CHANGE_MANAGEMEMBER,
    CHANGE_MODIFYMEMBER, CHANGE_PERISSIONS, CHANGE_ROLES, CHANGE_SUPERIOR_ID,
    CHANGE_USER_ID, CREATE_MEMBER, DELETE_MEMBER, MODIFY_MANAGESTATE, MODIFY_MEMBER, UPDATE_MEMBER
} from "./actionTypes";

export function startManaging(){
    console.log("function manage");
    return {
        type: CHANGE_MANAGEMEMBER,
        payload: true
    }
}

export function cancelManage() {
    return {
        type: MODIFY_MANAGESTATE,
        payload: ''
    }
}


export function startCreating(){
    console.log("function create");
    return {
        type: MODIFY_MANAGESTATE,
        payload: 'create'
    }
}

export function startModifying(userId){
    console.log("function modify");
    return async (dispatch) => {
        dispatch({
            type: CHANGE_USER_ID,
            payload: userId
        });
        dispatch({
            type: MODIFY_MANAGESTATE,
            payload: 'modify'
        });
    }
}

export function startDeleting(userId){
    console.log("function delete");
    return async (dispatch) => {
        dispatch({
            type: CHANGE_USER_ID,
            payload: userId
        });
        dispatch({
            type: MODIFY_MANAGESTATE,
            payload: 'delete'
        });
    }
}

export function changeUserId(userId){
    return {
        type: CHANGE_USER_ID,
        payload: userId
    }
}

export function changeSuperiorId(superiorId){
    return {
        type: CHANGE_SUPERIOR_ID,
        payload: superiorId
    }
}

export function changeRoles(roles){
    return {
        type: CHANGE_ROLES,
        payload: roles
    }
}

export function changePermissions(permissions){
    return {
        type: CHANGE_PERISSIONS,
        payload: permissions
    }
}

export function createMember(userId, superiorId, roles, permissions){
    let member = {
        userId: userId,
        superiorId: superiorId,
        roles: roles,
        permissions: permissions
    }

    return async (dispatch) => {
        dispatch({
            type: CREATE_MEMBER,
            payload: member
        })
    }
}

export function modifyMember(userId, superiorId, roles, permissions){
    let member = {
        userId: userId,
        superiorId: superiorId,
        roles: roles,
        permissions: permissions
    }

    return async (dispatch) => {
        dispatch({
            type: MODIFY_MEMBER,
            payload: member
        })
    }
}

export function deleteMember(userId){

    return async (dispatch) => {
        dispatch({
            type: DELETE_MEMBER,
            payload: userId
        })
    }
}

export function updateMember(members){

    //todo

    return async (dispatch) => {
        dispatch({
            type: CHANGE_MANAGEMEMBER,
            payload: false
        })
        dispatch({
            type: UPDATE_MEMBER,
            payload: members
        })
    }
}