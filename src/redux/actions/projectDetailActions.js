import {
    CHANGE_MODIFYSTATE,
    MODIFY_BUNIESSFIELD,
    MODIFY_CUSTOMER,
    MODIFY_ENDTIME, MODIFY_MAINFUNCTION,
    MODIFY_MAINTECH, MODIFY_MILESTONE,
    MODIFY_PROJECTNAME,
    MODIFY_STARTTIME,
    PROJECTID_SET
} from "./actionTypes";
import history from '../../history';

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

export function modifyProjectInfo(){

    return async (dispatch) => {
        dispatch({
            type: CHANGE_MODIFYSTATE,
            payload: false
        });
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