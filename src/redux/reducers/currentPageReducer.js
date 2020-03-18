import {
    ILLEGAL_ACCESS, CLOSE_ILLEGAL_ACCESS
} from "../actions/actionTypes";

const initialState = {
    illegal: false
};

export default function currentPage(state = initialState, action) {
    switch (action.type) {
        case ILLEGAL_ACCESS:
            return {...state, illegal: true};
        case CLOSE_ILLEGAL_ACCESS:
            return {...state, illegal: false};
        default:
            return state;
    }
}