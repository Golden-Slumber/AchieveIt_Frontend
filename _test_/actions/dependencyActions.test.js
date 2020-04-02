import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {BASE_URL, DEPENDENCY_URL} from '../../src/constants';
import  * as types from "../../src/redux/actions/actionTypes";
import * as dependencyActions from "../../src/redux/actions/dependencyActions";
import store from "../../src/redux";

const middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

global.fetch = require('node-fetch');

describe('dependencyActions Test', () => {

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create GET_PROJECTIDS action when getprojectid', function () {

        nock(DEPENDENCY_URL)
            .get('/projectId/all')
            .reply(200, {'data': 'data'});

        const expectedActions = [
                {
                    type: types.GET_PROJECTSIDS,
                    payload: {'data': 'data'}
                }
            ],
            store = mockStore({'data' : 'data'});

        return store.dispatch(dependencyActions.getProjectIds()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })

    });

    it('should create GET_CUSTOMERS action when getCustomers', function () {

        nock(DEPENDENCY_URL)
            .get('/customer/all')
            .reply(200, {'data': 'data'});

        const expectedActions = [
                {
                    type: types.GET_CUSTOMERS,
                    payload: {'data': 'data'}
                }
            ],
            store = mockStore({'data' : 'data'});

        return store.dispatch(dependencyActions.getCustomers()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })

    });

    it('should create GET_BUSINESSFIELDS action when getBusinessFields', function () {

        nock(DEPENDENCY_URL)
            .get('/businessField/all')
            .reply(200, {'data': 'data'});

        const expectedActions = [
                {
                    type: types.GET_BUSINESSFIELDS,
                    payload: {'data': 'data'}
                }
            ],
            store = mockStore({'data' : 'data'});

        return store.dispatch(dependencyActions.getBusinessFields()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })

    });

    it('should create GET_PERSONNEL action when getPersonnel', function () {

        nock(DEPENDENCY_URL)
            .get('/personnel/all')
            .reply(200, {'data': 'data'});

        const expectedActions = [
                {
                    type: types.GET_PERSONNEL,
                    payload: {'data': 'data'}
                }
            ],
            store = mockStore({'data' : 'data'});

        return store.dispatch(dependencyActions.getPersonnel()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })

    });

});