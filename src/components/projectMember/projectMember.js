import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    getMemberDetail,
    startManaging,
    switchDetailMembers,
    updateMember
} from "../../redux/actions/projectMemberActions";
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
        projectState: PropTypes.string,
        projectId: PropTypes.string,
        members: PropTypes.array,
        isManaging: PropTypes.bool,
        startManaging: PropTypes.func,
        detailed: PropTypes.bool,
        detailMembers: PropTypes.array,
        switchDetailMembers: PropTypes.func,
        getMemberDetail: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleManageClick = () => {
        this.props.startManaging();
    }

    handleSwitchClick = () => {
        let arr = this.props.members;
        for(let i=0; i<arr.length; i++){
            this.props.getMemberDetail(i, arr[i].user_id);
        }
        this.props.switchDetailMembers(true);
    }

    checkProjectState = (state) => {
        return state!=='Finished'&&state!=='ArchiveDeclined'&&state!=='ReadyArchive'&&state!=='Archived'
    }

    render() {

        let showMembers;
        if(this.props.detailed){
            showMembers = this.props.detailMembers.map((item, index) => {
                return (
                    <tr>
                        <td>{item.project_role_name}</td>
                        <td>{item.user_id}</td>
                        <td>{item.superior_id}</td>
                        <td>{item.user_name}</td>
                        <td>{item.user_email}</td>
                        <td>{item.user_department}</td>
                        <td>{item.user_telephone}</td>
                    </tr>
                );
            });
        }else{
            showMembers = this.props.members.map((item, index) => {
                return (
                    <tr>
                        <td>{item.project_role_name}</td>
                        <td>{item.user_id}</td>
                        <td>{item.superior_id}</td>
                    </tr>
                );
            });
        }

        let thead;
        if(this.props.detailed){
            thead = (
                <tr>
                    <th>角色</th>
                    <th>成员ID</th>
                    <th>上级</th>
                    <th>姓名</th>
                    <th>email</th>
                    <th>所属部门</th>
                    <th>联系电话</th>
                </tr>
            );
        }else{
            thead = (
                <tr>
                    <th>角色</th>
                    <th>成员ID</th>
                    <th>上级</th>
                </tr>
            );
        }

        let detailButton;
        if(this.props.detailed){
            detailButton = null;
        }else{
            detailButton = (
                <Button  content={'显示详细信息'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}} onClick={this.handleSwitchClick}/>
            );
        }

        let modifyButton;
        if(this.props.globalRole!=='CommonUser'&&this.props.globalRole!=='ProjectSuperior'&&this.checkProjectState(this.props.projectState)){
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
                        {thead}
                        </thead>
                        <tbody>
                        {showMembers}
                        </tbody>
                    </table>
                    {detailButton}
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
    projectState: state._projectDetail.projectState,
    projectId: state._projectDetail.projectId,
    members: state._projectMember.members,
    isManaging: state._projectMember.isManaging,
    detailed: state._projectMember.detailed,
    detailMembers: state._projectMember.detailMembers
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startManaging: () => {
        dispatch(startManaging());
    },
    switchDetailMembers: (payload) => {
        dispatch(switchDetailMembers(payload));
    },
    getMemberDetail: (index, user_id) => {
        dispatch(getMemberDetail(index, user_id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMember);