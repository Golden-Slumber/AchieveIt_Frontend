import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {getProjectMemberOptions, startCreatingRisk} from "../../redux/actions/projectRiskActions";
import CreateModal from "./createModal";
import ProjectMenu from "../projectMenu/projectMenu";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectRisk extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        globalRole: PropTypes.string,
        risks: PropTypes.array,
        isCreating: PropTypes.bool,
        startCreatingRisk: PropTypes.func,
        getProjectMembersOptions: PropTypes.func
    };

    handleCreateClick = () => {
        this.props.startCreatingRisk();
        this.props.getProjectMembersOptions(this.props.projectId);
    }

    render() {

        let createButton;
        if(this.props.globalRole === 'ProjectManager'){
            createButton = (
                <Button  content={'新增风险记录'} onClick={this.handleCreateClick}/>
            );
        }else{
            createButton = null;
        }

        let showRisks = this.props.risks.map((item, index) => {
            return (
                <tr>
                    <td>{item.risk_id}</td>
                    <td>{item.risk_type}</td>
                    <td>{item.risk_description}</td>
                    <td>{item.risk_level}</td>
                    <td>{item.risk_impact}</td>
                    <td>{item.risk_countermeasure}</td>
                    <td>{item.risk_status}</td>
                    <td>{item.risk_track_frequency}</td>
                    <td>{item.risk_responsible_person}</td>
                    <td>{item.risk_related_person}</td>
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
                    <Container className='main ui' style={{margin: '100px, 0px, 0px, 0px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <ProjectMenu />

                            {createModal}
                            <table className="ui celled padded table" >
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
                                    <th>相关人员</th>
                                </tr>
                                </thead>
                                <tbody>
                                {showRisks}
                                </tbody>
                            </table>

                            {createButton}
                        </Segment>
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId,
    globalRole: state._userReducer.globalRole,
    risks: state._projectRisk.risks,
    isCreating: state._projectRisk.isCreating,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startCreatingRisk: () => {
        dispatch(startCreatingRisk());
    },
    getProjectMembersOptions: (projectId) => {
        dispatch(getProjectMemberOptions(projectId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRisk);