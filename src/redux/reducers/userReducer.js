import {
    CHANGE_CREATEMEMBER,
    CHANGE_DELETEMEMBER, CHANGE_FAILEDSTATE,
    CHANGE_MANAGEMEMBER,
    CHANGE_MODIFYMEMBER,
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
    DELETE_MEMBER, FORM_FAILED,
    MODIFY_MANAGESTATE,
    MODIFY_MEMBER, SET_GLOBALROLE, SET_USERNAME,
    UPDATE_MEMBER
} from "../actions";

const initialState = {
    failed: '',
    username: '',
    globalRole: '',
}

export default function userReducer(state=initialState, action){
    switch (action.type) {
        case CHANGE_FAILEDSTATE:
            return {...state, failed: action.payload}
        case SET_USERNAME:
            return {...state, username: action.payload}
        case SET_GLOBALROLE:
            return {...state, globalRole: action.payload}
        default:
            return state;
    }
}