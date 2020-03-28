import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelFunctionManage, cancelUploading,
    changeFunctionDescription, createFunction,
    setFunctionId, setSuperiorId
} from "../../redux/actions/projectFunctionActions";
import CSVReader from 'react-csv-reader'

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
}

export class UploadForm extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        cancelUpload: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {

    }

    handleFileloaded = () => {

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
                            <CSVReader
                                cssClass="csv-reader-input"
                                label="Select CSV with secret Death Star statistics"
                                onFileLoaded={this.handleFileloaded}
                                onError={console.log('error')}
                                parserOptions={parseOptions}
                                inputId="ObiWan"
                                inputStyle={{color: 'red'}}
                            />
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
    projectId: state._projectDetail.projectId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelUpload: () => {
        dispatch(cancelUploading());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);