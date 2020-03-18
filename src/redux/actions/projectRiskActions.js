import {
    CHANGE_RISKCOUNTER,
    CHANGE_RISKDESCRIPTION,
    CHANGE_RISKIMPACT,
    CHANGE_RISKLEVEL,
    CHANGE_RISKMODAL, CHANGE_RISKPERSON, CHANGE_RISKSTATUS, CHANGE_RISKTRACK,
    CHANGE_RISKTYPE,
    CREATE_RISK
} from "./actionTypes";

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

export function createRisk(type, description, level, impact, counter, status, frequency, person){

    let newRisk = {
        riskId: '8',
        riskType: type,
        riskDescription: description,
        riskLevel: level,
        riskImpact: impact,
        riskCountermeasure: counter,
        riskStatus: status,
        riskFrequency: frequency,
        responsiblePerson: person
    }

    return async (dispatch) => {
        dispatch({
            type: CHANGE_RISKMODAL,
            payload: false
        });
        dispatch({
            type: CREATE_RISK,
            payload: newRisk
        })
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