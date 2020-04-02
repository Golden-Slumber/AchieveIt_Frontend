import {
    CHANGE_BUNIESSFIELD,
    CHANGE_CUSTOMER,
    CHANGE_ENDTIME,
    CHANGE_KEYWORD,
    CHANGE_MAINFUNCTION,
    CHANGE_MAINTECH,
    CHANGE_MILESTONE, CHANGE_MOREPROJECT, CHANGE_PROJECTID,
    CHANGE_PROJECTNAME, CHANGE_PROJECTPAGE,
    CHANGE_STARTTIME, CHNAGE_SUCCESSSTATE, GET_RELATIVE_PROJECTS,
    PROJECT_SETUP,
    SEARCH_PROJECT
} from "./actionTypes";
import history from '../../history';
import {BASE_URL, PAGE_SIZE} from "../../constants";
import {formFailed, formSuccess} from "./userActions";
import {updateMember} from "./projectMemberActions";

export function changeKeyword(keyword){
    return {
        type: CHANGE_KEYWORD,
        payload: keyword
    }
}

export function changeProjectPage(currentPage){
    return {
        type: CHANGE_PROJECTPAGE,
        payload: currentPage
    }
}

export function getRelativeProjectsbyStatus(status){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/getByStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({status: status})
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                let arr = [];
                if(data.result !== null){
                    arr = data.result.map((item, index) => {
                        return {id: item.project_id, name: item.project_name, status: item.status}
                    });
                }
                dispatch({
                    type: GET_RELATIVE_PROJECTS,
                    payload: arr
                });
                dispatch({
                    type: CHANGE_MOREPROJECT,
                    payload:false
                });
            }
        }).catch(error => {
           console.log(error);
        });
    }
}

export function getRelativeProjects(currentPage){

    let content = {page_size: PAGE_SIZE, current_page: currentPage}
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/listRelative', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(content)
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
            if(data.status === 'SUCCESS'){
                let arr = [];
                if(data.result !== null){
                    arr = data.result.map((item, index) => {
                        return {id: item.project_id, name: item.project_name, status: item.status}
                    });
                }
                dispatch({
                    type: GET_RELATIVE_PROJECTS,
                    payload: arr
                });
                dispatch({
                    type: CHANGE_MOREPROJECT,
                    payload:arr.length>=PAGE_SIZE
                });
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

export function searchProject(keyword, currentPage){

    let content = {key_word:keyword, page_size:PAGE_SIZE, current_page:currentPage}
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHANGE_KEYWORD,
                    payload: ''
                });
                dispatch({
                    type: SEARCH_PROJECT,
                    payload: data.result
                });
                dispatch({
                    type: CHANGE_MOREPROJECT,
                    payload:data.result.length>=PAGE_SIZE
                });
            }else{
                dispatch(formFailed('search'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('search'));
        });
    }
}

export function projectSetup(userId, projectId, projectName, customer, startTime, endTime, milestone, mainTech, businessField, mainFunction) {

    let projectSetupInfo = {
        project_id: projectId,
        project_name: projectName,
        referred_outer_customer_id: customer,
        scheduled_start_time: startTime,
        scheduled_end_time: endTime,
        milestone: milestone,
        technology: mainTech,
        referred_business_field_id: businessField,
        main_function: mainFunction
    }

    return async (dispatch) => {
        await fetch(BASE_URL+'/project/setUp', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectSetupInfo),
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHNAGE_SUCCESSSTATE,
                    payload: 'setup'
                })
                dispatch(updateMember(projectId, [{user_id: userId, project_role_id: '294226508209937573', superior_id: userId}]));
                history.push('/project');
            }else{
                dispatch(formFailed('setup'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('setup'));
        });

    }
}

export function changeProjectId(projectId){
    return {
        type: CHANGE_PROJECTID,
        payload: projectId
    }
}

export function changeProjectName(projectName){
    return {
        type: CHANGE_PROJECTNAME,
        payload: projectName
    }
}

export function changeCustomer(customer){
    return {
        type: CHANGE_CUSTOMER,
        payload: customer
    }
}

export function changeStartTime(startTime){
    return {
        type: CHANGE_STARTTIME,
        payload: startTime
    }
}

export function changeEndTime(endTime){
    return {
        type: CHANGE_ENDTIME,
        payload: endTime
    }
}

export function changeMilestone(milestone){
    return {
        type: CHANGE_MILESTONE,
        payload: milestone
    }
}

export function changeMainTech(mainTech){
    return {
        type: CHANGE_MAINTECH,
        payload: mainTech
    }
}

export function changeBusinessField(businessField){
    return {
        type: CHANGE_BUNIESSFIELD,
        payload: businessField
    }
}

export function changeMainFunction(mainFunction){
    return {
        type: CHANGE_MAINFUNCTION,
        payload: mainFunction
    }
}