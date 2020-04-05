import reducer from '../../src/redux/reducers/projectMenuReducer';
import * as types from '../../src/redux/actions/actionTypes';
import {GET_URL} from "../../src/redux/actions/actionTypes";

const initialState = {
    detail: 'item active',
    member: 'item',
    function: 'item',
    hour: 'item',
    device: 'item',
    risk: 'item',
    defect: 'item'
};

describe('projectMenuReducer test', () => {

    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SWITCH_DETAIL', function () {
        expect(reducer({
            detail: 'item active',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        }, {
            type: types.SWITCH_DETAIL
        })).toEqual({
            detail: 'item active',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        });
    });

    it('should handle SWITCH_MEMBER', function () {
        expect(reducer({
            detail: 'item active',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        }, {
            type: types.SWITCH_MEMBER
        })).toEqual({
            detail: 'item',
            member: 'item active',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        });
    });

    it('should handle SWITCH_FUNCTION', function () {
        expect(reducer({
            detail: 'item active',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        }, {
            type: types.SWITCH_FUNCTION
        })).toEqual({
            detail: 'item',
            member: 'item',
            function: 'item active',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        });
    });

    it('should handle SWITCH_HOUR', function () {
        expect(reducer({
            detail: 'item active',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        }, {
            type: types.SWITCH_HOUR
        })).toEqual({
            detail: 'item',
            member: 'item',
            function: 'item',
            hour: 'item active',
            device: 'item',
            risk: 'item',
            defect: 'item'
        });
    });

    it('should handle SWITCH_DEVICE', function () {
        expect(reducer({
            detail: 'item active',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        }, {
            type: types.SWITCH_DEVICE
        })).toEqual({
            detail: 'item',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item active',
            risk: 'item',
            defect: 'item'
        });
    });

    it('should handle SWITCH_RISK', function () {
        expect(reducer({
            detail: 'item active',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        }, {
            type: types.SWITCH_RISK
        })).toEqual({
            detail: 'item',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item active',
            defect: 'item'
        });
    });

    it('should handle SWITCH_DEFECT', function () {
        expect(reducer({
            detail: 'item active',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item'
        }, {
            type: types.SWITCH_DEFECT
        })).toEqual({
            detail: 'item',
            member: 'item',
            function: 'item',
            hour: 'item',
            device: 'item',
            risk: 'item',
            defect: 'item active'
        });
    });
});