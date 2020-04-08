import {GET_BUSINESSFIELDS, GET_CUSTOMERS, GET_PERSONNEL, GET_PROJECTSIDS} from "../actions";

const initialState = {
    projectIdsOptions: [],
    customersOptions: [],
    businessFieldsOptions: [],
    personnelOptions: []
};

export default function projectDependency(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTSIDS:
            let arr1 = action.payload.map((item, index) => {
                return {key: item.project_id, value: item.project_id, text: item.project_id}
            });
            return {...state, projectIdsOptions: arr1};
        case GET_CUSTOMERS:
            let arr2 = action.payload.map((item, index) => {
               return {key: item.customer_id, value: item.customer_id, text: item.corporation_name}
            });
            return {...state, customersOptions: arr2};
        case GET_BUSINESSFIELDS:
            let arr3 = action.payload.map((item, index) => {
                return {key: item.business_field_id, value: item.business_field_id, text: item.business_field_description}
            })
            return {...state, businessFieldsOptions: arr3};
        case GET_PERSONNEL:
            let arr4 = action.payload.map((item, index) => {
                return {key: item.user_id, value: item.user_id, text: item.user_id+' '+item.user_name}
            })
            console.log(action.payload);
            console.log(arr4);
            return {...state, personnelOptions: arr4};
        default:
            return state;
    }
}