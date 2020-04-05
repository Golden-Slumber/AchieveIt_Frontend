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
    createMember, setRoleOptions, setSuperiorOptions
} from "../../redux/actions/projectMemberActions";
import {closeFailed, formFailed} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class CreateModal extends React.Component {

    static propTypes = {
        globalRole: PropTypes.string,
        members: PropTypes.array,
        roleOptions: PropTypes.array,
        superiorOptions: PropTypes.array,
        currentUserId: PropTypes.string,
        currentSuperiorId: PropTypes.string,
        currentRoleId: PropTypes.string,
        currentRoleName: PropTypes.string,
        currentPermissions: PropTypes.array,
        personnelOptions: PropTypes.array,
        changeUserId: PropTypes.func,
        changeSuperiorId: PropTypes.func,
        changeRoles: PropTypes.func,
        changePermissions: PropTypes.func,
        createMember: PropTypes.func,
        cancelManage: PropTypes.func,
        setRoleOptions: PropTypes.func,
        setSuperiorOptions: PropTypes.func,
        failed: PropTypes.string,
        formFailed: PropTypes.func,
        closeFailed: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        if(this.props.currentUserId === '' || this.props.currentSuperiorId === '' || this.props.currentRoleId === '' || this.props.currentRoleName === ''){
            this.props.formFailed('createMember');
        }else{
            this.props.createMember(this.props.currentUserId, this.props.currentSuperiorId, this.props.currentRoleId, this.props.currentRoleName);
        }
    }

    handleChangeMember = (e, data) => {
        this.props.changeUserId(e, data);
        this.props.setRoleOptions(this.props.globalRole, this.props.members, this.props.currentUserId);
    }

    handleChangeRole = (e, data) => {
        this.props.changeRoles(e, data);
        let str = data.value.split(' ');
        this.props.setSuperiorOptions(str[1], this.props.members, this.props.currentUserId);
    }

    render() {

        let updateFailedMessage;
        if(this.props.failed === 'createMember'){
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

            <div className="ui active modal">
                <div className="header">
                    导入新成员
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>人员ID</label>
                                <Dropdown
                                    placeholder='选择人员导入'
                                    fluid
                                    search
                                    selection
                                    options={this.props.personnelOptions}
                                    onChange={(e, data) => {
                                        this.handleChangeMember(e, data);
                                    }}
                                />
                            </div>
                            <div className="field">
                                <label>角色</label>
                                <Dropdown
                                    placeholder='选择该人员在项目中的角色'
                                    fluid
                                    search
                                    selection
                                    options={this.props.roleOptions}
                                    onChange={(e, data) => {
                                        this.handleChangeRole(e, data);
                                    }}
                                />
                            </div>
                            <div className="field">
                                <label>上级</label>
                                <Dropdown
                                    placeholder='选择导入人员的上级'
                                    fluid
                                    search
                                    selection
                                    options={this.props.superiorOptions}
                                    onChange={this.props.changeSuperiorId}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                {updateFailedMessage}
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
    currentSuperiorId: state._projectMember.currentSuperiorId,
    currentRoleId: state._projectMember.currentRoleId,
    currentRoleName: state._projectMember.currentRoleName,
    currentPermissions: state._projectMember.currentPermissions,
    globalRole: state._userReducer.globalRole,
    personnelOptions: state._projectDependency.personnelOptions,
    members: state._projectMember.members,
    roleOptions: state._projectMember.roleOptions,
    superiorOptions: state._projectMember.superiorOptions,
    failed: state._userReducer.failed,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeUserId: (e, data) => {
        dispatch(changeUserId(data.value));
    },
    changeSuperiorId: (e, data) => {
        dispatch(changeSuperiorId(data.value));
    },
    changeRoles: (e, data) => {
        let str = data.value.split(' ');
        dispatch(changeRoles(str[0], str[1]));
    },
    changePermissions: (e, {value}) => {
        dispatch(changePermissions(value));
    },
    createMember: (userId, superiorId, roles, permissions) => {
        dispatch(createMember(userId, superiorId, roles, permissions));
    },
    cancelManage: () => {
        dispatch(cancelManage());
    },
    setRoleOptions: (globalRole, members, user_id) => {
        dispatch(setRoleOptions(globalRole, members, user_id));
    },
    setSuperiorOptions: (role, members, user_id) => {
        dispatch(setSuperiorOptions(role, members, user_id));
    },
    formFailed: (form) => {
        dispatch(formFailed(form));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);