import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ProjectDetailChange from "./projectDetailChange";
import {confirmConfiguration, startModifying, startPushing} from "../../redux/actions";
import {getBusinessFields, getCustomers} from "../../redux/actions/dependencyActions";
import ProjectMenu from "../projectMenu/projectMenu";
import PushModal from "./pushModal";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";
import history from "../../history";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectDetail extends React.Component {

    static propTypes = {
        globalRole: PropTypes.string,
        projectState: PropTypes.string,
        projectId: PropTypes.string,
        projectName: PropTypes.string,
        customer: PropTypes.string,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        milestone: PropTypes.string,
        mainTech: PropTypes.string,
        businessField: PropTypes.string,
        mainFunction: PropTypes.string,
        isModifying: PropTypes.bool,
        startModifying: PropTypes.func,
        isPushing: PropTypes.bool,
        startPushing: PropTypes.func,
        successful: PropTypes.string,
        closeSuccess: PropTypes.func,
        confirmConfiguration: PropTypes.func,
        failed: PropTypes.string,
        closeFailed: PropTypes.func,
        firstFunctions: PropTypes.array,
        customersOptions: PropTypes.array,
        businessFieldsOptions: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    handleConfirmClick = () => {
        this.props.confirmConfiguration(this.props.projectId);
    }

    render() {

        if(this.props.failed === 'getProjectDetail'){
            history.push('/project');
        }

        let modifybutton;
        if(this.props.globalRole === 'ProjectManager'){
            modifybutton = (
                <Button content={'修改项目信息'} onClick={this.props.startModifying}/>
            );
        }else{
            modifybutton = null;
        }

        let confirmButton;
        if(this.props.globalRole === 'ConfigurationManager' && this.props.projectState === 'Initiated'){
            confirmButton = (
              <Button content={'确认项目配置库'} style={{backgroundColor: '#1BB394', color: '#E5FFFB'}} onClick={this.handleConfirmClick}/>
            );
        }else{
            confirmButton = null;
        }

        let pushButton;
        if(!this.props.isModifying){
            if(this.props.globalRole === 'ProjectManager'){
                if(this.props.projectState !== 'Applied' && this.props.projectState !== 'ReadyArchive' && this.props.projectState !== 'Archived'){
                    if(this.props.projectState === 'Initiated'){
                        if(this.props.firstFunctions.length!==0){
                            pushButton = (
                                <Button  content={'推进项目状态'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}} onClick={this.props.startPushing}/>
                            );
                        }
                    }else{
                        pushButton = (
                            <Button  content={'推进项目状态'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}} onClick={this.props.startPushing}/>
                        );
                    }
                }
            }else if(this.props.globalRole === 'ProjectSuperior'){
                if(this.props.projectState === 'Applied'){
                    pushButton = (
                        <Button  content={'推进项目状态'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}} onClick={this.props.startPushing}/>
                    );
                }
            }else if(this.props.globalRole === 'ConfigurationManager'){
                if(this.props.projectState === 'ReadyArchive'){
                    pushButton = (
                        <Button  content={'推进项目状态'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}} onClick={this.props.startPushing}/>
                    );
                }
            }else{
                pushButton = null;
            }
        }else{
            pushButton = null;
        }

        let pushModal;
        if(this.props.isPushing){
            pushModal = (
                <PushModal />
            );
        }else{
            pushModal = null;
        }

        let pushSuccessMessage;
        if(this.props.successful === 'push'){
            pushSuccessMessage = (
                <Message positive={true}>
                    <i className={'close icon'} onClick={this.props.closeSuccess}/>
                    <div className={'header'}>推进成功</div>
                    <p>项目状态已被成功更新。</p>
                </Message>
            );
        }else{
            pushSuccessMessage = null;
        }

        let confirmSuccessMessage;
        if(this.props.successful === 'confirm'){
            confirmSuccessMessage = (
                <Message positive={true}>
                    <i className={'close icon'} onClick={this.props.closeSuccess}/>
                    <div className={'header'}>确认成功</div>
                    <p>项目配置库已完成配置。</p>
                </Message>
            );
        }else{
            confirmSuccessMessage = null;
        }

        let confirmFailedMessage;
        if(this.props.failed === 'confirm'){
            confirmFailedMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>项目配置库未能完成确认。</p>
                </Message>
            );
        }else{
            confirmFailedMessage = null;
        }

        let mainBody;
        if(!this.props.isModifying) {

            let showCustomer = this.props.customer;
            for (let i=0; i<this.props.customersOptions.length; i++){
                if(this.props.customersOptions[i].value === this.props.customer){
                    showCustomer = this.props.customersOptions[i].text;
                    break;
                }
            }
            console.log(this.props.businessFieldsOptions);
            let showBusinessField = this.props.businessField;
            for(let i=0; i<this.props.businessFieldsOptions.length; i++){
                if(this.props.businessFieldsOptions[i].value === this.props.businessField){
                    showBusinessField = this.props.businessFieldsOptions[i].text;
                    break;
                }
            }

            mainBody = (
                <div>
                    <table className="ui fixed single line celled table">
                        <tbody>
                        <tr>
                            <td>项目状态</td>
                            <td>{this.props.projectState}</td>
                        </tr>
                        <tr>
                            <td>项目名</td>
                            <td>{this.props.projectName}</td>
                        </tr>
                        <tr>
                            <td>客户信息</td>
                            <td>{showCustomer}</td>
                        </tr>
                        <tr>
                            <td>开始时间</td>
                            <td>{this.props.startTime}</td>
                        </tr>
                        <tr>
                            <td>结束时间</td>
                            <td>{this.props.endTime}</td>
                        </tr>
                        <tr>
                            <td>里程碑</td>
                            <td>{this.props.milestone}</td>
                        </tr>
                        <tr>
                            <td>主要技术</td>
                            <td>{this.props.mainTech}</td>
                        </tr>
                        <tr>
                            <td>业务领域</td>
                            <td>{showBusinessField}</td>
                        </tr>
                        <tr>
                            <td>主要功能</td>
                            <td>{this.props.mainFunction}</td>
                        </tr>
                        </tbody>
                    </table>

                    {modifybutton}
                </div>
            );
        }else{
            mainBody = (
                <ProjectDetailChange />
            );
        }


        return (

            <div>
                <Segment style={globalStyles}>
                    <Container className='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>
                        <h1 className="ui header">{this.props.projectId}</h1>
                        <Segment style={{minHeight: '30em'}}>
                            <ProjectMenu />
                            {pushModal}
                            {mainBody}
                        </Segment>
                        {pushSuccessMessage}
                        {confirmSuccessMessage}
                        {confirmFailedMessage}
                        {confirmButton}
                        {pushButton}
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    globalRole: state._userReducer.globalRole,
    projectState: state._projectDetail.projectState,
    projectId: state._projectDetail.projectId,
    projectName: state._projectDetail.projectName,
    customer: state._projectDetail.customer,
    startTime: state._projectDetail.startTime,
    endTime: state._projectDetail.endTime,
    milestone: state._projectDetail.milestone,
    mainTech:state._projectDetail.mainTech,
    businessField: state._projectDetail.businessField,
    mainFunction: state._projectDetail.mainFunction,
    isModifying: state._projectDetail.isModifying,
    isPushing: state._projectDetail.isPushing,
    successful: state._userReducer.successful,
    failed: state._userReducer.failed,
    firstFunctions: state._projectFunction.firstFunctions,
    customersOptions: state._projectDependency.customersOptions,
    businessFieldsOptions: state._projectDependency.businessFieldsOptions
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startModifying: () => {
        dispatch(startModifying());
        dispatch(getCustomers());
        dispatch(getBusinessFields());
    },
    startPushing: () => {
        dispatch(startPushing())
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    },
    closeFailed: () => {
        dispatch(closeFailed())
    },
    confirmConfiguration: (projectId) => {
        dispatch(confirmConfiguration(projectId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);