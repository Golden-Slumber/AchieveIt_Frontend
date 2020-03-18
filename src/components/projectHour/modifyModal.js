import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {cancelHourModal, createWorkingHour, changeActivity, changeFunctionType, changeWorkEndTime, changeWorkStartTime} from "../../redux/actions/projectHourActions";
import {modifyWorkingHour} from "../../redux/actions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const options = [
    {key: '1', value: '2', text: '3'},
    {key: '4', value: '5', text: '6'},
    {key: '7', value: '8', text: '9'}
];

export class ModifyModal extends React.Component {

    static propTypes = {
        currentWorkingHourId: PropTypes.string,
        currentActivityType: PropTypes.string,
        currentFunctionType: PropTypes.string,
        currentStartTime: PropTypes.string,
        currentEndTime: PropTypes.string,
        changeActivity: PropTypes.func,
        changeFunctionType: PropTypes.func,
        changeWorkEndTime: PropTypes.func,
        changeWorkStartTime: PropTypes.func,
        modifyWorkingHour: PropTypes.func,
        cancelHourModal: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.modifyWorkingHour(this.props.currentWorkingHourId, this.props.currentActivityType, this.props.currentFunctionType, this.props.currentStartTime, this.props.currentEndTime);
    }

    render() {

        return (

            <div className="ui active modal">
                <div className="header">
                    修改工时记录
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>工时记录： {this.props.currentWorkingHourId}</label>
                            </div>
                            <div className="field">
                                <label>功能类型</label>
                                <Dropdown
                                    placeholder='选择功能类型'
                                    fluid
                                    search
                                    selection
                                    options={options}
                                    onChange={this.props.changeFunctionType}
                                />
                            </div>
                            <div className="field">
                                <label>活动类型</label>
                                <Dropdown
                                    placeholder='选择活动类型'
                                    fluid
                                    search
                                    selection
                                    options={options}
                                    onChange={this.props.changeActivity}
                                />
                            </div>
                            <div className="field">
                                <label>开始时间</label>
                                <input type="text" placeholder="开始时间" value={this.props.currentStartTime}
                                       onChange={this.props.changeWorkStartTime}/>
                            </div>
                            <div className="field">
                                <label>结束时间</label>
                                <input type="text" placeholder="结束时间" value={this.props.currentEndTime}
                                       onChange={this.props.changeWorkEndTime}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelHourModal}>
                        取消
                    </div>
                    <div className="ui positive right labeled icon button" onClick={this.handleFinishClick}>
                        完成
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>

        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    currentWorkingHourId: state._projectHour.currentWorkingHourId,
    currentActivityType: state._projectHour.currentActivityType,
    currentFunctionType: state._projectHour.currentFunctionType,
    currentStartTime: state._projectHour.currentStartTime,
    currentEndTime: state._projectHour.currentEndTime,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeActivity: (e, data) => {
        dispatch(changeActivity(data.value));
    },
    changeFunctionType: (e, data) => {
        dispatch(changeFunctionType(data.value));
    },
    changeWorkEndTime: (e) => {
        dispatch(changeWorkEndTime(e.target.value));
    },
    changeWorkStartTime: (e) => {
        dispatch(changeWorkStartTime(e.target.value));
    },
    modifyWorkingHour: (currentWorkingHourId, activityType, functionType, startTime, endTime) => {
        dispatch(modifyWorkingHour(currentWorkingHourId, activityType, functionType, startTime, endTime));
    },
    cancelHourModal: () => {
        dispatch(cancelHourModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyModal);