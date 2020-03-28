import {
    CHANGE_MANAGEMEMBER,
    CHANGE_PERISSIONS,
    CHANGE_ROLES,
    CHANGE_SUPERIOR_ID,
    CHANGE_USER_ID,
    CREATE_MEMBER,
    DELETE_MEMBER,
    GET_MEMBERS,
    MODIFY_MANAGESTATE,
    MODIFY_MEMBER,
    SET_ROLEOPTIONS, SET_SUPERIOROPTIONS,
    UPDATE_MEMBER
} from "./actionTypes";
import {BASE_URL} from "../../constants";

export function getProjectMembers(projectId) {
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/memberConf/'+projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: GET_MEMBERS,
                    payload: data.result
                });
            }else{
                console.log(data.status);
            }
        }).catch(error => {
           console.log(error);
        });
    }
}

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

export function changeRoles(roleId, roleName){
    return {
        type: CHANGE_ROLES,
        payload: {
            roleId: roleId,
            roleName: roleName
        }
    }
}

export function changePermissions(permissions){
    return {
        type: CHANGE_PERISSIONS,
        payload: permissions
    }
}

export function createMember(user_id, superior_id, project_role_id, project_role_name){
    let member = {
        user_id: user_id,
        superior_id: superior_id,
        project_role_id: project_role_id,
        project_role_name: project_role_name
    }

    return async (dispatch) => {
        dispatch({
            type: CREATE_MEMBER,
            payload: member
        })
    }
}

export function modifyMember(userId, projectId, permissions){
    let content = {
        user_id: userId,
        project_id: projectId,
        privilege_list: permissions
    }

    return async (dispatch) => {
        await fetch(BASE_URL+'/user/permission', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(content)
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: MODIFY_MEMBER
                })
            }else{
                console.log(data);
            }
        }).catch(error => {
            console.log(error);
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

export function updateMember(projectId, members){

    let arr = members.map((item, index) => {
       return {user_id: item.user_id.toString(), project_role_id: item.project_role_id, superior_id:item.superior_id.toString()}
    });

    let content = {
        members: arr
    };

    return async (dispatch) => {
        await fetch(BASE_URL+'/project/memberConf/'+projectId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(content)
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHANGE_MANAGEMEMBER,
                    payload: false
                })
                dispatch(getProjectMembers(projectId));
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

export function setRoleOptions(globalRole, members, user_id){
    let roleOptions = [];
    if(globalRole === 'QaManager'){
        roleOptions = [{key: '294226515434930176', value: '294226515434930176 QaStaff', text: 'QaStaff'}];
        for(let i=0; i<members.length; i++){
            if(members[i].project_role_name === 'QaStaff' && members[i].user_id === user_id)
                roleOptions = [];
        }
    }else if(globalRole === 'EpgManager'){
        roleOptions = [{key: '294226523576074240', value: '294226523576074240 EPG', text: 'EPG'}];
        for(let i=0; i<members.length; i++){
            if(members[i].project_role_name === 'EPG' && members[i].user_id === user_id)
                roleOptions = [];
        }
    }else if(globalRole === 'ConfigurationManager'){
        roleOptions = [{key: '294226531868213248', value: '294226531868213248 PropertyAdmin', text: 'PropertyAdmin'}];
        for(let i=0; i<members.length; i++){
            if(members[i].project_role_name === 'PropertyAdmin' && members[i].user_id === user_id)
                roleOptions = [];
        }
    }else{
        roleOptions = [
            {key: '290089467161608193', value: '290089467161608193 DevelopmentLeader', text: 'DevelopmentLeader'},
            {key: '294226508208144384', value: '294226508208144384 TestLeader', text: 'TestLeader'},
            {key: '294226509294469120', value: '294226509294469120 DevelopmentStaff', text: 'DevelopmentStaff'},
            {key: '294226508208155935', value: '294226508208155935 TestStaff', text: 'TestStaff'}
        ]
        let temp = [];
        for(let i=0; i<members.length; i++){
            if(members[i].user_id === user_id){
                temp = roleOptions.filter((item) => {
                    return members[i].project_role_name !== item.text;
                });
                roleOptions = temp;
            }
        }
    }

    return {
        type: SET_ROLEOPTIONS,
        payload: roleOptions
    }
}

export function setSuperiorOptions(role, members, user_id) {
    let options = [];
    switch (role) {
        case 'QaStaff':
        case 'EPG':
        case 'PropertyAdmin':
            for (let i=0; i<members.length; i++){
                if(members[i].project_role_name === 'ProjectManager'){
                    options.push({key: members[i].user_id, value: members[i].user_id, text: members[i].user_id});
                    break;
                }
            }
            break;
        case 'DevelopmentLeader':
        case 'TestLeader':
            options.push({key: user_id, value: user_id, text: user_id});
            break;
        case 'DevelopmentStaff':
            for (let i=0; i<members.length; i++){
                if(members[i].project_role_name === 'DevelopmentLeader'){
                    options.push({key: members[i].user_id, value: members[i].user_id, text: members[i].user_id});
                }
            }
            break;
        case 'TestStaff':
            for (let i=0; i<members.length; i++){
                if(members[i].project_role_name === 'TestLeader'){
                    options.push({key: members[i].user_id, value: members[i].user_id, text: members[i].user_id});
                }
            }
            break;
        default:
            break;
    }
    return {
        type: SET_SUPERIOROPTIONS,
        payload: options
    }
}