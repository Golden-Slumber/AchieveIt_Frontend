import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as userActions from "../../src/redux/actions/userActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('userActions Test', () => {

    it('should create an action to form failed', function () {
        const expectedAction = {
                type: types.CHANGE_FAILEDSTATE,
                payload: 'form'
            };

        expect(userActions.formFailed('form')).toEqual(expectedAction);
    });

    it('should create an action to close form failed', function () {
        const expectedAction = {
            type: types.CHANGE_FAILEDSTATE,
            payload: ''
        };

        expect(userActions.closeFailed()).toEqual(expectedAction);
    });

    it('should create an action to form success', function () {
        const expectedAction = {
            type: types.CHNAGE_SUCCESSSTATE,
            payload: 'form'
        };

        expect(userActions.formSuccess('form')).toEqual(expectedAction);
    });

    it('should create an action to close form success', function () {
        const expectedAction = {
            type: types.CHNAGE_SUCCESSSTATE,
            payload: ''
        };

        expect(userActions.closeSuccess()).toEqual(expectedAction);
    });

    it('should create an action to set username', function () {
        const expectedAction = {
            type: types.SET_USERNAME,
            payload: 'username'
        };

        expect(userActions.setUserName('username')).toEqual(expectedAction);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to set global role', function () {
        nock(BASE_URL)
            .get('/user/globalRole/self')
            .reply(200, {'status': 'SUCCESS', 'result': {'global_role_name': 'role_name'}});

        const expectedActions = [
                {type: types.SET_GLOBALROLE, payload: 'role_name'}
            ],
            store = mockStore({user_id: '', username: ''});

        return store.dispatch(userActions.setGlobalRole()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});