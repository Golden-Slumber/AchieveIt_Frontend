import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as loginActions from "../../src/redux/actions/loginActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('LoginActions Test', () => {

    it('should create an action to change username', function () {
        const username = 'username',
            expectedAction = {
                type: types.CHANGE_USERNAME,
                payload: 'username'
            };

        expect(loginActions.changeUsername(username)).toEqual(expectedAction);
    });

    it('should create an action to change password', function () {
        const password = 'password',
            expectedAction = {
                type: types.CHANGE_PASSWORD,
                payload: 'password'
            };

        expect(loginActions.changePassword(password)).toEqual(expectedAction);

    });

    it('should create an action to log out', function () {
        const expectedAction = {
            type: types.LOG_OUT
        };

        expect(loginActions.logOut()).toEqual(expectedAction);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create LOGIN_SUCCESS when login success', function () {
        nock(BASE_URL)
            .post('/user/login', {'username': 'username', 'password': '5f4dcc3b5aa765d61d8327deb882cf99'})
            .reply(200, {'status': 'SUCCESS', 'result': {'JWT': 'JWT', 'user_id': 'user_id'}});

        const expectedActions = [
                {type: types.LOGIN_SUCCESS},
                {type: types.SET_USERID, payload: 'user_id'},
                {type: types.SET_USERNAME, payload: 'username'},
            ],
            store = mockStore({user_id: '', username: ''});

        return store.dispatch(loginActions.login('password', 'username')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});