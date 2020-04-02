import {
    CHANGE_CHOICE,
    CHANGE_MODIFYSTATE, CHANGE_PROJECTSTATE, CHANGE_PUSHSTATE,
    MODIFY_BUNIESSFIELD,
    MODIFY_CUSTOMER,
    MODIFY_ENDTIME, MODIFY_MAINFUNCTION,
    MODIFY_MAINTECH, MODIFY_MILESTONE,
    MODIFY_PROJECTNAME,
    MODIFY_STARTTIME,
    PROJECTID_SET
} from "./actionTypes";
import history from '../../history';
import {BASE_URL} from "../../constants";
import {formFailed} from "./userActions";

export function setProjectId(projectId){
    return {
        type: PROJECTID_SET,
        payload: projectId
    }
}

export function startModifying(){
    return {
        type: CHANGE_MODIFYSTATE,
        payload: true
    }
}

export function modifyProjectName(projectName){
    return {
        type: MODIFY_PROJECTNAME,
        payload: projectName
    }
}

export function modifyCustomer(customer){
    return {
        type: MODIFY_CUSTOMER,
        payload: customer
    }
}

export function modifyStartTime(startTime){
    return {
        type: MODIFY_STARTTIME,
        payload: startTime
    }
}

export function modifyEndTime(endTime){
    return {
        type: MODIFY_ENDTIME,
        payload: endTime
    }
}

export function modifyMilestone(milestone){
    return {
        type: MODIFY_MILESTONE,
        payload: milestone
    }
}

export function modifyMainTech(mainTech){
    return {
        type: MODIFY_MAINTECH,
        payload: mainTech
    }
}

export function modifyBusinessField(businessField){
    return {
        type: MODIFY_BUNIESSFIELD,
        payload: businessField
    }
}

export function modifyMainFunction(mainFunction){
    return {
        type: MODIFY_MAINFUNCTION,
        payload: mainFunction
    }
}

export function getProjectDetail(projectId){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/detail/'+projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch(modifyProjectName(data.result.project_name));
                dispatch(modifyCustomer(data.result.referred_outer_customer_id));
                dispatch(modifyStartTime(data.result.scheduled_start_time));
                dispatch(modifyEndTime(data.result.scheduled_end_time));
                dispatch(modifyMilestone(data.result.milestone));
                dispatch(modifyMainTech(data.result.technology));
                dispatch(modifyBusinessField(data.result.referred_business_field_id));
                dispatch(modifyMainFunction(data.result.main_function));
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

export function modifyProjectInfo(projectId, projectName, customer, startTime, endTime, milestone, mainTech, businessField, mainFunction){

    let content = {
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

        await fetch(BASE_URL+'/project/detail/'+projectId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(content)
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch(getProjectDetail(projectId));
                dispatch({
                    type: CHANGE_MODIFYSTATE,
                    payload: false
                });
            }else{
                console.log(data.status);
                dispatch(formFailed('modifyProjectDetail'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('modifyProjectDetail'))
        });
    }
}

export function cancelModify(projectId){
    return async (dispatch) => {
        dispatch(getProjectDetail(projectId));
        dispatch({
            type: CHANGE_MODIFYSTATE,
            payload: false
        })
    }
}

export function startPushing(){
    return {
        type: CHANGE_PUSHSTATE,
        payload: true
    }
}

export function cancelPushing(){
    return {
        type: CHANGE_PUSHSTATE,
        payload: false
    }
}

export function pushProject(projectId, projectStatus){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/status/'+projectId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({status: projectStatus})
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHANGE_PUSHSTATE,
                    payload: false
                });
            }else{
                console.log(data.status);
                dispatch(formFailed('push'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('push'));
        })
    }
}

export function setProjectState(projectState){
    return {
        type: CHANGE_PROJECTSTATE,
        payload: projectState
    }
}

export function changeChoice(choice){
    return {
        type: CHANGE_CHOICE,
        payload: choice
    }
}