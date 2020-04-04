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
    CHANGE_BUNIESSFIELD, GET_RELATIVE_PROJECTS, CHANGE_PROJECTPAGE, CHANGE_MOREPROJECT, GET_RELATIVE_PROJECTSBYSTATUS
} from "../actions";
import currentPage from "./currentPageReducer";

const initialState = {
    keyword: '',
    currentPage: 1,
    more: true,
    projects: [],
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
        case CHANGE_PROJECTPAGE:
            return {...state, currentPage: action.payload};
        case CHANGE_MOREPROJECT:
            return {...state, more: action.payload};
        case GET_RELATIVE_PROJECTS:
            let arr1;
            if(state.currentPage === 1){
                arr1 = action.payload;
            }else{
                arr1 =  state.projects.concat(action.payload);
            }
            return {...state, projects: arr1};
        case GET_RELATIVE_PROJECTSBYSTATUS:
            let arr3;
            if(action.payload.type === 'ReadyArchive'){
                arr3 = state.projects.concat(action.payload.relativeProjects);
            }else{
                arr3 = action.payload.relativeProjects;
            }
            console.log(arr3);
            return {...state, projects: arr3}
        case SEARCH_PROJECT:
            let arr2 = action.payload.map((item, index) => {
                return {id: item.project_id, name: item.project_name, status: item.status}
            });
            let arr;
            if(state.currentPage === 1){
                arr = arr2;
            }else{
                arr = state.projects.concat(arr2);
            }
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
        default:
            return state;
    }
}