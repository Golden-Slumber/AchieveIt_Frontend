import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {cancelDeviceModal, setDeviceId, changeReturnTime, changeDeviceManager, tenancyDevice } from "../../redux/actions/projectDeviceActions"

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

export class TenancyModal extends React.Component {

    static propTypes = {
        currentDeviceId: PropTypes.string,
        currentReturnTime: PropTypes.string,
        currentDeviceManager: PropTypes.string,
        cancelDeviceModal: PropTypes.func,
        setDeviceId: PropTypes.func,
        changeReturnTime: PropTypes.func,
        changeDeviceManager: PropTypes.func,
        tenancyDevice: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.tenancyDevice(this.props.currentDeviceId, this.props.currentReturnTime, this.props.currentDeviceManager);
    }

    render() {

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
                                    placeholder='选择设备'
                                    fluid
                                    search
                                    selection
                                    options={options}
                                    onChange={this.props.setDeviceId}
                                />
                            </div>
                            <div className="field">
                                <label>预计归还时间</label>
                                <input type="text" placeholder="归还时间" onChange={this.props.changeReturnTime}/>
                            </div>
                            <div className="field">
                                <label>资产管理员</label>
                                <Dropdown
                                    placeholder='选择资产管理员'
                                    fluid
                                    search
                                    selection
                                    options={options}
                                    onChange={this.props.changeDeviceManager}
                                />
                            </div>
                        </form>
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
    currentReturnTime: state._projectDevice.currentReturnTime,
    currentDeviceManager: state._projectDevice.currentDeviceManager,
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
    tenancyDevice: (deviceId, returnTime, deviceManager) => {
        dispatch(tenancyDevice(deviceId, returnTime, deviceManager));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TenancyModal);