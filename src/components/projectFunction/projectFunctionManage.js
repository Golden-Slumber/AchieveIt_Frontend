import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import CreateModal from "./createModal";
import ModifyModal from "./modifyModal";
import DeleteModal from "./deleteModal";
import {
    startCreating,
    startModifying,
    startDeleting,
    updateFunction,
    setSuperiorFunctionOptions, startUploading
} from "../../redux/actions/projectFunctionActions";
import UploadForm from "./uploadForm";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectFunctionManage extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        firstFunctions: PropTypes.array,
        secondFunctions: PropTypes.array,
        manageState: PropTypes.string,
        isUploading: PropTypes.bool,
        startCreating: PropTypes.func,
        startModifying: PropTypes.func,
        startDeleting: PropTypes.func,
        updateFunction: PropTypes.func,
        setSuperiorFunctionOptions: PropTypes.func,
        startUpload: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleUploadClick = () => {
        this.props.startUpload();
    }

    handleCreateClick = () => {
        this.props.startCreating();
        this.props.setSuperiorFunctionOptions(this.props.firstFunctions);
    }

    handleModifyClick = (functionId, superiorId) => {
        this.props.startModifying(functionId, superiorId);
    }

    handleDeleteClick = (functionId) => {
        this.props.startDeleting(functionId);
    }

    handleFinishClick = () => {
        this.props.updateFunction(this.props.projectId, this.props.firstFunctions, this.props.secondFunctions);
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

        let uploadForm;
        if(this.props.isUploading){
            uploadForm = (
                <UploadForm />
            );
        }else{
            uploadForm = null;
        }

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

        let updateFailedMessage;
        if(this.props.failed === 'updateFunction'){
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
                {uploadForm}
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
                </form>
                {updateFailedMessage}
                <Button content={'创建新功能'} onClick={this.handleCreateClick}/>
                <Button icon='upload' onClick={this.handleUploadClick}/>
                <Button content={'完成'} onClick={this.handleFinishClick} style={{float: 'right'}}/>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId,
    firstFunctions: state._projectFunction.firstFunctions,
    secondFunctions: state._projectFunction.secondFunctions,
    manageState: state._projectFunction.manageState,
    isUploading: state._projectFunction.isUploading,
    failed: state._userReducer.failed,
    successful: state._userReducer.succesful,
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
    updateFunction: (projectId, firstFunctions, secondFunctions) => {
        dispatch(updateFunction(projectId, firstFunctions, secondFunctions));
    },
    setSuperiorFunctionOptions: (functions) => {
        dispatch(setSuperiorFunctionOptions(functions));
    },
    startUpload: () => {
        dispatch(startUploading());
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFunctionManage);