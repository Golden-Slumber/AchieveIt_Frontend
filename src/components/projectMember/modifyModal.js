import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelManage,
    changePermissions,
    changeRoles,
    changeSuperiorId,
    changeUserId,
    modifyMember
} from "../../redux/actions/projectMemberActions";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const permissionOptions = [
    {key: '294208702120984576', value: 'issue_tracker_access', text: 'issue_tracker_access'},
    {key: '294208708563435520', value: 'working_hour_modification', text: 'working_hour_modification'},
    {key: '294208716280954880', value: 'working_hour_access', text: 'working_hour_access'},
    {key: '294208717023346688', value: 'working_hour_verification', text: 'working_hour_verification'},
    {key: '294208731082653696', value: 'project_git_modification', text: 'project_git_modification'},
    {key: '294208732491939840', value: 'project_git_access', text: 'project_git_access'},
    {key: '294208733922197504', value: 'mail_list_modification', text: 'mail_list_modification'},
    {key: '294208740175904768', value: 'mail_list_access', text: 'mail_list_access'},
    {key: '294208748191219712', value: 'file_system_modification', text: 'file_system_modification'},
    {key: '294208755745161216', value: 'file_system_access', text: 'file_system_access'}
];

export class ModifyModal extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        currentUserId: PropTypes.string,
        currentPermissions: PropTypes.array,
        changePermissions: PropTypes.func,
        modifyMember: PropTypes.func,
        cancelManage: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.modifyMember(this.props.currentUserId, this.props.projectId, this.props.currentPermissions);
    }

    render() {

        let modifyFailedMessage;
        if(this.props.failed === 'updatePermission'){
            modifyFailedMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查一下您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            modifyFailedMessage = null;
        }

        return (

            <div className="ui active modal">
                <div className="header">
                    修改成员权限信息
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>人员ID  {this.props.currentUserId}</label>
                            </div>
                            <div className="field">
                                <label>权限</label>
                                <Dropdown
                                    placeholder='选择该人员所拥有的权限'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={permissionOptions}
                                    onChange={this.props.changePermissions}
                                />
                            </div>
                        </form>
                        {modifyFailedMessage}
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelManage}>
                        取消
                    </div>
                    <div className="ui positive right labeled icon button" onClick={this.handleFinishClick}>
                        完成
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>

        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    currentUserId: state._projectMember.currentUserId,
    currentPermissions: state._projectMember.currentPermissions,
    projectId: state._projectDetail.projectId,
    failed: state._userReducer.failed,
    successful: state._userReducer.succesful,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changePermissions: (e, {value}) => {
        dispatch(changePermissions(value));
    },
    modifyMember: (userId, projectId, permissions) => {
        dispatch(modifyMember(userId, projectId, permissions));
    },
    cancelManage: () => {
        dispatch(cancelManage())
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyModal);