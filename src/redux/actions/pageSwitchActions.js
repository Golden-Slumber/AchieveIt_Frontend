import {
    ILLEGAL_ACCESS,
    CLOSE_ILLEGAL_ACCESS,
} from "./actionTypes";

export function illegalAccess() {
    return {
        type: ILLEGAL_ACCESS
    }
}

export function closeIllegalAccess() {
    return {
        type: CLOSE_ILLEGAL_ACCESS
    }
}
