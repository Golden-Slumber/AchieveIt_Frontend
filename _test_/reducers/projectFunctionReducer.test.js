import reducer from '../../src/redux/reducers/projectFunctionReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    firstFunctions: [],
    secondFunctions: [],
    isManaging: false,
    isUploading: false,
    uploadedData: '',
    manageState: 'null',
    currentFunctionId: '',
    currentSuperiorId: '',
    currentDescription: '',
    superiorFunctions: [],
    uploadData: '',
    downloadData: []
};

describe('projectFunctionReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_FUNCTIONS', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.GET_FUNCTIONS,
            payload: {firstFunctions: [], secondFunctions: []}
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle SET_SUPERIORFUNCTIONS', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.SET_SUPERIORFUNCTIONS,
            payload: {superiorFunctions: [{
                    superior: 'superior'
                }]}
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [{
                superior: 'superior'
            }],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle CHANGE_FUNCTIONMANAGE', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.CHANGE_FUNCTIONMANAGE,
            payload: true
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: true,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle CHANGE_UPLOADSTATE', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.CHANGE_UPLOADSTATE,
            payload: true
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: true,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle FUNCTION_MANAGESTATE', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.FUNCTION_MANAGESTATE,
            payload: 'manageState'
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'manageState',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle CREATE_FUNCTION', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.CREATE_FUNCTION,
            payload: {superiorId: 'self', functionDescription: 'description'}
        })).toEqual({
            firstFunctions: [{
                functionId: '001',
                superiorId: '001',
                functionDescription: 'description'
            }],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle MODIFY_FUNCTION', function () {
        expect(reducer({
            firstFunctions: [{
                functionId: '001',
                superiorId: '001',
                functionDescription: 'description'
            }],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.MODIFY_FUNCTION,
            payload: {functionId: '001', superiorId: '001', functionDescription: 'functionDescription'}
        })).toEqual({
            firstFunctions: [{
                functionId: '001',
                superiorId: '001',
                functionDescription: 'functionDescription'
            }],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle DELETE_FUNCTION', function () {
        expect(reducer({
            firstFunctions: [{
                functionId: '001',
                superiorId: '001',
                functionDescription: 'description'
            }],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.DELETE_FUNCTION,
            payload: '001'
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle SET_FUNCTIONID', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.SET_FUNCTIONID,
            payload: 'functionId'
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: 'functionId',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle SET_FUNCTIONSUPERIOR', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.SET_FUNCTIONSUPERIOR,
            payload: 'superior'
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: 'superior',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle CHANGE_FUNCTIONDESCRIPTION', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.CHANGE_FUNCTIONDESCRIPTION,
            payload: 'description'
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: 'description',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle UPDATE_FUNCTION', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.UPDATE_FUNCTION,
            payload: {firstFunctions: [], secondFunctions: []}
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });

    it('should handle CHANGE_UPLOADDATA', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.CHANGE_UPLOADDATA,
            payload: 'uploadData'
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: 'uploadData',
            downloadData: []
        });
    });

    it('should handle CHANGE_DOWNLOADDATA', function () {
        expect(reducer({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        }, {
            type: types.CHANGE_DOWNLOADDATA,
            payload: []
        })).toEqual({
            firstFunctions: [],
            secondFunctions: [],
            isManaging: false,
            isUploading: false,
            uploadedData: '',
            manageState: 'null',
            currentFunctionId: '',
            currentSuperiorId: '',
            currentDescription: '',
            superiorFunctions: [],
            uploadData: '',
            downloadData: []
        });
    });
});