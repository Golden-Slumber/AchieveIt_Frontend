import {
    SEARCH_PROJECT,
    CHANGE_KEYWORD,
    CHANGE_PROJECTNAME,
    CHANGE_STARTTIME,
    CHANGE_ENDTIME,
    CHANGE_MILESTONE,
    CHANGE_MAINTECH,
    CHANGE_MAINFUNCTION,
    PROJECT_SETUP,
    CHANGE_PROJECTID,
    CHANGE_CUSTOMER,
    CHANGE_BUNIESSFIELD, GET_RELATIVE_PROJECTS
} from "../actions";

const initialState = {
    keyword: '',
    projects: [
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
    ],
    projectSetupInfo: {
        projectId: '',
        projectName: '',
        customer: '',
        startTime: '',
        endTime: '',
        milestone: '',
        mainTech: '',
        businessField: '',
        mainFunction: ''
    }
};

export default function projectHome(state = initialState, action) {
    switch (action.type) {
        case CHANGE_KEYWORD:
            return {...state, keyword: action.payload};
        case GET_RELATIVE_PROJECTS:
            return {...state, projects: action.payload};
        case SEARCH_PROJECT:
            let arr = action.payload.map((item, index) => {
                return {id: item.projectId, name: item.projectName, status: item.projectStatus}
            });
            return {...state, projects: arr};
        case CHANGE_PROJECTID:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, projectId: action.payload}}
        case CHANGE_PROJECTNAME:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, projectName: action.payload}}
        case CHANGE_CUSTOMER:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, customer: action.payload}}
        case CHANGE_STARTTIME:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, startTime: action.payload}}
        case CHANGE_ENDTIME:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, endTime: action.payload}}
        case CHANGE_MILESTONE:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, milestone: action.payload}}
        case CHANGE_MAINTECH:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, mainTech: action.payload}}
        case CHANGE_BUNIESSFIELD:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, businessField: action.payload}}
        case CHANGE_MAINFUNCTION:
            return {...state, projectSetupInfo: {...state.projectSetupInfo, mainFunction: action.payload}}
        case PROJECT_SETUP:
            let project = { id: action.payload.projectId, name: action.payload.projectName, status: '待审核'};
            return {...state, projects: [...state.projects, project]}
        default:
            return state;
    }
}