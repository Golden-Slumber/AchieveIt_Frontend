import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as projectDefectActions from "../../src/redux/actions/projectDefectActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('projectDefectActions Test', () => {

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to get project defect', function () {
        nock(BASE_URL)
            .get('/project/issue/projectId')
            .reply(200, {'status': 'SUCCESS', 'result': 'data'});

        const expectedActions = [
                {type: types.GET_URL, payload: 'data'},
            ],
            store = mockStore();

        return store.dispatch(projectDefectActions.getUrl('projectId')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});