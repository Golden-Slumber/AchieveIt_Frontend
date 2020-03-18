import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {startCreatingRisk} from "../../redux/actions/projectRiskActions";
import CreateModal from "./createModal";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectRisk extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        risks: PropTypes.array,
        isCreating: PropTypes.bool,
        startCreatingRisk: PropTypes.func
    };

    render() {

        let showRisks = this.props.risks.map((item, index) => {
            return (
                <tr>
                    <td>{item.riskId}</td>
                    <td>{item.riskType}</td>
                    <td>{item.riskDescription}</td>
                    <td>{item.riskLevel}</td>
                    <td>{item.riskImpact}</td>
                    <td>{item.riskCountermeasure}</td>
                    <td>{item.riskStatus}</td>
                    <td>{item.riskFrequency}</td>
                    <td>{item.responsiblePerson}</td>
                </tr>
            );
        });

        let createModal;
        if(this.props.isCreating){
            createModal = (
                <CreateModal />
            );
        }else{
            createModal = null;
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
                                    <a className="item">项目设备 </a>
                                </Link>
                                <Link to={'/projectRisk'}>
                                    <a className="item active">项目风险 </a>
                                </Link>
                                <Link to={'/projectDefect'}>
                                    <a className="item">项目缺陷 </a>
                                </Link>
                            </div>

                            {createModal}
                            <table className="ui fixed single line celled table">
                                <thead>
                                <tr>
                                    <th>风险ID</th>
                                    <th>风险类型</th>
                                    <th>风险描述</th>
                                    <th>风险级别</th>
                                    <th>风险影响</th>
                                    <th>策略</th>
                                    <th>状态</th>
                                    <th>跟踪频度</th>
                                    <th>负责人</th>
                                </tr>
                                </thead>
                                <tbody>
                                {showRisks}
                                </tbody>
                            </table>

                            <Button  content={'新增风险记录'} onClick={this.props.startCreatingRisk}/>
                        </Segment>
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId,
    risks: state._projectRisk.risks,
    isCreating: state._projectRisk.isCreating,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startCreatingRisk: () => {
        dispatch(startCreatingRisk());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRisk);