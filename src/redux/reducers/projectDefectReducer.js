import {
    CHANGE_CURRENTDEVICEPAGE, CHANGE_CURRENTTIME,
    CHANGE_DEVICEMANAGER,
    CHANGE_DEVICEMODAL,
    CHANGE_DEVICEPAGE, CHANGE_DEVICESTATE,
    CHANGE_MODIFYSTATE, CHANGE_MOREDEVICE, CHANGE_RETURNTIME, GET_DEVICE, GET_URL,
    MODIFY_BUNIESSFIELD,
    MODIFY_CUSTOMER,
    MODIFY_ENDTIME, MODIFY_MAINFUNCTION, MODIFY_MAINTECH,
    MODIFY_MILESTONE,
    MODIFY_PROJECTNAME,
    MODIFY_STARTTIME,
    PROJECTID_SET, RETURN_DEVICE, SET_DEVICEID, SET_DEVICES, TENANCY_DEVICE, VERIFY_DEVICE
} from "../actions";
import currentPage from "./currentPageReducer";

const initialState = {
    url: ''
};

export default function projectDefect(state = initialState, action) {
    switch (action.type) {
        case GET_URL:
            return {...state, url: action.payload}
        default:
            return state;
    }
}