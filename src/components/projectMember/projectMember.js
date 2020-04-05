import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {startManaging, updateMember} from "../../redux/actions/projectMemberActions";
import ProjectMemberManage from "./projectMemberManage";
import ProjectMenu from "../projectMenu/projectMenu";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectMember extends React.Component {

    static propTypes = {
        globalRole: PropTypes.string,
        projectId: PropTypes.string,
        members: PropTypes.array,
        isManaging: PropTypes.bool,
        startManaging: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleManageClick = () => {
        this.props.startManaging();
    }

    render() {

        let showMembers = this.props.members.map((item, index) => {
            return (
                <tr>
                    <td>{item.project_role_name}</td>
                    <td>{item.user_id}</td>
                    <td>{item.superior_id}</td>
                </tr>
            );
        });

        let modifyButton;
        if(this.props.globalRole!=='CommonUser'&&this.props.globalRole!=='ProjectSuperior'){
            modifyButton = (
                <Button content={'修改项目人员信息'} onClick={this.handleManageClick}/>
            );
        }else{
            modifyButton = null;
        }

        let mainBody;
        if(!this.props.isManaging){
            mainBody = (
                <div>
                    <table className="ui celled padded table">
                        <thead>
                        <tr>
                            <th>角色</th>
                            <th>成员ID</th>
                            <th>上级</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showMembers}
                        </tbody>
                    </table>
                    {modifyButton}
                </div>
            );
        }else{
            mainBody = (
                <ProjectMemberManage />
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
    globalRole: state._userReducer.globalRole,
    projectId: state._projectDetail.projectId,
    members: state._projectMember.members,
    isManaging: state._projectMember.isManaging
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startManaging: () => {
        dispatch(startManaging());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMember);