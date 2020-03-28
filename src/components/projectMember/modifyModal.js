import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelManage,
    changePermissions,
    changeRoles,
    changeSuperiorId,
    changeUserId,
    modifyMember
} from "../../redux/actions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const permissionOptions = [
    {key: '294208701688971264', value: '294208701688971264', text: 'issue_tracker_modification'},
    {key: '294208702120984576', value: '294208702120984576', text: 'issue_tracker_access'},
    {key: '294208708563435520', value: '294208708563435520', text: 'working_hour_modification'},
    {key: '294208716280954880', value: '294208716280954880', text: 'working_hour_access'},
    {key: '294208717023346688', value: '294208717023346688', text: 'working_hour_verification'},
    {key: '294208731082653696', value: '294208731082653696', text: 'project_git_modification'},
    {key: '294208732491939840', value: '294208732491939840', text: 'project_git_access'},
    {key: '294208733922197504', value: '294208733922197504', text: 'mail_list_modification'},
    {key: '294208740175904768', value: '294208740175904768', text: 'mail_list_access'},
    {key: '294208748191219712', value: '294208748191219712', text: 'file_system_modification'},
    {key: '294208755745161216', value: '294208755745161216', text: 'file_system_access'}
];

export class ModifyModal extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        currentUserId: PropTypes.string,
        currentPermissions: PropTypes.array,
        changePermissions: PropTypes.func,
        modifyMember: PropTypes.func,
        cancelManage: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.modifyMember(this.props.currentUserId, this.props.projectId, this.props.currentPermissions);
    }

    render() {

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
    projectId: state._projectDetail.projectId
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyModal);