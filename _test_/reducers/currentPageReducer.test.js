import reducer from '../../src/redux/reducers/currentPageReducer';
import * as types from '../../src/redux/actions/actionTypes';

const initialState = {
    'illegal': false
};

describe('currentPageReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ILLEGAL_ACCESS', function () {
        expect(reducer({
            illegal: false
        }, {
            type: types.ILLEGAL_ACCESS
        })).toEqual({
            illegal: true
        });
    });

    it('should handle CLOSE_ILLEGAL_ACCESS', function () {
        expect(reducer({
            illegal: true
        }, {
            type: types.CLOSE_ILLEGAL_ACCESS
        })).toEqual({
            illegal: false
        });
    });

});