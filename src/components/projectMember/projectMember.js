import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {startManaging, updateMember} from "../../redux/actions/projectMemberActions";
import ProjectMemberManage from "./projectMemberManage";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectMember extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        members: PropTypes.array,
        isManaging: PropTypes.bool,
        startManaging: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleManageClick = () => {
        this.props.startManaging();
    }

    render() {

        let showMembers = this.props.members.map((item, index) => {
            let roles = item.projectRolesId.join(", ");
            return (
                <tr>
                    <td>{item.userId}</td>
                    <td>{item.superiorId}</td>
                    <td>{roles}</td>
                </tr>
            );
        });

        let mainBody;
        if(!this.props.isManaging){
            mainBody = (
                <div>
                    <table className="ui fixed single line celled table">
                        <thead>
                        <tr>
                            <th>成员ID</th>
                            <th>上级</th>
                            <th>角色</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showMembers}
                        </tbody>
                    </table>
                    <Button content={'修改项目人员信息'} onClick={this.handleManageClick}/>
                </div>
            );
        }else{
            mainBody = (
                <ProjectMemberManage />
            );
        }

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container className='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <div className="ui tabular menu">
                                <Link to={'/projectDetail'}>
                                    <a className="item">项目信息 </a>
                                </Link>
                                <Link to={'/projectMember'}>
                                    <a className="item active">项目成员 </a>
                                </Link>
                                <Link to={'/projectFunction'}>
                                    <a className="item">项目功能 </a>
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
    members: state._projectMember.members,
    isManaging: state._projectMember.isManaging
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startManaging: () => {
        dispatch(startManaging());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMember);