import reducer from '../../src/redux/reducers/projectHomeReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    keyword: '',
    currentPage: 1,
    more: true,
    projects: [],
    projectSetupInfo: {
        projectId: '',
        projectName: '',
        customer: '',
        startTime: '',
        endTime: '',
        milestone: '',
        mainTech: '',
        businessField: '',
        mainFunction: ''
    }
};

describe('projectHomeReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CHANGE_KEYWORD', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_KEYWORD,
            payload: 'keyword'
        })).toEqual({
            keyword: 'keyword',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_PROJECTPAGE', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_PROJECTPAGE,
            payload: 2
        })).toEqual({
            keyword: '',
            currentPage: 2,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_MOREPROJECT', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_MOREPROJECT,
            payload: false
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: false,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle GET_RELATIVE_PROJECTS', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.GET_RELATIVE_PROJECTS,
            payload: []
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle GET_RELATIVE_PROJECTSBYSTATUS', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.GET_RELATIVE_PROJECTSBYSTATUS,
            payload: {
                type: 'Initiated',
                projects: []
            }
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle SEARCH_PROJECT', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.SEARCH_PROJECT,
            payload: []
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_PROJECTID', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_PROJECTID,
            payload: 'projectId'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: 'projectId',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_PROJECTNAME', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_PROJECTNAME,
            payload: 'projectName'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: 'projectName',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_CUSTOMER', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_CUSTOMER,
            payload: 'customer'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: 'customer',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_STARTTIME', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_STARTTIME,
            payload: 'startTime'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: 'startTime',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_ENDTIME', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_ENDTIME,
            payload: 'endTime'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: 'endTime',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_MILESTONE', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_MILESTONE,
            payload: 'milestone'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: 'milestone',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_MAINTECH', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_MAINTECH,
            payload: 'mainTech'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: 'mainTech',
                businessField: '',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_BUNIESSFIELD', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_BUNIESSFIELD,
            payload: 'businessField'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: 'businessField',
                mainFunction: ''
            }
        });
    });

    it('should handle CHANGE_MAINFUNCTION', function () {
        expect(reducer({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: ''
            }
        }, {
            type: types.CHANGE_MAINFUNCTION,
            payload: 'mainFunction'
        })).toEqual({
            keyword: '',
            currentPage: 1,
            more: true,
            projects: [],
            projectSetupInfo: {
                projectId: '',
                projectName: '',
                customer: '',
                startTime: '',
                endTime: '',
                milestone: '',
                mainTech: '',
                businessField: '',
                mainFunction: 'mainFunction'
            }
        });
    });
});