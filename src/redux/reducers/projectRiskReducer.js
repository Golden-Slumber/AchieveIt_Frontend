import {
    CHANGE_MANAGEMEMBER,
    CHANGE_PERISSIONS, CHANGE_RISKCOUNTER,
    CHANGE_RISKDESCRIPTION,
    CHANGE_RISKIMPACT,
    CHANGE_RISKLEVEL,
    CHANGE_RISKMODAL, CHANGE_RISKPERSON, CHANGE_RISKRELATED,
    CHANGE_RISKSTATUS, CHANGE_RISKTRACK,
    CHANGE_RISKTYPE,
    CHANGE_ROLES,
    CHANGE_SUPERIOR_ID,
    CHANGE_USER_ID,
    CREATE_MEMBER,
    CREATE_RISK,
    DELETE_MEMBER, GET_PROJECTMEMBERSOPTIONS, GET_RISKS,
    MODIFY_MANAGESTATE,
    MODIFY_MEMBER,
    UPDATE_MEMBER
} from "../actions";

const initialState = {
    risks: [],
    isCreating: false,
    currentId: '',
    currentType: '',
    currentDescription: '',
    currentLevel: '',
    currentImpact: '',
    currentCountermeasure: '',
    currentStatus: '',
    currentFrequency: '',
    currentResponsiblePerson: '',
    currentRelatedPerson: [],
    membersOptions: []
}

export default function projectRisk(state=initialState, action){
    switch (action.type) {
        case GET_RISKS:
            return {...state, risks: action.payload};
        case CHANGE_RISKMODAL:
            return {...state, isCreating: action.payload};
        case CREATE_RISK:
            return {...state, risks: [...state.risks, action.payload]};
        case CHANGE_RISKTYPE:
            return {...state, currentType: action.payload};
        case CHANGE_RISKDESCRIPTION:
            return {...state, currentDescription: action.payload};
        case CHANGE_RISKLEVEL:
            return {...state, currentLevel: action.payload};
        case CHANGE_RISKIMPACT:
            return {...state, currentImpact: action.payload};
        case CHANGE_RISKCOUNTER:
            return {...state, currentCountermeasure: action.payload};
        case CHANGE_RISKSTATUS:
            return {...state, currentStatus: action.payload};
        case CHANGE_RISKTRACK:
            return {...state, currentFrequency: action.payload};
        case CHANGE_RISKPERSON:
            return {...state, currentResponsiblePerson: action.payload};
        case CHANGE_RISKRELATED:
            return {...state, currentRelatedPerson: action.payload}
        case GET_PROJECTMEMBERSOPTIONS:
            return {...state, membersOptions: action.payload};
        default:
            return state;
    }
}