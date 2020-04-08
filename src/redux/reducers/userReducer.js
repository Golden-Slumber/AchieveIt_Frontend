import {
    CHANGE_ADMIN,
    CHANGE_FAILEDSTATE,
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
    CHANGE_USER_ID, CHNAGE_SUCCESSSTATE,
    CREATE_MEMBER,
    CREATE_RISK,
    DELETE_MEMBER,
    MODIFY_MANAGESTATE,
    MODIFY_MEMBER, SET_GLOBALROLE, SET_PERMISSIONS, SET_PROJECTROLES, SET_USERID, SET_USERNAME,
    UPDATE_MEMBER
} from "../actions";

const initialState = {
    failed: '',
    successful: '',
    username: '',
    globalRole: '',
    user_id: '',
    projectRoles: [],
    isPropertyAdmin: false,
    permissions: []
}

export default function userReducer(state=initialState, action){
    switch (action.type) {
        case CHANGE_FAILEDSTATE:
            return {...state, failed: action.payload}
        case CHNAGE_SUCCESSSTATE:
            return {...state, successful: action.payload}
        case SET_USERNAME:
            return {...state, username: action.payload}
        case SET_GLOBALROLE:
            return {...state, globalRole: action.payload}
        case SET_USERID:
            return {...state, user_id: action.payload}
        case SET_PROJECTROLES:
            return {...state, projectRoles: action.payload}
        case CHANGE_ADMIN:
            return {...state, isPropertyAdmin: action.payload}
        case SET_PERMISSIONS:
            return {...state, permissions: action.payload}
        default:
            return state;
    }
}