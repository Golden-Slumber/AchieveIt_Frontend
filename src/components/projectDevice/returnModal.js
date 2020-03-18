import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelDeviceModal,
    setDeviceId,
    changeReturnTime,
    changeDeviceManager,
    tenancyDevice,
    returnDevice
} from "../../redux/actions/projectDeviceActions"

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

export class ReturnModal extends React.Component {

    static propTypes = {
        currentDeviceId: PropTypes.string,
        returnDevice: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.returnDevice(this.props.currentDeviceId);
    }

    render() {

        return (

            <div className="ui active modal">
                <div className="header">
                    归还设备
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>将归还设备 {this.props.currentDeviceId}</label>
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
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelDeviceModal: () => {
        dispatch(cancelDeviceModal())
    },
    returnDevice: (deviceId) => {
        dispatch(returnDevice(deviceId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReturnModal);