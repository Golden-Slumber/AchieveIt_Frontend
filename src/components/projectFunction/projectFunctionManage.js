import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import CreateModal from "./createModal";
import ModifyModal from "./modifyModal";
import DeleteModal from "./deleteModal";
import {startCreating, startModifying, startDeleting, updateFunction} from "../../redux/actions/projectFunctionActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectFunctionManage extends React.Component {

    static propTypes = {
        firstFunctions: PropTypes.array,
        secondFunctions: PropTypes.array,
        manageState: PropTypes.string,
        startCreating: PropTypes.func,
        startModifying: PropTypes.func,
        startDeleting: PropTypes.func,
        updateFunction: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleCreateClick = () => {
        this.props.startCreating();
    }

    handleModifyClick = (functionId, superiorId) => {
        this.props.startModifying(functionId, superiorId);
    }

    handleDeleteClick = (functionId) => {
        this.props.startDeleting(functionId);
    }

    handleFinishClick = () => {
        this.props.updateFunction(this.props.firstFunctions, this.props.secondFunctions);
    }

    render() {

        let showFirstFunctions = this.props.firstFunctions.map((item, index) => {
            return (
                <tr>
                    <td>{item.functionId}</td>
                    <td>{item.functionDescription}</td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                        this.handleModifyClick(item.functionId, item.superiorId);
                    }}/></td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                        this.handleDeleteClick(item.functionId);
                    }}/></td>
                </tr>
            );
        });
        let showSecondFunctions = this.props.secondFunctions.map((item, index) => {
            return (
                <tr>
                    <td>{item.functionId}</td>
                    <td>{item.functionDescription}</td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                        this.handleModifyClick(item.functionId, item.superiorId);
                    }}/></td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                        this.handleDeleteClick(item.functionId);
                    }}/></td>
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

        return (
            <div>
                {createModal}
                {modifyModal}
                {deleteModal}
                <form className="ui form">
                    <div className="two fields">
                        <div className="field">
                            <table className="ui celled structured table">
                                <thead>
                                <tr>
                                    <th>一级功能</th>
                                    <th>功能描述</th>
                                    <th>修改</th>
                                    <th>删除</th>
                                </tr>
                                </thead>
                                <tbody>
                                {showFirstFunctions}
                                </tbody>
                            </table>
                        </div>
                        <div className="field">
                            <table className="ui celled structured table">
                                <thead>
                                <tr>
                                    <th>二级功能</th>
                                    <th>功能描述</th>
                                    <th>修改</th>
                                    <th>删除</th>
                                </tr>
                                </thead>
                                <tbody>
                                {showSecondFunctions}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Button content={'创建新功能'} onClick={this.handleCreateClick}/>
                    <Button content={'完成'} onClick={this.handleFinishClick} style={{float: 'right'}}/>
                </form>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    firstFunctions: state._projectFunction.firstFunctions,
    secondFunctions: state._projectFunction.secondFunctions,
    manageState: state._projectFunction.manageState
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startCreating: () => {
        dispatch(startCreating());
    },
    startModifying: (functionId, SuperiorId) => {
        dispatch(startModifying(functionId, SuperiorId));
    },
    startDeleting: (functionId) => {
        dispatch(startDeleting(functionId));
    },
    updateFunction: (firstFunctions, secondFunctions) => {
        dispatch(updateFunction(firstFunctions, secondFunctions));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFunctionManage);