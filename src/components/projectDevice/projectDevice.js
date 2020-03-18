import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {startChecking, startReturning, startTenancying} from "../../redux/actions/projectDeviceActions";
import TenancyModal from "./tenancyModal";
import ReturnModal from "./returnModal";
import ProjectDeviceCheck from "./projectDeviceCheck";

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
        startChecking: PropTypes.func,
        startTenancying: PropTypes.func,
        startReturning: PropTypes.func
    };

    handleReturnClick = (deviceId) => {
        this.props.startReturning(deviceId);
    }

    render() {

        let showDevices = this.props.devices.map((item, index) => {
            return (
                <tr>
                    <td>{item.deviceId}</td>
                    <td>{item.deviceStatus}</td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                        this.handleReturnClick(item.deviceId);
                    }}/></td>
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
        }else{
            modal = null;
        }

        let mainBody;
        if(this.props.devicePage !== 'check'){
            mainBody = (
                <div>
                    {modal}
                    <table className="ui fixed single line celled table">
                        <thead>
                        <tr>
                            <th>设备名</th>
                            <th>状态</th>
                            <th>归还</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showDevices}
                        </tbody>
                    </table>

                    <Button  content={'登记设备'} onClick={this.props.startTenancying}/>
                    <Button  content={'去审核'}  style={{float: 'right'}} onClick={this.props.startChecking}/>
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
                    <Container clssName='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <div className="ui tabular menu">
                                <Link to={'/projectDetail'}>
                                    <a className="item">项目信息 </a>
                                </Link>
                                <Link to={'/projectMember'}>
                                    <a className="item">项目成员 </a>
                                </Link>
                                <Link to={'/projectFunction'}>
                                    <a className="item">项目功能 </a>
                                </Link>
                                <Link to={'/projectHour'}>
                                    <a className="item">项目工时</a>
                                </Link>
                                <Link to={'/projectDevice'}>
                                    <a className="item active">项目设备 </a>
                                </Link>
                                <Link to={'/projectRisk'}>
                                    <a className="item">项目风险 </a>
                                </Link>
                                <Link to={'/projectDefect'}>
                                    <a className="item">项目缺陷 </a>
                                </Link>
                            </div>


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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDevice);