import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ProjectDetailChange from "./projectDetailChange";
import {startModifying, startPushing} from "../../redux/actions";
import {getBusinessFields, getCustomers} from "../../redux/actions/dependencyActions";
import ProjectMenu from "../projectMenu/projectMenu";
import PushModal from "./pushModal";
import {closeSuccess} from "../../redux/actions/userActions";

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
        closeSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        let modifybutton;
        if(this.props.globalRole === 'ProjectManager'){
            modifybutton = (
                <Button content={'修改项目信息'} onClick={this.props.startModifying}/>
            );
        }else{
            modifybutton = null;
        }

        let pushButton;
        if(!this.props.isModifying){
            if(this.props.globalRole === 'ProjectManager'){
                if(this.props.projectState !== 'Applied' && this.props.projectState !== 'ReadyArchive' && this.props.projectState !== 'Archived'){
                    pushButton = (
                        <Button  content={'推进项目状态'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}} onClick={this.props.startPushing}/>
                    );
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
            pushSuccessMessage = null
        }

        let mainBody;
        if(!this.props.isModifying) {
            mainBody = (
                <div>
                    <table className="ui fixed single line celled table">
                        <tbody>
                        <tr>
                            <td>项目名</td>
                            <td>{this.props.projectName}</td>
                        </tr>
                        <tr>
                            <td>客户信息</td>
                            <td>{this.props.customer}</td>
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
                            <td>{this.props.businessField}</td>
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
                    <Container clssName='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <ProjectMenu />
                            {pushModal}
                            {mainBody}
                        </Segment>
                        {pushSuccessMessage}
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
    successful: state._userReducer.successful
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);