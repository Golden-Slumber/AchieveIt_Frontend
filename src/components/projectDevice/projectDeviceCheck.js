import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {finishChecking, startVerifying} from "../../redux/actions/projectDeviceActions"
import VerifyModal from "./verifyModal";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectDeviceCheck extends React.Component {

    static propTypes = {
        verifyDevices: PropTypes.array,
        deviceModal: PropTypes.string,
        startVerifying: PropTypes.func,
        finishChecking: PropTypes.func
    };

    handleVerifyClick = (deviceId) => {
        this.props.startVerifying(deviceId);
    }

    render() {

        let showVerifyDevices = this.props.verifyDevices.map((item, index) => {
            return (
                <tr>
                    <td>{item.deviceId}</td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                        this.handleVerifyClick(item.deviceId);
                    }}/></td>
                </tr>
            );
        })

        let verifyModal;
        if(this.props.deviceModal === 'verify'){
            verifyModal = (
                <VerifyModal />
            );
        }else{
            verifyModal = null;
        }


        return (
            <div>
                {verifyModal}
                <table className="ui fixed single line celled table">
                    <thead>
                    <tr>
                        <th>设备名</th>
                        <th>审核</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showVerifyDevices}
                    </tbody>
                </table>

                <Button  content={'完成'}  style={{float: 'right'}} onClick={this.props.finishChecking}/>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    verifyDevices: state._projectDevice.verifyDevices,
    deviceModal: state._projectDevice.deviceModal,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startVerifying: (deviceId) => {
        dispatch(startVerifying(deviceId));
    },
    finishChecking: () => {
        dispatch(finishChecking());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDeviceCheck);