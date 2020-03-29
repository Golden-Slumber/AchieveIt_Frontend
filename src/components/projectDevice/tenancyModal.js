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
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";

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
        closeSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.tenancyDevice(this.props.currentDeviceId, this.props.projectId, this.props.currentTime, this.props.currentReturnTime, this.props.currentDeviceManager);
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
                                <label>设备ID {this.props.currentDeviceId}</label>
                            </div>
                            <div className="field">
                                <label>登记时间</label>
                                <input type="text" placeholder="登记时间：格式为yyyy-MM-dd HH:mm:ss" onChange={this.props.changeCurrentTime}/>
                            </div>
                            <div className="field">
                                <label>预计归还时间</label>
                                <input type="text" placeholder="归还时间：格式为yyyy-MM-dd HH:mm:ss" onChange={this.props.changeReturnTime}/>
                            </div>
                            <div className="field">
                                <label>资产管理人员</label>
                                <input type="text" placeholder="资产管理人员" onChange={this.props.changeDeviceManager}/>
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
    successful: state._userReducer.succesful
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
    changeDeviceManager: (e) => {
        dispatch(changeDeviceManager(e.target.value));
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
        dispatch(closeSuccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TenancyModal);