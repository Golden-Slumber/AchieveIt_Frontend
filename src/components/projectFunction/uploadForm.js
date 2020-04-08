import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import classNames from 'classnames'
import {
    cancelFunctionManage, cancelUploading,
    changeFunctionDescription, changeUploadData, createFunction,
    setFunctionId, setSuperiorId, uploadFunctions
} from "../../redux/actions/projectFunctionActions";
import CSVReader from 'react-csv-reader';
import Files from 'react-files';
import Dropzone from 'react-dropzone';
import {closeFailed, formFailed} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const parseOptions = {
    header: true,
    skipEmptyLines: true
}

export class UploadForm extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        cancelUpload: PropTypes.func,
        changeUploadData: PropTypes.func,
        uploadFunctions: PropTypes.func,
        failed: PropTypes.string,
        formFailed: PropTypes.func,
        closeFailed: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
            fileName: ''
        };
    }

    onFileDrop(files) {
        this.setState({
            uploadedFile: files[0],
            fileName: files[0].name
        });
        console.log(this.state.uploadedFile);
    }

    handleFinishClick = () => {
        this.props.uploadFunctions(this.props.projectId, this.state.uploadedFile);
    }

    handleFailClick = () => {
        this.props.formFailed('uploadData');
    }

    render() {

        let uploadFailMessage;
        if(this.props.failed === 'uploadData'){
            uploadFailMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查一下您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            uploadFailMessage = null;
        }

        return (

            <div className="ui active modal">
                <div className="header">
                    上传CSV文件
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>注意格式为功能id，功能描述，父功能id。标题为function_id,superior_function_id,function_description</label>
                            </div>
                            <Dropzone
                                onDropAccepted={this.onFileDrop.bind(this)}
                                multiple={false}
                                maxSize={100000}
                                accept={'.csv'}
                                onDropRejected={this.handleFailClick}
                            >
                                {({getRootProps, getInputProps, isDragActive}) => {
                                    return (
                                        <Segment
                                            {...getRootProps()}
                                            className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                                        >
                                            <input {...getInputProps()} />
                                            {
                                                this.state.uploadedFile === null ?
                                                    <p>拖拽或点击此处选择文件上传</p> :
                                                    <p>{this.state.fileName}</p>
                                            }
                                        </Segment>
                                    )
                                }}
                            </Dropzone>
                        </form>
                    </div>
                    {uploadFailMessage}
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelUpload}>
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
    projectId: state._projectDetail.projectId,
    uploadData: state._projectFunction.uploadData,
    failed: state._userReducer.failed
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelUpload: () => {
        dispatch(cancelUploading());
    },
    changeUploadData: (data) => {
        dispatch(changeUploadData(data));
    },
    uploadFunctions: (projectId, uploadData) => {
        dispatch(uploadFunctions(projectId, uploadData));
    },
    formFailed: (form) => {
        dispatch(formFailed(form));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);