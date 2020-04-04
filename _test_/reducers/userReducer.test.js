import reducer from '../../src/redux/reducers/userReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    failed: '',
    successful: '',
    username: '',
    globalRole: '',
    user_id: ''
};

describe('userReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CHANGE_FAILEDSTATE', function () {
        expect(reducer({
            failed: '',
            successful: '',
            username: '',
            globalRole: '',
            user_id: ''
        }, {
            type: types.CHANGE_FAILEDSTATE,
            payload: 'failed'
        })).toEqual({
            failed: 'failed',
            successful: '',
            username: '',
            globalRole: '',
            user_id: ''
        });
    });

    it('should handle CHNAGE_SUCCESSSTATE', function () {
        expect(reducer({
            failed: '',
            successful: '',
            username: '',
            globalRole: '',
            user_id: ''
        }, {
            type: types.CHNAGE_SUCCESSSTATE,
            payload: 'success'
        })).toEqual({
            failed: '',
            successful: 'success',
            username: '',
            globalRole: '',
            user_id: ''
        });
    });

    it('should handle SET_USERNAME', function () {
        expect(reducer({
            failed: '',
            successful: '',
            username: '',
            globalRole: '',
            user_id: ''
        }, {
            type: types.SET_USERNAME,
            payload: 'username'
        })).toEqual({
            failed: '',
            successful: '',
            username: 'username',
            globalRole: '',
            user_id: ''
        });
    });

    it('should handle SET_GLOBALROLE', function () {
        expect(reducer({
            failed: '',
            successful: '',
            username: '',
            globalRole: '',
            user_id: ''
        }, {
            type: types.SET_GLOBALROLE,
            payload: 'globalRole'
        })).toEqual({
            failed: '',
            successful: '',
            username: '',
            globalRole: 'globalRole',
            user_id: ''
        });
    });

    it('should handle SET_USERID', function () {
        expect(reducer({
            failed: '',
            successful: '',
            username: '',
            globalRole: '',
            user_id: ''
        }, {
            type: types.SET_USERID,
            payload: 'userId'
        })).toEqual({
            failed: '',
            successful: '',
            username: '',
            globalRole: '',
            user_id: 'userId'
        });
    });
});