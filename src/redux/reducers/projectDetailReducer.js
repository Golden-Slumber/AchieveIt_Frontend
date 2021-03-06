import {
    CHANGE_CHOICE,
    CHANGE_MODIFYSTATE, CHANGE_PROJECTSTATE, CHANGE_PUSHSTATE,
    MODIFY_BUNIESSFIELD,
    MODIFY_CUSTOMER,
    MODIFY_ENDTIME, MODIFY_MAINFUNCTION, MODIFY_MAINTECH,
    MODIFY_MILESTONE,
    MODIFY_PROJECTNAME,
    MODIFY_STARTTIME,
    PROJECTID_SET
} from "../actions";

const initialState = {
    projectId: 'ProjectID',
    projectName: '',
    customer: '',
    startTime: '',
    endTime: '',
    milestone: '',
    mainTech: '',
    businessField: '',
    mainFunction: '',
    isModifying: false,
    isPushing: false,
    projectState: '',
    choice: ''
};

export default function projectDetail(state = initialState, action) {
    switch (action.type) {
        case PROJECTID_SET:
            return {...state, projectId: action.payload};
        case CHANGE_PUSHSTATE:
            return {...state, isPushing: action.payload};
        case CHANGE_PROJECTSTATE:
            return {...state, projectState: action.payload};
        case CHANGE_MODIFYSTATE:
            return {...state, isModifying: action.payload};
        case MODIFY_PROJECTNAME:
            return {...state, projectName: action.payload};
        case MODIFY_CUSTOMER:
            return {...state, customer: action.payload};
        case MODIFY_STARTTIME:
            return {...state, startTime: action.payload};
        case MODIFY_ENDTIME:
            return {...state, endTime: action.payload};
        case MODIFY_MILESTONE:
            return {...state, milestone: action.payload};
        case MODIFY_MAINTECH:
            return {...state, mainTech: action.payload};
        case MODIFY_BUNIESSFIELD:
            return {...state, businessField: action.payload};
        case MODIFY_MAINFUNCTION:
            return {...state, mainFunction: action.payload};
        case CHANGE_CHOICE:
            return {...state, choice: action.payload};
        default:
            return state;
    }
}