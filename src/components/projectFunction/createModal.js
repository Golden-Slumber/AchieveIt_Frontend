import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelFunctionManage,
    changeFunctionDescription, createFunction,
    setFunctionId, setSuperiorId
} from "../../redux/actions/projectFunctionActions";


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

export class CreateModal extends React.Component {

    static propTypes = {
        currentFunctionId: PropTypes.string,
        currentSuperiorId: PropTypes.string,
        currentDescription: PropTypes.string,
        setFunctionId: PropTypes.func,
        setSuperiorId: PropTypes.func,
        changeFunctionDescription: PropTypes.func,
        createFunction: PropTypes.func,
        cancelFunctionManage: PropTypes.func,
        superiorFunctions: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        console.log(this.props.currentDescription);
        this.props.createFunction(this.props.currentFunctionId, this.props.currentSuperiorId, this.props.currentDescription);
    }

    render() {

        return (

            <div className="ui active modal">
                <div className="header">
                    新建功能
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>父功能ID</label>
                                <Dropdown
                                    placeholder='选择新功能的父功能'
                                    fluid
                                    search
                                    selection
                                    options={this.props.superiorFunctions}
                                    onChange={this.props.setSuperiorId}
                                />
                            </div>
                            <div className="field">
                                <label>功能描述</label>
                                <input type="text" placeholder="功能描述" value={this.props.currentDescription}
                                       onChange={this.props.changeFunctionDescription}/>
                            </div>
                        </form>
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
    currentSuperiorId: state._projectFunction.currentSuperiorId,
    currentDescription: state._projectFunction.currentDescription,
    superiorFunctions: state._projectFunction.superiorFunctions
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeFunctionDescription: (e) => {
        dispatch(changeFunctionDescription(e.target.value));
    },
    setFunctionId: (e) => {
        dispatch(setFunctionId(e.target.value));
    },
    setSuperiorId: (e, data) => {
        dispatch(setSuperiorId(data.value));
    },
    createFunction: (functionId, superiorId, description) => {
        dispatch(createFunction(functionId, superiorId, description));
    },
    cancelFunctionManage: () => {
        dispatch(cancelFunctionManage())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);