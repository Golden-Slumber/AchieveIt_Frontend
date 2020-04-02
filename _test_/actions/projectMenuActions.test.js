import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as projectMenuActions from "../../src/redux/actions/projectMenuActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectMenuActions Test', () => {

    it('should create an action to switch detail', function () {
        const expectedAction = {
                type: types.SWITCH_DETAIL
            };

        expect(projectMenuActions.switchDetail()).toEqual(expectedAction);
    });

    it('should create an action to switch member', function () {
        const expectedAction = {
            type: types.SWITCH_MEMBER
        };

        expect(projectMenuActions.switchMember()).toEqual(expectedAction);
    });

    it('should create an action to switch function', function () {
        const expectedAction = {
            type: types.SWITCH_FUNCTION
        };

        expect(projectMenuActions.switchFunction()).toEqual(expectedAction);
    });

    it('should create an action to switch hour', function () {
        const expectedAction = {
            type: types.SWITCH_HOUR
        };

        expect(projectMenuActions.switchHour()).toEqual(expectedAction);
    });

    it('should create an action to switch device', function () {
        const expectedAction = {
            type: types.SWITCH_DEVICE
        };

        expect(projectMenuActions.switchDevice()).toEqual(expectedAction);
    });

    it('should create an action to switch risk', function () {
        const expectedAction = {
            type: types.SWITCH_RISK
        };

        expect(projectMenuActions.switchRisk()).toEqual(expectedAction);
    });

    it('should create an action to switch defect', function () {
        const expectedAction = {
            type: types.SWITCH_DEFECT
        };

        expect(projectMenuActions.switchDefect()).toEqual(expectedAction);
    });
});