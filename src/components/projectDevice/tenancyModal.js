import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelDeviceModal,
    setDeviceId,
    changeReturnTime,
    changeDeviceManager,
    tenancyDevice,
    changeCurrentTime
} from "../../redux/actions/projectDeviceActions"
import {closeFailed, closeSuccess, formFailed} from "../../redux/actions/userActions";
import {CONFIGURATION_MANAGER_ID} from "../../constants";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class TenancyModal extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        currentDeviceId: PropTypes.string,
        currentTime: PropTypes.string,
        currentReturnTime: PropTypes.string,
        currentDeviceManager: PropTypes.string,
        cancelDeviceModal: PropTypes.func,
        setDeviceId: PropTypes.func,
        changeReturnTime: PropTypes.func,
        changeDeviceManager: PropTypes.func,
        tenancyDevice: PropTypes.func,
        changeCurrentTime: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func,
        formFailed: PropTypes.func,
        deviceOptions: PropTypes.array,
        adminOptions: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        let time1 = new Date(this.props.currentTime.replace('-', '/'));
        let time2 = new Date(this.props.currentReturnTime.replace('-', '/'));
        if(this.props.currentDeviceId === '' || this.props.currentTime === '' || this.props.currentReturnTime === '' ||
            time1 >= time2){
            this.props.formFailed('tenancyDevice');
        }else{
            this.props.tenancyDevice(this.props.currentDeviceId, this.props.projectId, this.props.currentTime, this.props.currentReturnTime, CONFIGURATION_MANAGER_ID);
        }
    }

    render() {

        let updateFailedMessage;
        if(this.props.failed === 'tenancyDevice'){
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
                    登记设备
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>设备ID</label>
                                <Dropdown
                                    placeholder='选择登记的设备ID'
                                    fluid
                                    search
                                    selection
                                    options={this.props.deviceOptions}
                                    onChange={this.props.setDeviceId}
                                />
                            </div>
                            <div className="field">
                                <label>登记时间</label>
                                <input type="text" placeholder="登记时间：格式为yyyy-MM-dd HH:mm:ss" onChange={this.props.changeCurrentTime}/>
                            </div>
                            <div className="field">
                                <label>预计归还时间</label>
                                <input type="text" placeholder="归还时间：格式为yyyy-MM-dd HH:mm:ss" onChange={this.props.changeReturnTime}/>
                            </div>
                        </form>
                        {updateFailedMessage}
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelDeviceModal}>
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
    currentDeviceId: state._projectDevice.currentDeviceId,
    currentReturnTime: state._projectDevice.currentReturnTime,
    currentDeviceManager: state._projectDevice.currentDeviceManager,
    currentTime: state._projectDevice.currentTime,
    failed: state._userReducer.failed,
    successful: state._userReducer.successful,
    deviceOptions: state._projectDevice.deviceOptions,
    adminOptions: state._projectDevice.adminOptions
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelDeviceModal: () => {
        dispatch(cancelDeviceModal())
    },
    setDeviceId: (e, data) => {
        dispatch(setDeviceId(data.value));
    },
    changeReturnTime: (e) => {
        dispatch(changeReturnTime(e.target.value));
    },
    changeDeviceManager: (e, data) => {
        dispatch(changeDeviceManager(data.value));
    },
    tenancyDevice: (deviceId, projectId, currentTime, returnTime, deviceManager) => {
        dispatch(tenancyDevice(deviceId, projectId, currentTime, returnTime, deviceManager));
    },
    changeCurrentTime: (e) => {
        dispatch(changeCurrentTime(e.target.value));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess());
    },
    formFailed: (form) => {
        dispatch(formFailed(form));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TenancyModal);