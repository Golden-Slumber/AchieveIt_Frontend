import reducer from '../../src/redux/reducers/projectDetailReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {PROJECTID_SET} from "../../src/redux/actions/actionTypes";

const initialState = {
    projectId: 'PeojectID',
    projectName: '',
    customer: '',
    startTime: '',
    endTime: '',
    milestone: '',
    mainTech: '',
    businessField: '',
    mainFunction: '',
    isModifying: false,
    isPushing: false,
    projectState: '',
    choice: ''
};

describe('projectDetailReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle PROJECTID_SET', function () {
        expect(reducer({
            projectId: 'PeojectID',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: '',
            milestone: '',
            mainTech: '',
            businessField: '',
            mainFunction: '',
            isModifying: false,
            isPushing: false,
            projectState: '',
            choice: ''
        }, {
            type: types.PROJECTID_SET,
            payload: 'id'
        })).toEqual({
            projectId: 'id',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: '',
            milestone: '',
            mainTech: '',
            businessField: '',
            mainFunction: '',
            isModifying: false,
            isPushing: false,
            projectState: '',
            choice: ''
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