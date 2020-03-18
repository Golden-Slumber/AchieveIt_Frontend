import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ProjectHourManage from "./projectHourManage";
import ProjectHourVerify from "./projectHourVerify";
import {startManaging, startVerifying} from "../../redux/actions/projectHourActions";

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
        startVerifying: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        let showWorkingHours = this.props.workingHours.map((item, index) => {
            return (
                <tr>
                    <td>{item.activityType}</td>
                    <td>{item.functionType}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
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

                    <Button  content={'管理工时记录'} onClick={this.props.startManaging}/>
                    <Button  content={'去审核'}  onClick={this.props.startVerifying} style={{float: 'right'}}/>
                </div>
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
                                    <a className="item active">项目工时</a>
                                </Link>
                                <Link to={'/projectDevice'}>
                                    <a className="item">项目设备 </a>
                                </Link>
                                <Link to={'/projectRisk'}>
                                    <a className="item">项目风险 </a>
                                </Link>
                                <Link to={'/projectDefect'}>
                                    <a className="item">项目缺陷 </a>
                                </Link>
                            </div>

                            {mainBody}
                            {/*todo change project info*/}
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHour);