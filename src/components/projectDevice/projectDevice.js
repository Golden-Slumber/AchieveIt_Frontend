import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    changeCurrentDevicePage, getAdminOptions, getDeviceOptions, getDevices,
    startChecking,
    startReturning,
    startTenancying, startVerifying
} from "../../redux/actions/projectDeviceActions";
import TenancyModal from "./tenancyModal";
import ReturnModal from "./returnModal";
import ProjectDeviceCheck from "./projectDeviceCheck";
import ProjectMenu from "../projectMenu/projectMenu";
import currentPage from "../../redux/reducers/currentPageReducer";
import VerifyModal from "../projectHour/verifyModal";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectDevice extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        devices: PropTypes.array,
        devicePage: PropTypes.string,
        deviceModal: PropTypes.string,
        currentPage: PropTypes.number,
        more: PropTypes.bool,
        startChecking: PropTypes.func,
        startTenancying: PropTypes.func,
        startReturning: PropTypes.func,
        startVerifying: PropTypes.func,
        changeCurrentDevicePage: PropTypes.func,
        getDevices: PropTypes.func,
        isPropertyAdmin: PropTypes.bool,
        getDeviceOptions: PropTypes.func,
        getAdminOptions: PropTypes.func
    };

    handleMoreclick = () => {
        this.props.changeCurrentDevicePage(this.props.currentPage+1);
        this.props.getDevices(this.props.currentPage, this.props.projectId);
    }

    handleTenancyClick = () => {
        this.props.getDeviceOptions();
        this.props.getAdminOptions(this.props.projectId);
        this.props.startTenancying();
    }

    handleOperationClick = (deviceId, deviceStatus) => {
        if(deviceStatus === 'LentOut'){
            this.props.startReturning(deviceId);
        }else if(deviceStatus === 'Maintaining'){
            this.props.startVerifying(deviceId);
        }else if(deviceStatus === 'ToBeChecked'){
            this.props.startVerifying(deviceId);
        }
    }

    render() {

        let showDevices = this.props.devices.map((item, index) => {
            return (
                <tr>
                    <td>{item.deviceId}</td>
                    <td>{item.deviceName}</td>
                    <td>{item.deviceStatus}</td>
                    <td>{
                        ((this.props.isPropertyAdmin && (item.deviceStatus === 'ToBeChecked' || item.deviceStatus === 'Maintaining')) || (!this.props.isPropertyAdmin&&item.deviceStatus==='LentOut')) ?
                            <Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                                this.handleOperationClick(item.deviceId, item.deviceStatus);
                            }}/> :
                            <Icon disabled name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                                this.handleOperationClick(item.deviceId, item.deviceStatus);
                            }}/>
                    }</td>
                </tr>
            );
        })

        let modal;
        if(this.props.deviceModal ===  'tenancy'){
            modal = (
                <TenancyModal />
            );
        }else if(this.props.deviceModal ===  'return'){
            modal = (
                <ReturnModal />
            );
        }else if(this.props.deviceModal === 'verify'){
            modal = <VerifyModal />;
        }else{
            modal = null;
        }

        let moreButton;
        if(this.props.more){
            moreButton = (
                <Button  content={'更多'}  style={{float: 'right'}} onClick={this.handleMoreclick}/>
            );
        }else{
            moreButton = null;
        }

        let createButton;
        if(!this.props.isPropertyAdmin){
            createButton = (
                <Button  content={'登记新设备'} onClick={this.handleTenancyClick}/>
            );
        }else{
            createButton = null;
        }

        let mainBody;
        if(this.props.devicePage !== 'check'){
            mainBody = (
                <div>
                    {modal}
                    <table className="ui celled padded table">
                        <thead>
                        <tr>
                            <th>设备ID</th>
                            <th>设备名</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showDevices}
                        </tbody>
                    </table>

                    {createButton}
                    {moreButton}
                </div>
            );
        }else{
            mainBody = (
                <ProjectDeviceCheck />
            );
        }

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container className='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <ProjectMenu />

                            {mainBody}
                        </Segment>
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId,
    devices: state._projectDevice.devices,
    devicePage: state._projectDevice.devicePage,
    deviceModal: state._projectDevice.deviceModal,
    currentPage: state._projectDevice.currentPage,
    more: state._projectDevice.more,
    isPropertyAdmin: state._userReducer.isPropertyAdmin
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startChecking: () => {
        dispatch(startChecking())
    },
    startTenancying: () => {
        dispatch(startTenancying())
    },
    startReturning: (deviceId) => {
        dispatch(startReturning(deviceId))
    },
    changeCurrentDevicePage: (currentPage) => {
        dispatch(changeCurrentDevicePage(currentPage))
    },
    getDevices: (currentPage, projectId) => {
        dispatch(getDevices(currentPage, projectId));
    },
    startVerifying: (deviceId) => {
        dispatch(startVerifying(deviceId));
    },
    getDeviceOptions: () => {
        dispatch(getDeviceOptions())
    },
    getAdminOptions: (projectId) => {
        dispatch(getAdminOptions(projectId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDevice);