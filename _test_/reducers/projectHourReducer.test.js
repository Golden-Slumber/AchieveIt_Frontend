import reducer from '../../src/redux/reducers/projectHourReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    workingHours: [],
    verifyList: [],
    hourPageState: '',
    hourModalState: '',
    currentWorkingHourId: '',
    currentActivityType: '',
    currentFunctionType: '',
    currentStartTime: '',
    currentEndTime: '',
    verifyState: 'false',
    functionHourOptions: [],
    activityOptions: []
};

describe('projectHourReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_WORKHOURS', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.GET_WORKHOURS,
            payload: []
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle GET_VERIFYHOURS', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.GET_VERIFYHOURS,
            payload: []
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle CHANGE_HOURPAGESTATE', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.CHANGE_HOURPAGESTATE,
            payload: 'hourPageState'
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: 'hourPageState',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle CHANGE_HOURMODALSTATE', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.CHANGE_HOURMODALSTATE,
            payload: 'hourModalState'
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: 'hourModalState',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle SET_WORKINGHOURID', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.SET_WORKINGHOURID,
            payload: 'workingHourId'
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: 'workingHourId',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle CHANGE_FUNCTIONID', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.CHANGE_FUNCTIONID,
            payload: 'functionId'
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: 'functionId',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle CHANGE_ACTIVITY', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.CHANGE_ACTIVITY,
            payload: 'activity'
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: 'activity',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle CHANGE_WORKSTARTTIME', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.CHANGE_WORKSTARTTIME,
            payload: 'startTime'
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: 'startTime',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle CHANGE_WORKENDTIME', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.CHANGE_WORKENDTIME,
            payload: 'endTime'
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: 'endTime',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle CHANGE_VERIFYSTATE', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.CHANGE_VERIFYSTATE,
            payload: 'true'
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'true',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle SET_FUNCTIONHOUROPTIONS', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.SET_FUNCTIONHOUROPTIONS,
            payload: []
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });

    it('should handle SET_ACTIVITYOPTIONS', function () {
        expect(reducer({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        }, {
            type: types.SET_ACTIVITYOPTIONS,
            payload: []
        })).toEqual({
            workingHours: [],
            verifyList: [],
            hourPageState: '',
            hourModalState: '',
            currentWorkingHourId: '',
            currentActivityType: '',
            currentFunctionType: '',
            currentStartTime: '',
            currentEndTime: '',
            verifyState: 'false',
            functionHourOptions: [],
            activityOptions: []
        });
    });
});