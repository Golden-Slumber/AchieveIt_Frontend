import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as projectRiskActions from "../../src/redux/actions/projectRiskActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectRiskActions Test', () => {

    it('should create an action to start creating risk', function () {
        const expectedAction = {
                type: types.CHANGE_RISKMODAL,
                payload: true
            };

        expect(projectRiskActions.startCreatingRisk()).toEqual(expectedAction);
    });

    it('should create an action to cancel creating', function () {
        const expectedAction = {
                type: types.CHANGE_RISKMODAL,
                payload: false
            };

        expect(projectRiskActions.cancelCreating()).toEqual(expectedAction);

    });

    it('should create an action to change risk type', function () {
        const expectedAction = {
            type: types.CHANGE_RISKTYPE,
            payload: 'type'
        };

        expect(projectRiskActions.changeRiskType('type')).toEqual(expectedAction);

    });

    it('should create an action to change risk description', function () {
        const expectedAction = {
            type: types.CHANGE_RISKDESCRIPTION,
            payload: 'description'
        };

        expect(projectRiskActions.changeRiskDescription('description')).toEqual(expectedAction);

    });

    it('should create an action to change risk level', function () {
        const expectedAction = {
            type: types.CHANGE_RISKLEVEL,
            payload: 'level'
        };

        expect(projectRiskActions.changeRiskLevel('level')).toEqual(expectedAction);

    });

    it('should create an action to change risk impact', function () {
        const expectedAction = {
            type: types.CHANGE_RISKIMPACT,
            payload: 'impact'
        };

        expect(projectRiskActions.changeRiskImpact('impact')).toEqual(expectedAction);

    });

    it('should create an action to change risk counter', function () {
        const expectedAction = {
            type: types.CHANGE_RISKCOUNTER,
            payload: 'counter'
        };

        expect(projectRiskActions.changeRiskCounter('counter')).toEqual(expectedAction);

    });

    it('should create an action to change risk status', function () {
        const expectedAction = {
            type: types.CHANGE_RISKSTATUS,
            payload: 'status'
        };

        expect(projectRiskActions.changeRiskStatus('status')).toEqual(expectedAction);

    });

    it('should create an action to change risk frequency', function () {
        const expectedAction = {
            type: types.CHANGE_RISKTRACK,
            payload: 'frequency'
        };

        expect(projectRiskActions.changeRiskFrequency('frequency')).toEqual(expectedAction);

    });

    it('should create an action to change risk person', function () {
        const expectedAction = {
            type: types.CHANGE_RISKPERSON,
            payload: 'person'
        };

        expect(projectRiskActions.changeRiskPerson('person')).toEqual(expectedAction);

    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to get risks', function () {
        nock(BASE_URL)
            .get('/project/risk/projectId')
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.GET_RISKS, payload: 'result'}
            ],
            store = mockStore();

        return store.dispatch(projectRiskActions.getRisks('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to get member options', function () {
        nock(BASE_URL)
            .post('/user/projectMember', {'project_id': 'projectId'})
            .reply(200, {'status': 'SUCCESS', 'result': []});

        const expectedActions = [
                {type: types.GET_PROJECTMEMBERSOPTIONS, payload: []}
            ],
            store = mockStore();

        return store.dispatch(projectRiskActions.getProjectMemberOptions('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });

    it('should create an action to create risk', function () {

        let newRisk = {
            'risk_type':'type',
            'risk_description':'description',
            'risk_level':'level',
            'risk_impact':'impact',
            'risk_countermeasure':'counter',
            'risk_status':'status',
            'risk_track_frequency':'frequency',
            'risk_responsible_person':'person'
        }

        nock(BASE_URL)
            .put('/project/risk/projectId', newRisk)
            .reply(200, {'status': 'SUCCESS', 'result': 'result'});

        const expectedActions = [
                {type: types.CHANGE_RISKMODAL, payload: false}
            ],
            store = mockStore();

        return store.dispatch(projectRiskActions.createRisk('projectId', 'type', 'description', 'level', 'impact', 'counter', 'status', 'frequency', 'person')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});