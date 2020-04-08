import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelMemberManage,
    changeUserId, checkGlobalRole, checkProjectRole, clearDetailMembers,
    startDeleting,
    updateMember
} from "../../redux/actions/projectMemberActions";
import {startCreating, startModifying} from "../../redux/actions/projectMemberActions";
import CreateModal from "./createModal";
import ModifyModal from "./modifyModal";
import DeleteModal from "./deleteModal";
import {getPersonnel} from "../../redux/actions/dependencyActions";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectMemberManage extends React.Component {

    static propTypes = {
        globalRole: PropTypes.string,
        projectId: PropTypes.string,
        members: PropTypes.array,
        manageState: PropTypes.string,
        changeUserId: PropTypes.func,
        startCreating: PropTypes.func,
        startModifying: PropTypes.func,
        startDeleting: PropTypes.func,
        updateMember: PropTypes.func,
        getPersonnel: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func,
        currentPermissions: PropTypes.array,
        currentUserId: PropTypes.string,
        cancelMemberManage: PropTypes.func,
        clearDetailMembers: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleCreateClick = () => {
        this.props.startCreating();
        this.props.getPersonnel();
    }

    handleModifyClick = (userId) => {
        this.props.startModifying(userId);
    }

    handleDeleteClick = (userId) => {
        this.props.startDeleting(userId);
    }

    handleFinishClick = () => {
        this.props.updateMember(this.props.projectId, this.props.members);
    }

    handleCancelClick = () => {
        this.props.cancelMemberManage();
    }

    checkProjectRole = (role) => {
        return role === 'ProjectManager';
    }

    checkGlobalRole = (role) => {
        return role === 'ProjectManager';
    }

    render() {
        // let arr = this.props.members;
        let showMembers = this.props.members.map((item, index) => {
            // let trueleader = false;
            // for(let i=0; i<arr.length; i++){
            //     if(arr[i].superiorId === item.user_id && item.user_id !== arr[i].user_id){
            //         trueleader = true;
            //         break;
            //     }
            // }
            return (
                <tr>
                    <td>{item.project_role_name}</td>
                    <td>{item.user_id}</td>
                    <td>{item.superior_id}</td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                        this.handleModifyClick(item.user_id);
                    }}/></td>
                    <td>{
                        item.trueLeader||this.checkProjectRole(item.project_role_name) ?
                            <Icon disabled name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                                this.handleDeleteClick(item.user_id);
                            }}/> :
                            <Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                                this.handleDeleteClick(item.user_id);
                            }}/>
                    }</td>
                </tr>
            );
        });

        let createModal = null;
        if (this.props.manageState === 'create') {
            createModal = (<CreateModal/>);
        }
        let modifyModal = null;
        if (this.props.manageState === 'modify') {
            modifyModal = (<ModifyModal/>);
        }
        let deleteModal = null;
        if (this.props.manageState === 'delete') {
            deleteModal = (<DeleteModal/>);
        }

        let updateSuccessMessage;
        if(this.props.successful === 'updatePermission'){
            updateSuccessMessage = (
                <Message positive={true}>
                    <i className={'close icon'} onClick={this.props.closeSuccess}/>
                    <div className={'header'}>更新已完成</div>
                    <p>人员{this.props.currentUserId}的权限已被更新。</p>
                </Message>
            );
        }else{
            updateSuccessMessage = null;
        }

        let updateFailedMessage;
        if(this.props.failed === 'updateMember'){
            updateFailedMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查一下您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            updateFailedMessage = null;
        }

        return (
            <div>
                {createModal}
                {modifyModal}
                {deleteModal}
                {updateSuccessMessage}
                {updateFailedMessage}
                <table className="ui celled padded table">
                    <thead>
                    <tr>
                        <th>角色</th>
                        <th>成员ID</th>
                        <th>上级</th>
                        <th>修改权限</th>
                        <th>删除</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showMembers}
                    </tbody>
                </table>
                <Button content={'导入新成员'} onClick={this.handleCreateClick}/>
                <Button content={'完成'} onClick={this.handleFinishClick} style={{float: 'right'}}/>
                <Button content={'取消'} onClick={this.handleCancelClick} style={{float: 'right'}}/>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    members: state._projectMember.members,
    manageState: state._projectMember.manageState,
    globalRole: state._userReducer.globalRole,
    projectId: state._projectDetail.projectId,
    failed: state._userReducer.failed,
    successful: state._userReducer.successful,
    currentPermissions: state._projectMember.currentPermissions,
    currentUserId: state._projectMember.currentUserId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateMember: (projectId, members) => {
        dispatch(updateMember(projectId, members));
    },
    changeUserId: (userId) => {
        dispatch(changeUserId(userId));
    },
    startCreating: () => {
        dispatch(startCreating());
    },
    startModifying: (userId) => {
        dispatch(startModifying(userId));
    },
    startDeleting: (userId) => {
        dispatch(startDeleting(userId));
    },
    getPersonnel: () => {
        dispatch(getPersonnel());
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    },
    cancelMemberManage: () => {
        dispatch(cancelMemberManage())
    },
    clearDetailMembers: () => {
        dispatch(clearDetailMembers())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMemberManage);