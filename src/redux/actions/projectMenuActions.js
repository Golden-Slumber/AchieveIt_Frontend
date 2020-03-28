import {
    SWITCH_DEFECT,
    SWITCH_DETAIL,
    SWITCH_DEVICE,
    SWITCH_FUNCTION,
    SWITCH_HOUR,
    SWITCH_MEMBER,
    SWITCH_RISK
} from "./actionTypes";

export function switchDetail(){
    return {
        type: SWITCH_DETAIL
    }
}

export function switchMember(){
    return {
        type: SWITCH_MEMBER
    }
}

export function switchFunction(){
    return {
        type: SWITCH_FUNCTION
    }
}

export function switchHour(){
    return {
        type: SWITCH_HOUR
    }
}

export function switchDevice(){
    return {
        type: SWITCH_DEVICE
    }
}

export function switchRisk(){
    return {
        type: SWITCH_RISK
    }
}

export function switchDefect(){
    return {
        type: SWITCH_DEFECT
    }
}