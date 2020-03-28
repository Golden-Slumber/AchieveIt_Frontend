import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ProjectDetailChange from "./projectDetailChange";
import {startModifying} from "../../redux/actions";
import {getBusinessFields, getCustomers} from "../../redux/actions/dependencyActions";
import ProjectMenu from "../projectMenu/projectMenu";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectDetail extends React.Component {

    static propTypes = {
        globalRole: PropTypes.string,
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
        startModifying: PropTypes.func
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
        if(this.props.globalRole !== 'CommonUser' && !this.props.isModifying){
            pushButton = (
                <Button  content={'推进项目状态'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}}/>
            );
        }else{
            pushButton = null;
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

                            {mainBody}
                        </Segment>

                        {pushButton}
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    globalRole: state._userReducer.globalRole,
    projectId: state._projectDetail.projectId,
    projectName: state._projectDetail.projectName,
    customer: state._projectDetail.customer,
    startTime: state._projectDetail.startTime,
    endTime: state._projectDetail.endTime,
    milestone: state._projectDetail.milestone,
    mainTech:state._projectDetail.mainTech,
    businessField: state._projectDetail.businessField,
    mainFunction: state._projectDetail.mainFunction,
    isModifying: state._projectDetail.isModifying
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startModifying: () => {
        dispatch(startModifying());
        dispatch(getCustomers());
        dispatch(getBusinessFields());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);