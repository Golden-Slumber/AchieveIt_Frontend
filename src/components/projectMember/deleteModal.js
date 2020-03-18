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
    changeUserId, deleteMember,
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

export class DeleteModal extends React.Component {

    static propTypes = {
        currentUserId: PropTypes.string,
        deleteMember: PropTypes.func,
        cancelManage: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.deleteMember(this.props.currentUserId);
    }

    render() {

        return (

            <div className="ui active modal">
                <div className="header">
                    删除成员
                </div>
                <div className="content">
                    <div className="description">
                        <label>将成员{this.props.currentUserId}从项目中剔除</label>
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
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteMember: (userId) => {
        dispatch(deleteMember(userId));
    },
    cancelManage: () => {
        dispatch(cancelManage());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);