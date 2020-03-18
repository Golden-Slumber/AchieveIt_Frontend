import {
    CHANGE_BUNIESSFIELD,
    CHANGE_CUSTOMER,
    CHANGE_ENDTIME,
    CHANGE_KEYWORD,
    CHANGE_MAINFUNCTION,
    CHANGE_MAINTECH,
    CHANGE_MILESTONE, CHANGE_PROJECTID,
    CHANGE_PROJECTNAME,
    CHANGE_STARTTIME, GET_RELATIVE_PROJECTS,
    PROJECT_SETUP,
    SEARCH_PROJECT
} from "./actionTypes";
import history from '../../history';

export function changeKeyword(keyword){
    return {
        type: CHANGE_KEYWORD,
        payload: keyword
    }
}

export function getRelativeProjects(){

    //todo /project/listRelative pages

    return {
        type: GET_RELATIVE_PROJECTS,
        payload: [
            {
                id: '123',
                name: '123',
                status: '123'
            },
            {
                id: '123',
                name: '123',
                status: '123'
            },
            {
                id: '123',
                name: '123',
                status: '123'
            }
        ]
    }
}

export function searchProject(keyword){

    //todo /project/search pages

    return async (dispatch) => {
        dispatch({
            type: CHANGE_KEYWORD,
            payload: ''
        });
        dispatch({
            type: SEARCH_PROJECT,
            payload: [
                {
                    projectId: keyword,
                    projectName: keyword,
                    projectStatus: keyword
                },
                {
                    projectId: keyword,
                    projectName: keyword,
                    projectStatus: keyword
                },
                {
                    projectId: keyword,
                    projectName: keyword,
                    projectStatus: keyword
                }
            ]
        });
    }
}

export function projectSetup(projectId, projectName, customer, startTime, endTime, milestone, mainTech, businessField, mainFunction) {

    //todo /project/setUp

    let projectSetupInfo = {
        projectId: projectId,
        projectName: projectName,
        customer: customer,
        startTime: startTime,
        endTime: endTime,
        milestone: milestone,
        mainTech: mainTech,
        businessField: businessField,
        mainFunction: mainFunction
    }

    return async (dispatch) => {
        history.push('/project');
        dispatch({
            type: PROJECT_SETUP,
            payload: projectSetupInfo
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