import reducer from '../../src/redux/reducers/dependencyReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_BUSINESSFIELDS, GET_CUSTOMERS, GET_PERSONNEL} from "../../src/redux/actions/actionTypes";

const initialState = {
    projectIdsOptions: [],
    customersOptions: [],
    businessFieldsOptions: [],
    personnelOptions: []
};

describe('dependencyReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_PROJECTSIDS', function () {
        expect(reducer({
            projectIdsOptions: [],
            customersOptions: [],
            businessFieldsOptions: [],
            personnelOptions: []
        }, {
            type: types.GET_PROJECTSIDS,
            payload: [
                {
                    project_id: 'project_id'
                }
            ]
        })).toEqual({
            projectIdsOptions: [
                {
                    key: 'project_id',
                    value: 'project_id',
                    text: 'project_id'
                }
            ],
            customersOptions: [],
            businessFieldsOptions: [],
            personnelOptions: []
        });
    });

    it('should handle GET_CUSTOMERS', function () {
        expect(reducer({
            projectIdsOptions: [],
            customersOptions: [],
            businessFieldsOptions: [],
            personnelOptions: []
        }, {
            type: types.GET_CUSTOMERS,
            payload: [
                {
                    customer_id: 'customer_id',
                    corporation_name: 'corporation_name'
                }
            ]
        })).toEqual({
            projectIdsOptions: [],
            customersOptions: [
                {
                    key: 'customer_id',
                    value: 'customer_id',
                    text: 'corporation_name'
                }
            ],
            businessFieldsOptions: [],
            personnelOptions: []
        });
    });

    it('should handle GET_BUSINESSFIELDS', function () {
        expect(reducer({
            projectIdsOptions: [],
            customersOptions: [],
            businessFieldsOptions: [],
            personnelOptions: []
        }, {
            type: types.GET_BUSINESSFIELDS,
            payload: [
                {
                    business_field_id: 'business_field_id',
                    business_field_description: 'business_field_description'
                }
            ]
        })).toEqual({
            projectIdsOptions: [],
            customersOptions: [],
            businessFieldsOptions: [
                {
                    key: 'business_field_id',
                    value: 'business_field_id',
                    text: 'business_field_description'
                }
            ],
            personnelOptions: []
        });
    });

    it('should handle GET_PERSONNEL', function () {
        expect(reducer({
            projectIdsOptions: [],
            customersOptions: [],
            businessFieldsOptions: [],
            personnelOptions: []
        }, {
            type: types.GET_PERSONNEL,
            payload: [
                {
                    user_id: 'user_id'
                }
            ]
        })).toEqual({
            projectIdsOptions: [],
            customersOptions: [],
            businessFieldsOptions: [],
            personnelOptions: [
                {
                    key: 'user_id',
                    value: 'user_id',
                    text: 'user_id'
                }
            ]
        });
    });
});