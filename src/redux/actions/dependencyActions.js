import {DEPENDENCY_URL} from "../../constants";
import {GET_BUSINESSFIELDS, GET_CUSTOMERS, GET_PERSONNEL, GET_PROJECTSIDS} from "./actionTypes";

export function getProjectIds(){
    return async (dispatch) => {
        await fetch(DEPENDENCY_URL+'/projectId/all', {
            method: 'GET'
        }).then(res => res.json()
        ).then(data => {
            dispatch({
                type: GET_PROJECTSIDS,
                payload: data
            });
        }).catch(error => {
            console.log(error);
        })
    }
}

export function getCustomers(){
    return async (dispatch) => {
        await fetch(DEPENDENCY_URL+'/customer/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()
        ).then(data => {
            dispatch({
                type: GET_CUSTOMERS,
                payload: data
            });
        }).catch(error => {
            console.log(error);
        })
    }
}

export function getBusinessFields(){
    return async (dispatch) => {
        await fetch(DEPENDENCY_URL+'/businessField/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()
        ).then(data => {
            dispatch({
                type: GET_BUSINESSFIELDS,
                payload: data
            });
        }).catch(error => {
            console.log(error);
        })
    }
}

export function getPersonnel(){
    return async (dispatch) => {
        await fetch(DEPENDENCY_URL+'/personnel/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
            dispatch({
                type: GET_PERSONNEL,
                payload: data
            });
        }).catch(error => {
            console.log(error);
        })
    }
}
