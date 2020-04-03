import reducer from '../../src/redux/reducers/projectDefectReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    url: ''
};

describe('projectDefectReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_URL', function () {
        expect(reducer({
            url: ''
        }, {
            type: types.GET_URL,
            payload: 'url'
        })).toEqual({
            url: 'url'
        });
    });
});