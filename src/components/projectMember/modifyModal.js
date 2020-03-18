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

const options = [
    {key: '1', value: '2', text: '3'},
    {key: '4', value: '5', text: '6'},
    {key: '7', value: '8', text: '9'}
];

export class ModifyModal extends React.Component {

    static propTypes = {
        currentUserId: PropTypes.string,
        currentSuperiorId: PropTypes.string,
        currentRoles: PropTypes.array,
        currentPermissions: PropTypes.array,
        changeUserId: PropTypes.func,
        changeSuperiorId: PropTypes.func,
        changeRoles: PropTypes.func,
        changePermissions: PropTypes.func,
        modifyMember: PropTypes.func,
        cancelManage: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.modifyMember(this.props.currentUserId, this.props.currentSuperiorId, this.props.currentRoles, this.props.currentPermissions);
    }

    render() {

        return (

            <div className="ui active modal">
                <div className="header">
                    修改成员信息
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>人员ID  {this.props.currentUserId}</label>
                            </div>
                            <div className="field">
                                <label>上级</label>
                                <Dropdown
                                    placeholder='选择人员的上级'
                                    fluid
                                    search
                                    selection
                                    options={options}
                                    onChange={this.props.changeSuperiorId}
                                />
                            </div>
                            <div className="field">
                                <label>角色</label>
                                <Dropdown
                                    placeholder='选择该人员在项目中的角色'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={options}
                                    onChange={this.props.changeRoles}
                                />
                            </div>
                            <div className="field">
                                <label>权限</label>
                                <Dropdown
                                    placeholder='选择该人员所拥有的权限'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={options}
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
    currentSuperiorId: state._projectMember.currentSuperiorId,
    currentRoles: state._projectMember.currentRoles,
    currentPermissions: state._projectMember.currentPermissions
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeUserId: (e, data) => {
        dispatch(changeUserId(data.value));
    },
    changeSuperiorId: (e, data) => {
        dispatch(changeSuperiorId(data.value));
    },
    changeRoles: (e, {value}) => {
        dispatch(changeRoles(value));
    },
    changePermissions: (e, {value}) => {
        dispatch(changePermissions(value));
    },
    modifyMember: (userId, superiorId, roles, permissions) => {
        dispatch(modifyMember(userId, superiorId, roles, permissions));
    },
    cancelManage: () => {
        dispatch(cancelManage())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyModal);