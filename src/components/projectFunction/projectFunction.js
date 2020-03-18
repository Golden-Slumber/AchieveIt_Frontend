import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Grid, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {functionManaging} from "../../redux/actions/projectFunctionActions";
import ProjectFunctionManage from "./projectFunctionManage";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectFunction extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        firstFunctions: PropTypes.array,
        secondFunctions: PropTypes.array,
        isManaging: PropTypes.bool,
        startFunctionManaging: PropTypes.func
    };

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

        let mainBody;
        if (!this.props.isManaging) {
            mainBody = (
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
                    <Button content={'修改项目功能'} onClick={this.props.startFunctionManaging}/>
                    <Button.Group basic size='small' style={{float: 'right'}}>
                        <Button icon='upload' />
                        <Button icon='download' />
                    </Button.Group>
                </form>
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
                            <div className="ui tabular menu">
                                <Link to={'/projectDetail'}>
                                    <a className="item">项目信息 </a>
                                </Link>
                                <Link to={'/projectMember'}>
                                    <a className="item">项目成员 </a>
                                </Link>
                                <Link to={'/projectFunction'}>
                                    <a className="item active">项目功能 </a>
                                </Link>
                                <Link to={'/projectHour'}>
                                    <a className="item">项目工时</a>
                                </Link>
                                <Link to={'/projectDevice'}>
                                    <a className="item">项目设备 </a>
                                </Link>
                                <Link to={'/projectRisk'}>
                                    <a className="item">项目风险 </a>
                                </Link>
                                <Link to={'/projectDefect'}>
                                    <a className="item">项目缺陷 </a>
                                </Link>
                            </div>


                            {mainBody}

                        </Segment>
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId,
    firstFunctions: state._projectFunction.firstFunctions,
    secondFunctions: state._projectFunction.secondFunctions,
    isManaging: state._projectFunction.isManaging,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startFunctionManaging: () => {
        dispatch(functionManaging());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFunction);