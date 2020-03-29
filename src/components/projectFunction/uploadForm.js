import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
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
        uploadFunctions: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
        };
    }

    onFileDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        console.log(this.state.uploadedFile);
    }

    handleFinishClick = () => {
        this.props.uploadFunctions(this.props.projectId, this.state.uploadedFile);
    }

    render() {

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
                            {/*<CSVReader*/}
                            {/*    cssClass="csv-reader-input"*/}
                            {/*    onFileLoaded={this.handleFileloaded}*/}
                            {/*    onError={console.log('error')}*/}
                            {/*    parserOptions={parseOptions}*/}
                            {/*    fileEncoding='GB18030'*/}
                            {/*    inputId="ObiWan"*/}
                            {/*    inputStyle={{color: 'red'}}*/}
                            {/*/>*/}
                            <Dropzone
                                onDropAccepted={this.onFileDrop.bind(this)}
                                multiple={false}
                                maxSize={100000}
                                accept={'.csv'}
                                onDropRejected={() => {
                                    alert('rejected!');
                                }}
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
                                                    <p>Try dropping some files here, or click to select files to upload(less than 1 MB).</p> :
                                                    <p>upload.</p>
                                            }
                                        </Segment>
                                    )
                                }}
                            </Dropzone>
                        </form>
                    </div>
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
    uploadData: state._projectFunction.uploadData
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);