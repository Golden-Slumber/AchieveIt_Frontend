import {
    CHANGE_ACTIVITY,
    CHANGE_FUNCTIONID,
    CHANGE_HOURMODALSTATE,
    CHANGE_HOURPAGESTATE, CHANGE_VERIFYSTATE, CHANGE_WORKENDTIME, CHANGE_WORKSTARTTIME,
    CREATE_WORKINGHOUR, GET_VERIFYHOURS, GET_WORKHOURS,
    MODIFY_WORKINGHOUR, SET_ACTIVITYOPTIONS, SET_FUNCTIONHOUROPTIONS,
    SET_WORKINGHOURID,
    VERIFY_WORKINGHOUR

} from "../actions";


const initialState = {
    workingHours: [],
    verifyList: [],
    hourPageState: '',
    hourModalState: '',
    currentWorkingHourId: '',
    currentActivityType: '',
    currentFunctionType: '',
    currentStartTime: '',
    currentEndTime: '',
    verifyState: 'false',
    functionHourOptions: [],
    activityOptions: []
};

export default function projectHour(state = initialState, action){
    switch (action.type) {
        case GET_WORKHOURS:
            return {...state, workingHours: action.payload};
        case GET_VERIFYHOURS:
            return {...state, verifyList: action.payload};
        case CHANGE_HOURPAGESTATE:
            return {...state, hourPageState: action.payload};
        case CHANGE_HOURMODALSTATE:
            return {...state, hourModalState: action.payload};
        case SET_WORKINGHOURID:
            return {...state, currentWorkingHourId: action.payload};
        case CHANGE_FUNCTIONID:
            return {...state, currentFunctionType: action.payload};
        case CHANGE_ACTIVITY:
            return {...state, currentActivityType: action.payload};
        case CHANGE_WORKSTARTTIME:
            return {...state, currentStartTime: action.payload};
        case CHANGE_WORKENDTIME:
            return {...state, currentEndTime: action.payload};
        case CHANGE_VERIFYSTATE:
            return {...state, verifyState: action.payload};
        case SET_FUNCTIONHOUROPTIONS:
            return {...state, functionHourOptions: action.payload}
        case SET_ACTIVITYOPTIONS:
            return {...state, activityOptions: action.payload}
        default:
            return state;
    }
}

