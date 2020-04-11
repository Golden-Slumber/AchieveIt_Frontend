import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ProjectHourManage from "./projectHourManage";
import ProjectHourVerify from "./projectHourVerify";
import {
    getVerifyHours,
    setActivityOptions,
    setFunctionHourOptions,
    startManaging,
    startVerifying
} from "../../redux/actions/projectHourActions";
import ProjectMenu from "../projectMenu/projectMenu";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectHour extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        workingHours: PropTypes.array,
        hourPageState: PropTypes.string,
        startManaging: PropTypes.func,
        startVerifying: PropTypes.func,
        setFunctionHourOptions: PropTypes.func,
        setActivityOptions: PropTypes.func,
        getVerifyHours: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func,
        permissions: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    handleManageClick = () => {
        this.props.startManaging();
        this.props.setFunctionHourOptions(this.props.projectId);
        this.props.setActivityOptions();
    }

    handleVerifyClick = () => {
        this.props.startVerifying();
        this.props.getVerifyHours(this.props.projectId);
        this.props.setActivityOptions();
    }

    checkManagePermission = () => {
        for (let i = 0; i < this.props.permissions.length; i++) {
            if (this.props.permissions[i] === 'working_hour_modification')
                return true;
        }
        return false;
    }

    checkVerifyPermission = () => {
        for (let i = 0; i < this.props.permissions.length; i++) {
            if (this.props.permissions[i] === 'working_hour_verification')
                return true;
        }
        return false;
    }

    render() {
        let showWorkingHours = this.props.workingHours.map((item, index) => {
            let str;
            if(item.verified === null){
                str = '尚未审核';
            }else{
                if(item.verified === false) {
                    str = '审核不通过';
                }else{
                    str = '已审核通过';
                }
            }
            return (
                <tr>
                    <td>{item.referred_activity_type_id}</td>
                    <td>{item.function_description_snapshot}</td>
                    <td>{item.start_time}</td>
                    <td>{item.end_time}</td>
                    <td>{str}</td>
                </tr>
            );
        });

        let getHoursFailedMessage;
        if (this.props.failed === 'getHoursFailed') {
            getHoursFailedMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>或许您并没有足够的权限。</p>
                </Message>
            );
        } else {
            getHoursFailedMessage = null;
        }

        let mainBody;
        if (this.props.hourPageState === 'manage') {
            mainBody = (
                <ProjectHourManage/>
            );
        } else if (this.props.hourPageState === 'verify') {
            mainBody = (
                <ProjectHourVerify/>
            );
        } else {
            mainBody = (
                <div>
                    <table className="ui celled padded table">
                        <thead>
                        <tr>
                            <th>活动类型</th>
                            <th>功能</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>审核状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showWorkingHours}
                        </tbody>
                    </table>

                    {getHoursFailedMessage}
                    {
                        this.checkManagePermission() ?
                            <Button content={'管理工时记录'} onClick={this.handleManageClick}/>
                            :
                            null
                    }
                    {
                        this.checkVerifyPermission() ?
                            <Button content={'去审核'} onClick={this.handleVerifyClick} style={{float: 'right'}}/>
                            :
                            null
                    }
                </div>
            );
        }

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container className='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <ProjectMenu/>

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
    workingHours: state._projectHour.workingHours,
    hourPageState: state._projectHour.hourPageState,
    failed: state._userReducer.failed,
    successful: state._userReducer.successful,
    permissions: state._userReducer.permissions
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startManaging: () => {
        dispatch(startManaging())
    },
    startVerifying: () => {
        dispatch(startVerifying())
    },
    setFunctionHourOptions: (projectId) => {
        dispatch(setFunctionHourOptions(projectId));
    },
    setActivityOptions: () => {
        dispatch(setActivityOptions());
    },
    getVerifyHours: (projectId) => {
        dispatch(getVerifyHours(projectId));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHour);