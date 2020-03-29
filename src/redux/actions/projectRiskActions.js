import {
    CHANGE_RISKCOUNTER,
    CHANGE_RISKDESCRIPTION,
    CHANGE_RISKIMPACT,
    CHANGE_RISKLEVEL,
    CHANGE_RISKMODAL, CHANGE_RISKPERSON, CHANGE_RISKSTATUS, CHANGE_RISKTRACK,
    CHANGE_RISKTYPE,
    CREATE_RISK, GET_PROJECTMEMBERSOPTIONS, GET_RISKS
} from "./actionTypes";
import {BASE_URL} from "../../constants";
import {formFailed} from "./userActions";

export function getRisks(projectId){
    return async (dispatch) => {
        await fetch(BASE_URL+'/project/risk/'+projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                console.log(data.result);
                dispatch({
                    type: GET_RISKS,
                    payload: data.result
                })
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

export function getProjectMemberOptions(projectId){
    return async (dispatch) => {
        await fetch(BASE_URL+'/user/projectMember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({project_id: projectId})
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                let options = data.result.map((item, index) => {
                    return {key: item.user_id, value: item.user_id, text: item.user_id}
                });
                dispatch({
                    type: GET_PROJECTMEMBERSOPTIONS,
                    payload: options
                })
            }else{
                console.log(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

export function startCreatingRisk(){
    return {
        type: CHANGE_RISKMODAL,
        payload: true
    }
}

export function cancelCreating(){
    return {
        type: CHANGE_RISKMODAL,
        payload: false
    }
}

export function createRisk(projectId, type, description, level, impact, counter, status, frequency, person){

    let newRisk = {
        risk_type:type,
        risk_description:description,
        risk_level:level,
        risk_impact:impact,
        risk_countermeasure:counter,
        risk_status:status,
        risk_track_frequency:frequency,
        risk_responsible_person:person
    }

    return async (dispatch) => {
        await fetch(BASE_URL+'/project/risk/'+projectId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newRisk)
        }).then(res => res.json()
        ).then(data => {
            if(data.status === 'SUCCESS'){
                dispatch(getRisks(projectId));
                dispatch({
                    type: CHANGE_RISKMODAL,
                    payload: false
                });
            }else{
                console.log(data.status);
                dispatch(formFailed('createRisk'));
            }
        }).catch(error => {
            console.log(error);
            dispatch(formFailed('createRisk'));
        });
    }
}

export function changeRiskType(type){
    return {
        type: CHANGE_RISKTYPE,
        payload: type
    }
}

export function changeRiskDescription(description){
    return {
        type: CHANGE_RISKDESCRIPTION,
        payload: description
    }
}

export function changeRiskLevel(level){
    return {
        type: CHANGE_RISKLEVEL,
        payload: level
    }
}

export function changeRiskImpact(impact){
    return {
        type: CHANGE_RISKIMPACT,
        payload: impact
    }
}

export function changeRiskCounter(counter){
    return {
        type: CHANGE_RISKCOUNTER,
        payload: counter
    }
}

export function changeRiskStatus(status){
    return {
        type: CHANGE_RISKSTATUS,
        payload: status
    }
}

export function changeRiskFrequency(frequency) {
    return {
        type: CHANGE_RISKTRACK,
        payload: frequency
    }
}

export function changeRiskPerson(person){
    return {
        type: CHANGE_RISKPERSON,
        payload: person
    }
}