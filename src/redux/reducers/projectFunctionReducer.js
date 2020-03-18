import {
    CHANGE_CREATEMEMBER,
    CHANGE_DELETEMEMBER, CHANGE_FUNCTIONDESCRIPTION, CHANGE_FUNCTIONMANAGE,
    CHANGE_MANAGEMEMBER,
    CHANGE_MODIFYMEMBER,
    CHANGE_PERISSIONS,
    CHANGE_ROLES,
    CHANGE_SUPERIOR_ID, CHANGE_USER_ID, CREATE_FUNCTION,
    CREATE_MEMBER, DELETE_FUNCTION,
    DELETE_MEMBER, FUNCTION_MANAGESTATE, MODIFY_FUNCTION, MODIFY_MANAGESTATE,
    MODIFY_MEMBER, SET_FUNCTIONID, SET_FUNCTIONSUPERIOR, UPDATE_FUNCTION, UPDATE_MEMBER
} from "../actions";

const initialState = {
    firstFunctions: [
        {
            functionId: '001',
            superiorId: '001',
            functionDescription: '1'
        },
        {
            functionId: '002',
            superiorId: '002',
            functionDescription: '2'
        },
        {
            functionId: '003',
            superiorId: '003',
            functionDescription: '3'
        }
    ],
    secondFunctions: [
        {
            functionId: '001001',
            superiorId: '001',
            functionDescription: '11'
        },
        {
            functionId: '001002',
            superiorId: '001',
            functionDescription: '12'
        },
        {
            functionId: '002001',
            superiorId: '002',
            functionDescription: '21'
        },
        {
            functionId: '003001',
            superiorId: '003',
            functionDescription: '31'
        },
        {
            functionId: '003002',
            superiorId: '003',
            functionDescription: '32'
        },
        {
            functionId: '003003',
            superiorId: '003',
            functionDescription: '33'
        }
    ],
    isManaging: false,
    manageState: 'null',
    currentFunctionId: '',
    currentSuperiorId: '',
    currentDescription: ''
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

export default function projectFunction(state=initialState, action){
    switch (action.type) {
        case CHANGE_FUNCTIONMANAGE:
            return {...state, isManaging: action.payload};
        case FUNCTION_MANAGESTATE:
            return {...state, manageState: action.payload};
        case CREATE_FUNCTION:
            // if(action.payload.superiorId === 'self'){
            //     let str = state.firstFunctions[state.firstFunctions.length-1].functionId;
            //     return {...state, firstFunctions: [...state.firstFunctions, {functionId: plus1(str), superiorId: plus1(str), functionDescription: action.payload.description}]}
            // }else{
            //     let i=0;
            //     for(; i<state.secondFunctions.length; i++){
            //         if(state.secondFunctions.superiorId===action.payload.superiorId){
            //             break;
            //         }
            //     }
            //     for(; i<state.secondFunctions.length; i++){
            //         if(state.secondFunctions.superiorId!==action.payload.superiorId){
            //             break;
            //         }
            //     }
            // }
            let newFunction1;
            if(action.payload.superiorId === 'self'){
                newFunction1 = {
                    functionId: action.payload.functionId,
                    superiorId: action.payload.functionId,
                    functionDescription: action.payload.functionDescription
                }
                return {...state, firstFunctions: [...state.firstFunctions, newFunction1], manageState: ''}
            }else{
                newFunction1 = {
                    functionId: action.payload.functionId,
                    superiorId: action.payload.superiorId,
                    functionDescription: action.payload.functionDescription
                }
                return {...state, secondFunctions: [...state.secondFunctions, newFunction1], manageState: ''}
            }
        case MODIFY_FUNCTION:
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