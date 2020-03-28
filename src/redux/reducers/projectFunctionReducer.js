import {
    CHANGE_FUNCTIONDESCRIPTION, CHANGE_FUNCTIONMANAGE,
    CHANGE_MANAGEMEMBER,
    CHANGE_PERISSIONS,
    CHANGE_ROLES,
    CHANGE_SUPERIOR_ID, CHANGE_UPLOADSTATE, CHANGE_USER_ID, CREATE_FUNCTION,
    CREATE_MEMBER, DELETE_FUNCTION,
    DELETE_MEMBER, FUNCTION_MANAGESTATE, GET_FUNCTIONS, GET_MEMBERS, MODIFY_FUNCTION, MODIFY_MANAGESTATE,
    MODIFY_MEMBER, SET_FUNCTIONID, SET_FUNCTIONSUPERIOR, SET_SUPERIORFUNCTIONS, UPDATE_FUNCTION, UPDATE_MEMBER
} from "../actions";

const initialState = {
    firstFunctions: [],
    secondFunctions: [],
    isManaging: false,
    isUploading: false,
    uploadedData: '',
    manageState: 'null',
    currentFunctionId: '',
    currentSuperiorId: '',
    currentDescription: '',
    superiorFunctions: []
}

function plus1(id) {
    let num = parseInt(id);
    num = num+1;
    let str = num.toString();
    if(str.length === 6){
        return str;
    }else if(str.length === 5){
        return '0'+str;
    }else{
        return '00'+str;
    }
}

let sortFn = (a, b) => {
    if(a.functionId < b.functionId)
        return -1;
    if(a.functionId > b.functionId)
        return 1;
    if(a.functionId === b.functionId)
        return 0
}

export default function projectFunction(state=initialState, action){
    switch (action.type) {
        case GET_FUNCTIONS:
            return {...state, firstFunctions: action.payload.firstFunctions, secondFunctions: action.payload.secondFunctions}
        case SET_SUPERIORFUNCTIONS:
            return {...state, superiorFunctions: action.payload}
        case CHANGE_FUNCTIONMANAGE:
            return {...state, isManaging: action.payload};
        case CHANGE_UPLOADSTATE:
            return {...state, isUploading: action.payload};
        case FUNCTION_MANAGESTATE:
            return {...state, manageState: action.payload};
        case CREATE_FUNCTION:
            if(action.payload.superiorId === 'self'){
                if(state.firstFunctions.length === 0){
                    return {...state, firstFunctions: [...state.firstFunctions, {functionId: '001', superiorId: '001', functionDescription: action.payload.functionDescription}]}
                }
                state.firstFunctions.sort(sortFn);
                let str = state.firstFunctions[state.firstFunctions.length-1].functionId;
                return {...state, firstFunctions: [...state.firstFunctions, {functionId: plus1(str), superiorId: plus1(str), functionDescription: action.payload.functionDescription}]}
            }else{
                state.secondFunctions.sort(sortFn);
                let i=0;
                let flag = true;
                for(; i<state.secondFunctions.length; i++){
                    if(state.secondFunctions[i].superiorId===action.payload.superiorId){
                        flag = false;
                        break;
                    }
                }
                for(; i<state.secondFunctions.length; i++){
                    if(state.secondFunctions[i].superiorId!==action.payload.superiorId){
                        break;
                    }
                }
                if(flag){
                    let arr = state.secondFunctions;
                    arr.push({functionId: action.payload.superiorId+'001', superiorId: action.payload.superiorId, functionDescription: action.payload.functionDescription});
                    arr.sort(sortFn);
                    return {...state, secondFunctions: arr}
                }else{
                    let arr = state.secondFunctions;
                    let str = arr[i-1].functionId;
                    console.log(str);
                    arr.push({functionId: plus1(str), superiorId: action.payload.superiorId, functionDescription: action.payload.functionDescription})
                    arr.sort(sortFn);
                    return {...state, secondFunctions: arr};
                }
            }
        case MODIFY_FUNCTION:
            console.log(action.payload);
            if(action.payload.functionId.length === 6){
                let arr1 = state.secondFunctions.filter((item) => {
                   return item.functionId !== action.payload.functionId
                });
                let newFunction2 = {
                    functionId: action.payload.functionId,
                    superiorId: action.payload.superiorId,
                    functionDescription: action.payload.functionDescription
                }
                arr1.push(newFunction2);
                arr1.sort(sortFn);
                return {...state, secondFunctions: arr1, manageState: ''}
            }else{
                let arr2 = state.firstFunctions.filter((item) => {
                    return item.functionId !== action.payload.functionId
                });
                let newFunction3 = {
                    functionId: action.payload.functionId,
                    superiorId: action.payload.superiorId,
                    functionDescription: action.payload.functionDescription
                }
                arr2.push(newFunction3);
                arr2.sort(sortFn);
                return {...state, firstFunctions: arr2, manageState: ''}
            }
        case DELETE_FUNCTION:
            if(action.payload.length === 6){
                let arr3 = state.secondFunctions.filter((item) => {
                    return item.functionId !== action.payload
                });
                return {...state, secondFunctions: arr3, manageState: ''}
            }else{
                let arr4 = state.firstFunctions.filter((item) => {
                    return item.functionId !== action.payload
                });
                let arr5 = state.secondFunctions.filter((item) => {
                    return item.superiorId !== action.payload
                });
                return {...state, firstFunctions: arr4, secondFunctions: arr5, manageState: ''}
            }
        case SET_FUNCTIONID:
            return {...state, currentFunctionId: action.payload};
        case SET_FUNCTIONSUPERIOR:
            return {...state, currentSuperiorId: action.payload};
        case CHANGE_FUNCTIONDESCRIPTION:
            return {...state, currentDescription: action.payload};
        case UPDATE_FUNCTION:
            return {...state, firstFunctions: action.payload.firstFunctions, secondFunctions: action.payload.secondFunctions};
        default:
            return state;
    }
}