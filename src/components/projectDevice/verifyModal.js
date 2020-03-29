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
    returnDevice, verifyDevice, changeCurrentTime, changeDeviceVerifyState
} from "../../redux/actions/projectDeviceActions"
import Radio from "semantic-ui-react/dist/commonjs/addons/Radio";
import {propTypes} from "react-csv/src/metaProps";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ReturnModal extends React.Component {

    static propTypes = {
        currentDeviceId: PropTypes.string,
        verifyState: PropTypes.string,
        currentTime: PropTypes.string,
        currentDeviceManager: PropTypes.string,
        changeDeviceManager: PropTypes.func,
        changeCurrentTime: PropTypes.func,
        changeDeviceVerifyState: PropTypes.func,
        cancelDeviceModal: PropTypes.func,
        verifyDevice: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.verifyDevice(this.props.currentDeviceId, this.props.currentTime, this.props.currentDeviceManager, this.props.verifyState);
    }

    handleChange = (e, {value}) => {
        this.props.changeDeviceVerifyState(value);
    }

    render() {

        let updateFailedMessage;
        if(this.props.failed === 'verifyDevice'){
            updateFailedMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>可能您不具有足够的权限。</p>
                </Message>
            );
        }else{
            updateFailedMessage = null;
        }

        return (

            <div className="ui active modal">
                <div className="header">
                    审核设备
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <Radio
                                    label='不通过'
                                    name='radioGroup'
                                    value='Scrapped'
                                    checked={this.props.verifyState === 'Scrapped'}
                                    onChange={this.handleChange}
                                />
                                <Radio
                                    label='通过'
                                    name='radioGroup'
                                    value='Available'
                                    checked={this.props.verifyState === 'Available'}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="field">
                                <label>登记时间</label>
                                <input type="text" placeholder="登记时间：格式为yyyy-MM-dd HH:mm:ss" onChange={this.props.changeCurrentTime}/>
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
    currentDeviceId: state._projectDevice.currentDeviceId,
    verifyState: state._projectDevice.verifyState,
    currentTime: state._projectDevice.currentTime,
    currentDeviceManager: state._projectDevice.currentDeviceManager,
    failed: state._userReducer.failed,
    successful: state._userReducer.succesful,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelDeviceModal: () => {
        dispatch(cancelDeviceModal())
    },
    verifyDevice: (deviceId) => {
        dispatch(verifyDevice(deviceId));
    },
    changeDeviceManager: (e) => {
        dispatch(changeDeviceManager(e.target.value));
    },
    changeCurrentTime: (e) => {
        dispatch(changeCurrentTime(e.target.value));
    },
    changeDeviceVerifyState: (verifyState) => {
        dispatch(changeDeviceVerifyState(verifyState));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReturnModal);