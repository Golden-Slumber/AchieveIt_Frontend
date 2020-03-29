import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
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
        getVerifyHours: PropTypes.func
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
    }

    render() {
        let showWorkingHours = this.props.workingHours.map((item, index) => {
            return (
                <tr>
                    <td>{item.referred_activity_type_id}</td>
                    <td>{item.function_description_snapshot}</td>
                    <td>{item.start_time}</td>
                    <td>{item.end_time}</td>
                </tr>
            );
        });

        let mainBody;
        if(this.props.hourPageState === 'manage'){
            mainBody = (
                <ProjectHourManage />
            );
        }else if(this.props.hourPageState === 'verify'){
            mainBody = (
                <ProjectHourVerify />
            );
        }else{
            mainBody = (
                <div>
                    <table className="ui fixed single line celled table">
                        <thead>
                        <tr>
                            <th>活动类型</th>
                            <th>功能</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showWorkingHours}
                        </tbody>
                    </table>

                    <Button  content={'管理工时记录'} onClick={this.handleManageClick}/>
                    <Button  content={'去审核'}  onClick={this.handleVerifyClick} style={{float: 'right'}}/>
                </div>
            );
        }

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container clssName='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

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
    workingHours: state._projectHour.workingHours,
    hourPageState: state._projectHour.hourPageState,
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHour);