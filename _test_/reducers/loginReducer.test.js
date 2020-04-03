import reducer from '../../src/redux/reducers/loginReducer';
import * as types from '../../src/redux/actions/actionTypes';

const initialState = {
    username: '',
    password: '',
    isLogin: false
};

describe('loginReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CHANGE_USERNAME', function () {
        expect(reducer({
            username: '',
            password: '',
            isLogin: false
        }, {
            type: types.CHANGE_USERNAME,
            payload: 'username'
        })).toEqual({
            username: 'username',
            password: '',
            isLogin: false
        });
    });

    it('should handle CHANGE_PASSWORD', function () {
        expect(reducer({
            username: '',
            password: '',
            isLogin: false
        }, {
            type: types.CHANGE_PASSWORD,
            payload: 'password'
        })).toEqual({
            username: '',
            password: 'password',
            isLogin: false
        });
    });

    it('should handle LOGIN_SUCCESS', function () {
        expect(reducer({
            username: '',
            password: '',
            isLogin: false
        }, {
            type: types.LOGIN_SUCCESS
        })).toEqual({
            username: '',
            password: '',
            isLogin: true
        });
    });

    it('should handle LOG_OUT', function () {
        expect(reducer({
            username: 'username',
            password: 'password',
            isLogin: true
        }, {
            type: types.LOG_OUT
        })).toEqual({
            username: '',
            password: '',
            isLogin: false
        });
    });

});