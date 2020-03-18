import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {cancelFunctionManage, deleteFunction} from "../../redux/actions/projectFunctionActions";


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
        currentFunctionId: PropTypes.string,
        deleteFunction: PropTypes.func,
        cancelFunctionManage: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.deleteFunction(this.props.currentFunctionId);
    }

    render() {

        return (

            <div className="ui active modal">
                <div className="header">
                    删除功能
                </div>
                <div className="content">
                    <div className="description">
                        <label>将功能{this.props.currentFunctionId}从项目中剔除</label>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelFunctionManage}>
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
    currentFunctionId: state._projectFunction.currentFunctionId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteFunction: (currentFunctionId) => {
        dispatch(deleteFunction(currentFunctionId));
    },
    cancelFunctionManage: () => {
        dispatch(cancelFunctionManage());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);