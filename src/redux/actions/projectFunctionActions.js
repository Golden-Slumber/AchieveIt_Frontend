import {
    CHANGE_FUNCTIONDESCRIPTION,
    CHANGE_FUNCTIONMANAGE, CHANGE_UPLOADSTATE,
    CREATE_FUNCTION, DELETE_FUNCTION,
    FUNCTION_MANAGESTATE, GET_FUNCTIONS, MODIFY_FUNCTION,
    SET_FUNCTIONID,
    SET_FUNCTIONSUPERIOR, SET_SUPERIORFUNCTIONS, UPDATE_FUNCTION
} from "./actionTypes";
import {BASE_URL} from "../../constants";

export function getProjectFunction(projectId){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/function/'+projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                console.log(data.result);
                let arr = data.result
                let firstFunctions = data.result.first_level_functions.map((item, index) => {
                    return {functionId: item.id_for_display, superiorId: item.superior_display_id, functionDescription: item.function_description}
                });
                let secondFunctions = data.result.second_level_functions.map((item, index) => {
                    return {functionId: item.id_for_display, superiorId: item.superior_display_id, functionDescription: item.function_description}
                });
                dispatch({
                    type: GET_FUNCTIONS,
                    payload: {
                        firstFunctions: firstFunctions,
                        secondFunctions: secondFunctions
                    }
                })
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    // return {
    //     type: GET_FUNCTIONS,
    //     payload: {
    //         firstFunctions: [
    //             {
    //                 functionId: '001',
    //                 superiorId: '001',
    //                 functionDescription: '001'
    //             },
    //             {
    //                 functionId: '002',
    //                 superiorId: '002',
    //                 functionDescription: '002'
    //             },
    //             {
    //                 functionId: '003',
    //                 superiorId: '003',
    //                 functionDescription: '003'
    //             }
    //         ],
    //         secondFunctions: [
    //             {
    //                 functionId: '001001',
    //                 superiorId: '001',
    //                 functionDescription: '001'
    //             },
    //             {
    //                 functionId: '001002',
    //                 superiorId: '001',
    //                 functionDescription: '002'
    //             },
    //             {
    //                 functionId: '003001',
    //                 superiorId: '003',
    //                 functionDescription: '003'
    //             }
    //         ]
    //     }
    // }
}

export function setSuperiorFunctionOptions(functions){
    let superiorFunctions = [{key: 'self', value: 'self', text: 'self'}];
    for(let i=0; i<functions.length; i++){
        superiorFunctions.push({key: functions[i].functionId, value: functions[i].functionId, text: functions[i].functionId});
    }
    return {
        type: SET_SUPERIORFUNCTIONS,
        payload: superiorFunctions
    }
}

export function startUploading(){
    return {
        type: CHANGE_UPLOADSTATE,
        payload: true
    }
}

export function cancelUploading(){
    return {
        type: CHANGE_UPLOADSTATE,
        payload: false
    }
}

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

export function updateFunction(projectId, firstFunctions, secondFunctions){
    let functions = [];
    for(let i=0; i<firstFunctions.length; i++){
        functions.push({function_id: firstFunctions[i].functionId, function_description: firstFunctions[i].functionDescription, superior_function_id: firstFunctions[i].superiorId});
    }
    for (let i=0; i<secondFunctions.length; i++){
        functions.push({function_id: secondFunctions[i].functionId, function_description: secondFunctions[i].functionDescription, superior_function_id: secondFunctions[i].superiorId});
    }

    let content = {
        functions: functions
    }

    return async (dispatch) => {

        await fetch(BASE_URL+'/project/function/'+projectId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(content)
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch({
                    type: CHANGE_FUNCTIONMANAGE,
                    payload: false
                });
                dispatch(getProjectFunction(projectId));
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}