import {
    SWITCH_DEFECT,
    SWITCH_DETAIL,
    SWITCH_DEVICE,
    SWITCH_FUNCTION,
    SWITCH_HOUR,
    SWITCH_MEMBER,
    SWITCH_RISK
} from "../actions";


const initialState = {
    detail: 'item active',
    member: 'item',
    function: 'item',
    hour: 'item',
    device: 'item',
    risk: 'item',
    defect: 'item'
};

export default function projectMenu(state = initialState, action) {
    switch (action.type) {
        case SWITCH_DETAIL:
            return {
                ...state,
                detail: 'item active',
                member: 'item',
                function: 'item',
                hour: 'item',
                device: 'item',
                risk: 'item',
                defect: 'item'
            }
        case SWITCH_MEMBER:
            return {
                ...state,
                detail: 'item',
                member: 'item active',
                function: 'item',
                hour: 'item',
                device: 'item',
                risk: 'item',
                defect: 'item'
            };
        case SWITCH_FUNCTION:
            return {
                ...state,
                detail: 'item',
                member: 'item',
                function: 'item active',
                hour: 'item',
                device: 'item',
                risk: 'item',
                defect: 'item'
            };
        case SWITCH_HOUR:
            return {
                ...state,
                detail: 'item',
                member: 'item',
                function: 'item',
                hour: 'item active',
                device: 'item',
                risk: 'item',
                defect: 'item'
            };
        case SWITCH_DEVICE:
            return {
                ...state,
                detail: 'item',
                member: 'item',
                function: 'item',
                hour: 'item',
                device: 'item active',
                risk: 'item',
                defect: 'item'
            };
        case SWITCH_RISK:
            return {
                ...state,
                detail: 'item',
                member: 'item',
                function: 'item',
                hour: 'item',
                device: 'item',
                risk: 'item active',
                defect: 'item'
            };
        case SWITCH_DEFECT:
            return {
                ...state,
                detail: 'item',
                member: 'item',
                function: 'item',
                hour: 'item',
                device: 'item',
                risk: 'item',
                defect: 'item active'
            };
        default:
            return state;
    }
}