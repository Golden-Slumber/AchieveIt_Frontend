import {
    CHANGE_FUNCTIONDESCRIPTION,
    CHANGE_FUNCTIONMANAGE,
    CREATE_FUNCTION, DELETE_FUNCTION,
    FUNCTION_MANAGESTATE, MODIFY_FUNCTION,
    SET_FUNCTIONID,
    SET_FUNCTIONSUPERIOR, UPDATE_FUNCTION
} from "./actionTypes";

export function functionManaging(){
    return {
        type: CHANGE_FUNCTIONMANAGE,
        payload: true
    }
}

export function cancelFunctionManage(){
    return {
        type: FUNCTION_MANAGESTATE,
        payload: ''
    }
}

export function startCreating(){
    return {
        type: FUNCTION_MANAGESTATE,
        payload: 'create'
    }
}

export function startModifying(functionId, SuperiorId) {
    return async (dispatch) => {
        dispatch({
            type: SET_FUNCTIONID,
            payload: functionId
        });
        dispatch({
            type: SET_FUNCTIONSUPERIOR,
            payload: SuperiorId
        });
        dispatch({
            type: FUNCTION_MANAGESTATE,
            payload: 'modify'
        });
    }
}

export function startDeleting(functionId){
    return async (dispatch) => {
        dispatch({
            type: SET_FUNCTIONID,
            payload: functionId
        });
        dispatch({
            type: FUNCTION_MANAGESTATE,
            payload: 'delete'
        });
    }
}

export function createFunction(functionId, superiorId, description){
    let newFunction = {
        functionId: functionId,
        superiorId: superiorId,
        functionDescription: description
    }

    return async (dispatch) => {
        dispatch({
            type: FUNCTION_MANAGESTATE,
            payload: ''
        });
        dispatch({
           type: CREATE_FUNCTION,
           payload: newFunction
        });
    }
}

export function modifyFunction(functionId, superiorId, description) {
    let newFunction = {
        functionId: functionId,
        superiorId: superiorId,
        functionDescription: description
    }

    return async (dispatch) => {
        dispatch({
            type: FUNCTION_MANAGESTATE,
            payload: ''
        });
        dispatch({
            type: MODIFY_FUNCTION,
            payload: newFunction
        });
    }
}

export function deleteFunction(functionId){
    return async (dispatch) => {
        dispatch({
            type: FUNCTION_MANAGESTATE,
            payload: ''
        });
        dispatch({
            type: DELETE_FUNCTION,
            payload: functionId
        });
    }
}

export function setFunctionId(functionId){
    return {
        type: SET_FUNCTIONID,
        payload: functionId
    }
}

export function setSuperiorId(superiorId){
    return {
        type: SET_FUNCTIONSUPERIOR,
        payload: superiorId
    }
}

export function changeFunctionDescription(description){
    return {
        type: CHANGE_FUNCTIONDESCRIPTION,
        payload: description
    }
}

export function updateFunction(firstFunctions, secondFunctions){
    let newFunctions = {
        firstFunctions: firstFunctions,
        secondFunctions: secondFunctions
    }

    return async (dispatch) => {
        dispatch({
            type: CHANGE_FUNCTIONMANAGE,
            payload: false
        });
        dispatch({
            type: UPDATE_FUNCTION,
            payload: newFunctions
        });
    }
}