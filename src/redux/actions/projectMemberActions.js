import {
    CHANGE_MANAGEMEMBER,
    CHANGE_PERISSIONS,
    CHANGE_ROLES,
    CHANGE_SUPERIOR_ID,
    CHANGE_USER_ID, CLEAR_DETAILMEMBERS,
    CREATE_MEMBER,
    DELETE_MEMBER, GET_MEMBERDETAIL,
    GET_MEMBERS,
    MODIFY_MANAGESTATE,
    MODIFY_MEMBER,
    SET_ROLEOPTIONS, SET_SUPERIOROPTIONS, SWITCH_DETAILMEMBERS,
    UPDATE_MEMBER
} from "./actionTypes";
import {BASE_URL, DEPENDENCY_URL} from "../../constants";
import {formFailed, formSuccess} from "./userActions";

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
                for(let i=0; i<data.result.length; i++){
                    dispatch(getMemberDetail(i, data.result[i].user_id));
                }
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

export function cancelMemberManage(){
    return {
        type: CHANGE_MANAGEMEMBER,
        payload: false
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

    return {
        type: CREATE_MEMBER,
        payload: member
    }
}

export function modifyMember(userId, projectId, permissions){
    let content = {
        user_id: userId,
        project_id: projectId,
        privilege_list: permissions
    }

    console.log(content);

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
                });
                dispatch(formSuccess('updatePermission'))
            }else{
                console.log(data);
                dispatch(formFailed('updatePermission'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('updatePermission'));
        })
    }
}

export function deleteMember(userId){

    return {
        type: DELETE_MEMBER,
        payload: userId
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
                });
                dispatch(getProjectMembers(projectId));
            }else{
                console.log(data.status);
                dispatch(formFailed('updateMember'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('updateMember'));
        })
    }
}

export function getMemberDetail(index, user_id){
    return async (dispatch) => {
        await fetch(DEPENDENCY_URL+'/personnel/byId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: user_id})
        }).then(res => res.json()
        ).then(data => {
            dispatch({
                type: GET_MEMBERDETAIL,
                payload: {
                    index: index,
                    detail: data
                }
            });
        }).catch(error => {
            console.log(error);
        })
    }
}

export function switchDetailMembers(detailed){
    return {
        type: SWITCH_DETAILMEMBERS,
        payload: detailed
    }
}

export function clearDetailMembers(){
    return {
        type: CLEAR_DETAILMEMBERS
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