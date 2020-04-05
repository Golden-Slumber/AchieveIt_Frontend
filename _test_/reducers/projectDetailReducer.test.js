import reducer from '../../src/redux/reducers/projectDetailReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {PROJECTID_SET} from "../../src/redux/actions/actionTypes";

const initialState = {
    projectId: 'ProjectID',
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

    it('should handle CHANGE_PUSHSTATE', function () {
        expect(reducer({
            projectId: '',
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
            type: types.CHANGE_PUSHSTATE,
            payload: true
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: '',
            milestone: '',
            mainTech: '',
            businessField: '',
            mainFunction: '',
            isModifying: false,
            isPushing: true,
            projectState: '',
            choice: ''
        });
    });

    it('should handle CHANGE_PROJECTSTATE', function () {
        expect(reducer({
            projectId: '',
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
            type: types.CHANGE_PROJECTSTATE,
            payload: 'projectState'
        })).toEqual({
            projectId: '',
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
            projectState: 'projectState',
            choice: ''
        });
    });

    it('should handle CHANGE_MODIFYSTATE', function () {
        expect(reducer({
            projectId: '',
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
            type: types.CHANGE_MODIFYSTATE,
            payload: true
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: '',
            milestone: '',
            mainTech: '',
            businessField: '',
            mainFunction: '',
            isModifying: true,
            isPushing: false,
            projectState: '',
            choice: ''
        });
    });

    it('should handle MODIFY_PROJECTNAME', function () {
        expect(reducer({
            projectId: '',
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
            type: types.MODIFY_PROJECTNAME,
            payload: 'projectName'
        })).toEqual({
            projectId: '',
            projectName: 'projectName',
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


    it('should handle MODIFY_CUSTOMER', function () {
        expect(reducer({
            projectId: '',
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
            type: types.MODIFY_CUSTOMER,
            payload: 'customer'
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: 'customer',
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

    it('should handle MODIFY_STARTTIME', function () {
        expect(reducer({
            projectId: '',
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
            type: types.MODIFY_STARTTIME,
            payload: 'startTime'
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: '',
            startTime: 'startTime',
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

    it('should handle MODIFY_ENDTIME', function () {
        expect(reducer({
            projectId: '',
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
            type: types.MODIFY_ENDTIME,
            payload: 'endTime'
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: 'endTime',
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

    it('should handle MODIFY_MILESTONE', function () {
        expect(reducer({
            projectId: '',
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
            type: types.MODIFY_MILESTONE,
            payload: 'milestone'
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: '',
            milestone: 'milestone',
            mainTech: '',
            businessField: '',
            mainFunction: '',
            isModifying: false,
            isPushing: false,
            projectState: '',
            choice: ''
        });
    });

    it('should handle MODIFY_MAINTECH', function () {
        expect(reducer({
            projectId: '',
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
            type: types.MODIFY_MAINTECH,
            payload: 'mainTech'
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: '',
            milestone: '',
            mainTech: 'mainTech',
            businessField: '',
            mainFunction: '',
            isModifying: false,
            isPushing: false,
            projectState: '',
            choice: ''
        });
    });

    it('should handle MODIFY_BUNIESSFIELD', function () {
        expect(reducer({
            projectId: '',
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
            type: types.MODIFY_BUNIESSFIELD,
            payload: 'businessField'
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: '',
            milestone: '',
            mainTech: '',
            businessField: 'businessField',
            mainFunction: '',
            isModifying: false,
            isPushing: false,
            projectState: '',
            choice: ''
        });
    });

    it('should handle MODIFY_MAINFUNCTION', function () {
        expect(reducer({
            projectId: '',
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
            type: types.MODIFY_MAINFUNCTION,
            payload: 'mainFunction'
        })).toEqual({
            projectId: '',
            projectName: '',
            customer: '',
            startTime: '',
            endTime: '',
            milestone: '',
            mainTech: '',
            businessField: '',
            mainFunction: 'mainFunction',
            isModifying: false,
            isPushing: false,
            projectState: '',
            choice: ''
        });
    });

    it('should handle CHANGE_CHOICE', function () {
        expect(reducer({
            projectId: '',
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
            type: types.CHANGE_CHOICE,
            payload: 'choice'
        })).toEqual({
            projectId: '',
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
            choice: 'choice'
        });
    });
});