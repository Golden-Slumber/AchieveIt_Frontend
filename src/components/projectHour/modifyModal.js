import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {cancelHourModal, createWorkingHour, changeActivity, changeFunctionType, changeWorkEndTime, changeWorkStartTime} from "../../redux/actions/projectHourActions";
import {modifyWorkingHour} from "../../redux/actions";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ModifyModal extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        currentWorkingHourId: PropTypes.string,
        currentActivityType: PropTypes.string,
        currentFunctionType: PropTypes.string,
        currentStartTime: PropTypes.string,
        currentEndTime: PropTypes.string,
        functionHourOptions: PropTypes.array,
        activityOptions: PropTypes.array,
        changeActivity: PropTypes.func,
        changeFunctionType: PropTypes.func,
        changeWorkEndTime: PropTypes.func,
        changeWorkStartTime: PropTypes.func,
        modifyWorkingHour: PropTypes.func,
        cancelHourModal: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.modifyWorkingHour(this.props.projectId, this.props.currentWorkingHourId, this.props.currentActivityType, this.props.currentFunctionType, this.props.currentStartTime, this.props.currentEndTime);
    }

    render() {

        let updateFailedMessage;
        if(this.props.failed === 'modifyWorkHour'){
            updateFailedMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查一下您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            updateFailedMessage = null;
        }

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
                                    options={this.props.functionHourOptions}
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
                                    options={this.props.activityOptions}
                                    onChange={this.props.changeActivity}
                                />
                            </div>
                            <div className="field">
                                <label>开始时间</label>
                                <input type="text" placeholder="开始时间：格式为yyyy-MM-dd HH:mm:ss"
                                       onChange={this.props.changeWorkStartTime}/>
                            </div>
                            <div className="field">
                                <label>结束时间</label>
                                <input type="text" placeholder="结束时间：格式为yyyy-MM-dd HH:mm:ss"
                                       onChange={this.props.changeWorkEndTime}/>
                            </div>
                        </form>
                        {updateFailedMessage}
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
    projectId: state._projectDetail.projectId,
    currentWorkingHourId: state._projectHour.currentWorkingHourId,
    currentActivityType: state._projectHour.currentActivityType,
    currentFunctionType: state._projectHour.currentFunctionType,
    currentStartTime: state._projectHour.currentStartTime,
    currentEndTime: state._projectHour.currentEndTime,
    functionHourOptions: state._projectHour.functionHourOptions,
    activityOptions: state._projectHour.activityOptions,
    failed: state._userReducer.failed,
    successful: state._userReducer.succesful
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
    modifyWorkingHour: (projectId, currentWorkingHourId, activityType, functionType, startTime, endTime) => {
        dispatch(modifyWorkingHour(projectId, currentWorkingHourId, activityType, functionType, startTime, endTime));
    },
    cancelHourModal: () => {
        dispatch(cancelHourModal());
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyModal);