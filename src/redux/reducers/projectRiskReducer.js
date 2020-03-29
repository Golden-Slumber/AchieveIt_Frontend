import {
    CHANGE_MANAGEMEMBER,
    CHANGE_PERISSIONS, CHANGE_RISKCOUNTER,
    CHANGE_RISKDESCRIPTION,
    CHANGE_RISKIMPACT,
    CHANGE_RISKLEVEL,
    CHANGE_RISKMODAL, CHANGE_RISKPERSON,
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
    risks: [
        {
            riskId: '1',
            riskType: '2',
            riskDescription: '3',
            riskLevel: '4',
            riskImpact: '5',
            riskCountermeasure: '6',
            riskStatus: '7',
            riskFrequency: '8',
            responsiblePerson: '9'
        },
        {
            riskId: '2',
            riskType: '2',
            riskDescription: '3',
            riskLevel: '4',
            riskImpact: '5',
            riskCountermeasure: '6',
            riskStatus: '7',
            riskFrequency: '8',
            responsiblePerson: '9'
        },
        {
            riskId: '3',
            riskType: '2',
            riskDescription: '3',
            riskLevel: '4',
            riskImpact: '5',
            riskCountermeasure: '6',
            riskStatus: '7',
            riskFrequency: '8',
            responsiblePerson: '9'
        },
        {
            riskId: '4',
            riskType: '2',
            riskDescription: '3',
            riskLevel: '4',
            riskImpact: '5',
            riskCountermeasure: '6',
            riskStatus: '7',
            riskFrequency: '8',
            responsiblePerson: '9'
        },
        {
            riskId: '5',
            riskType: '2',
            riskDescription: '3',
            riskLevel: '4',
            riskImpact: '5',
            riskCountermeasure: '6',
            riskStatus: '7',
            riskFrequency: '8',
            responsiblePerson: '9'
        },
    ],
    isCreating: false,
    currentId: '',
    currentType: '',
    currentDescription: '',
    currentLevel: '',
    currentImpact: '',
    currentCountermeasure: '',
    currentStatus: '',
    currentFrequency: '',
    currentResponsiblePerson: [],
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
        case GET_PROJECTMEMBERSOPTIONS:
            return {...state, membersOptions: action.payload};
        default:
            return state;
    }
}