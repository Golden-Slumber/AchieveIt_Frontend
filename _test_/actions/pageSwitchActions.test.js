import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as pageSwitchActions from "../../src/redux/actions/pageSwitchActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('pageSwitchActions Test', () => {

    it('should create an action to illegal access', function () {
        const expectedAction = {
                type: types.ILLEGAL_ACCESS,
            };

        expect(pageSwitchActions.illegalAccess()).toEqual(expectedAction);
    });

    it('should create an action to close illegal access', function () {
        const expectedAction = {
            type: types.CLOSE_ILLEGAL_ACCESS,
        };

        expect(pageSwitchActions.closeIllegalAccess()).toEqual(expectedAction);
    });

});