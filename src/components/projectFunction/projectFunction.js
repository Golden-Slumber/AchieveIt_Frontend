import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Grid, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {functionManaging, startUploading} from "../../redux/actions/projectFunctionActions";
import ProjectFunctionManage from "./projectFunctionManage";
import ProjectMenu from "../projectMenu/projectMenu";
import UploadForm from "./uploadForm";
import { CSVLink, CSVDownload } from "react-csv";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectFunction extends React.Component {

    static propTypes = {
        globalRole: PropTypes.string,
        projectId: PropTypes.string,
        firstFunctions: PropTypes.array,
        secondFunctions: PropTypes.array,
        isManaging: PropTypes.bool,
        startFunctionManaging: PropTypes.func,
        downloadData: PropTypes.array
    };

    handleDownloadClick = () => {
        console.log(this.props.downloadData);
    }

    render() {

        let showFirstFunctions = this.props.firstFunctions.map((item, index) => {
            return (
                <tr>
                    <td>{item.functionId}</td>
                    <td>{item.functionDescription}</td>
                </tr>
            );
        });
        let showSecondFunctions = this.props.secondFunctions.map((item, index) => {
            return (
                <tr>
                    <td>{item.functionId}</td>
                    <td>{item.functionDescription}</td>
                </tr>
            );
        });

        let manageButton;
        if(this.props.globalRole === 'ProjectManager'){
            manageButton = (
                <div>
                    <Button content={'修改项目功能'} onClick={this.props.startFunctionManaging}/>
                    <CSVLink  data={this.props.downloadData}><Button icon='download' onClick={this.handleDownloadClick} style={{float: 'right'}}/></CSVLink>
                </div>
            );
        }else{
            manageButton = null;
        }

        let mainBody;
        if (!this.props.isManaging) {
            mainBody = (
                <div>
                    <form className="ui form">
                        <div className="two fields">
                            <div className="field">
                                <table className="ui celled structured table">
                                    <thead>
                                    <tr>
                                        <th>一级功能</th>
                                        <th>功能描述</th>
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
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {showSecondFunctions}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                    {manageButton}
                </div>
            );
        } else {
            mainBody = (
                <ProjectFunctionManage/>
            );
        }

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container clssName='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <ProjectMenu />
                            {mainBody}

                        </Segment>
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    globalRole: state._userReducer.globalRole,
    projectId: state._projectDetail.projectId,
    firstFunctions: state._projectFunction.firstFunctions,
    secondFunctions: state._projectFunction.secondFunctions,
    isManaging: state._projectFunction.isManaging,
    downloadData: state._projectFunction.downloadData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startFunctionManaging: () => {
        dispatch(functionManaging());
    },
    startUpload: () => {
        dispatch(startUploading());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFunction);