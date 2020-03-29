import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    switchDefect,
    switchDetail,
    switchDevice,
    switchFunction,
    switchHour,
    switchMember, switchRisk
} from "../../redux/actions/projectMenuActions";
import {getProjectDetail, getProjectMembers, getWorkHours} from "../../redux/actions";
import {getDownloadData, getProjectFunction} from "../../redux/actions/projectFunctionActions";
import {changeCurrentDevicePage, getDevices} from "../../redux/actions/projectDeviceActions";
import {getRisks} from "../../redux/actions/projectRiskActions";
import {getUrl} from "../../redux/actions/projectDefectActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectMenu extends React.Component {

    static propTypes = {
        globalRole: PropTypes.string,
        projectId: PropTypes.string,
        detail: PropTypes.string,
        member: PropTypes.string,
        function: PropTypes.string,
        hour: PropTypes.string,
        device: PropTypes.string,
        risk: PropTypes.string,
        defect: PropTypes.string,
        switchDetail: PropTypes.func,
        switchMember: PropTypes.func,
        switchFunction: PropTypes.func,
        switchHour: PropTypes.func,
        switchDevice: PropTypes.func,
        switchRisk: PropTypes.func,
        switchDefect: PropTypes.func,
        getProjectDetail: PropTypes.func,
        getProjectMembers: PropTypes.func,
        getProjectFunctions: PropTypes.func,
        getDownloadData: PropTypes.func,
        getWorkHours: PropTypes.func,
        changeCurrentDevicePage: PropTypes.func,
        getDevices: PropTypes.func,
        getRisks: PropTypes.func,
        getUrl: PropTypes.func
    };

    handleDetailClick = () => {
        this.props.switchDetail();
        this.props.getProjectDetail(this.props.projectId);
    }

    handleMemberClick = () => {
        this.props.switchMember();
        this.props.getProjectMembers(this.props.projectId);
    }

    handleFunctionClick = () => {
        this.props.switchFunction();
        this.props.getProjectFunctions(this.props.projectId);
        this.props.getDownloadData(this.props.projectId);
    }

    handleHourClick = () => {
        this.props.switchHour();
        this.props.getWorkHours(this.props.projectId);
    }

    handleDeviceClick = () => {
        this.props.switchDevice();
        this.props.changeCurrentDevicePage(1);
        this.props.getDevices(1);
    }

    handleRiskClick = () => {
        this.props.switchRisk();
        this.props.getRisks(this.props.projectId);
    }

    handleDefectClick = () => {
        this.props.switchDefect();
        this.props.getUrl(this.props.projectId);
    }

    render() {

        return (
            <div className="ui tabular menu">
                <Link to={'/projectDetail'}>
                    <a className={this.props.detail} onClick={this.handleDetailClick}>项目信息 </a>
                </Link>
                <Link to={'/projectMember'}>
                    <a className={this.props.member} onClick={this.handleMemberClick}>项目成员 </a>
                </Link>
                <Link to={'/projectFunction'}>
                    <a className={this.props.function} onClick={this.handleFunctionClick}>项目功能 </a>
                </Link>
                <Link to={'/projectHour'}>
                    <a className={this.props.hour} onClick={this.handleHourClick}>项目工时</a>
                </Link>
                <Link to={'/projectDevice'}>
                    <a className={this.props.device} onClick={this.handleDeviceClick}>项目设备 </a>
                </Link>
                <Link to={'/projectRisk'}>
                    <a className={this.props.risk} onClick={this.handleRiskClick}>项目风险 </a>
                </Link>
                <Link to={'/projectDefect'}>
                    <a className={this.props.defect} onClick={this.handleDefectClick}>项目缺陷 </a>
                </Link>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    globalRole: state._userReducer.globalRole,
    projectId: state._projectDetail.projectId,
    detail: state._projectMenu.detail,
    member: state._projectMenu.member,
    function: state._projectMenu.function,
    hour: state._projectMenu.hour,
    device: state._projectMenu.device,
    risk: state._projectMenu.risk,
    defect: state._projectMenu.defect,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    switchDetail: () => {
        dispatch(switchDetail())
    },
    switchMember: () => {
        dispatch(switchMember())
    },
    switchFunction: () => {
        dispatch(switchFunction())
    },
    switchHour: () => {
        dispatch(switchHour())
    },
    switchDevice: () => {
        dispatch(switchDevice())
    },
    switchRisk: () => {
        dispatch(switchRisk())
    },
    switchDefect: () => {
        dispatch(switchDefect())
    },
    getProjectDetail: (projectId) => {
        dispatch(getProjectDetail(projectId))
    },
    getProjectMembers: (projectId) => {
        dispatch(getProjectMembers(projectId))
    },
    getProjectFunctions: (projectId) => {
        dispatch(getProjectFunction(projectId))
    },
    getDownloadData: (projectId) => {
        dispatch(getDownloadData(projectId))
    },
    getWorkHours: (projectId) => {
        dispatch(getWorkHours(projectId))
    },
    changeCurrentDevicePage: (currentPage) => {
        dispatch(changeCurrentDevicePage(currentPage));
    },
    getDevices: (currentPage) => {
        dispatch(getDevices(currentPage));
    },
    getRisks: (projectId) => {
        dispatch(getRisks(projectId));
    },
    getUrl: (projectId) => {
        dispatch(getUrl(projectId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);