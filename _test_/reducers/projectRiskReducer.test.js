import reducer from '../../src/redux/reducers/projectDefectReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_RISKS, GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    risks: [],
    isCreating: false,
    currentId: '',
    currentType: '',
    currentDescription: '',
    currentLevel: '',
    currentImpact: '',
    currentCountermeasure: '',
    currentStatus: '',
    currentFrequency: '',
    currentResponsiblePerson: [],
    membersOptions: []
};

describe('projectDefectReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_RISKS', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.GET_RISKS,
            payload: []
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKMODAL', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKMODAL,
            payload: true
        })).toEqual({
            risks: [],
            isCreating: true,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CREATE_RISK', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CREATE_RISK,
            payload: {risk : 'risk'}
        })).toEqual({
            risks: [{risk: 'risk'}],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKTYPE', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKTYPE,
            payload: 'riskType'
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: 'riskType',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKDESCRIPTION', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKDESCRIPTION,
            payload: 'description'
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: 'description',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKLEVEL', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKLEVEL,
            payload: 'level'
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: 'level',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKIMPACT', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKIMPACT,
            payload: 'impact'
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: 'impact',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKCOUNTER', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKCOUNTER,
            payload: 'counter'
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: 'counter',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKSTATUS', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKSTATUS,
            payload: 'status'
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: 'status',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKTRACK', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKTRACK,
            payload: 'frequency'
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: 'frequency',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle CHANGE_RISKPERSON', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.CHANGE_RISKPERSON,
            payload: []
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });

    it('should handle GET_PROJECTMEMBERSOPTIONS', function () {
        expect(reducer({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        }, {
            type: types.GET_PROJECTMEMBERSOPTIONS,
            payload: []
        })).toEqual({
            risks: [],
            isCreating: false,
            currentId: '',
            currentType: '',
            currentDescription: '',
            currentLevel: '',
            currentImpact: '',
            currentCountermeasure: '',
            currentStatus: '',
            currentFrequency: '',
            currentResponsiblePerson: [],
            membersOptions: []
        });
    });
});