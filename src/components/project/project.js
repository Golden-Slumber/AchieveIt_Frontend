import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {changeKeyword, searchProject} from "../../redux/actions";
import {setProjectId} from "../../redux/actions";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class Project extends React.Component{

    static propTypes = {
        globalRole: PropTypes.string,
        keyword: PropTypes.string,
        projects: PropTypes.array,
        changeKeyword: PropTypes.func,
        searchProject: PropTypes.func,
        setProjectId: PropTypes.func
    };

    handleSearchClick = () => {
        this.props.searchProject(this.props.keyword);
    };

    handleProjectClick = (projectId) => {
        this.props.setProjectId(projectId);
    }

    render() {

        let showProjects = this.props.projects.map((item, index) => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={'/projectDetail'} onClick={this.handleProjectClick(item.id)}>
                            <Icon name={"arrow right"} style={{color: '#1BB394'}}/>
                        </Link>
                    </td>
                </tr>
            );
        });

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container className="main ui">
                        <Segment horizontal style={{margin: '10px, 0px, 10px, 0px'}}>
                            <div className="ui action input">
                                <input type="text" placeholder="查找..." value={this.props.keyword} onChange={this.props.changeKeyword}/>
                                <button className="ui icon button" onClick={this.handleSearchClick}>
                                    <i className="search icon"></i>
                                </button>
                            </div>

                            <Link to={'/setUp'}>
                                <Button  content={'立项'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}}/>
                            </Link>
                        </Segment>
                        <table className="ui single line table" style={{margin: '10px, 0px, 0px, 0px'}}>
                            <thead>
                            <tr>
                                <th>项目ID</th>
                                <th>项目名</th>
                                <th>状态</th>
                                <th>详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            {showProjects}
                            </tbody>
                        </table>
                    </Container>
                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    globalRole: state._loginReducer.globalRole,
    keyword: state._projectHome.keyword,
    projects: state._projectHome.projects
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeKeyword: (event) => {
        dispatch(changeKeyword(event.target.value));
    },
    searchProject: (keyword) => {
        dispatch(searchProject(keyword));
    },
    setProjectId: (projectId) => {
        dispatch(setProjectId(projectId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);