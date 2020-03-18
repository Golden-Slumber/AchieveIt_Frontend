import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    changeUserId,
    startDeleting,
    updateMember
} from "../../redux/actions";
import { startCreating, startModifying } from "../../redux/actions/projectMemberActions";
import CreateModal from "./createModal";
import ModifyModal from "./modifyModal";
import DeleteModal from "./deleteModal";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectMemberManage extends React.Component {

    static propTypes = {
        members: PropTypes.array,
        manageState: PropTypes.string,
        changeUserId: PropTypes.func,
        startCreating: PropTypes.func,
        startModifying: PropTypes.func,
        startDeleting: PropTypes.func,
        updateMember: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleCreateClick = () => {
        this.props.startCreating();
    }

    handleModifyClick = (userId) => {
        console.log("click modify")
        this.props.startModifying(userId);
    }

    handleDeleteClick = (userId) => {
        this.props.startDeleting(userId);
    }

    handleFinishClick = () => {
        this.props.updateMember(this.props.members);
    }

    render() {
        let showMembers = this.props.members.map((item, index) => {
            let roles = item.projectRolesId.join(", ");
            return (
                <tr>
                    <td>{item.userId}</td>
                    <td>{item.superiorId}</td>
                    <td>{roles}</td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {this.handleModifyClick(item.userId);}}/></td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {this.handleDeleteClick(item.userId);}}/></td>
                </tr>
            );
        });

        let createModal = null;
        if(this.props.manageState === 'create'){
            createModal = (<CreateModal />);
        }
        let modifyModal = null;
        if(this.props.manageState === 'modify'){
            modifyModal = (<ModifyModal />);
        }
        let deleteModal = null;
        if(this.props.manageState === 'delete'){
            deleteModal = (<DeleteModal />);
        }

        return (
            <div>
                {createModal}
                {modifyModal}
                {deleteModal}
                <table className="ui fixed single line celled table">
                    <thead>
                    <tr>
                        <th>成员ID</th>
                        <th>上级</th>
                        <th>角色</th>
                        <th>修改</th>
                        <th>删除</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showMembers}
                    </tbody>
                </table>
                <Button content={'导入新成员'} onClick={this.handleCreateClick}/>
                <Button content={'完成'} onClick={this.handleFinishClick} style={{float: 'right'}}/>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    members: state._projectMember.members,
    manageState: state._projectMember.manageState
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateMember: (members) => {
        dispatch(updateMember(members));
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMemberManage);