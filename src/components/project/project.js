import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    changeKeyword,
    changeProjectPage,
    getProjectDetail,
    getRelativeProjects,
    searchProject, setProjectState
} from "../../redux/actions";
import {setProjectId} from "../../redux/actions";
import currentPage from "../../redux/reducers/currentPageReducer";
import {getBusinessFields, getCustomers, getProjectIds} from "../../redux/actions/dependencyActions";
import {closeFailed} from "../../redux/actions/userActions";

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
        currentPage: PropTypes.number,
        more: PropTypes.bool,
        changeKeyword: PropTypes.func,
        searchProject: PropTypes.func,
        setProjectId: PropTypes.func,
        changeProjectPage: PropTypes.func,
        getRelativeProjects: PropTypes.func,
        getDependencyInfos: PropTypes.func,
        getProjectDetail: PropTypes.func,
        setProjectState: PropTypes.func,
        failed: PropTypes.string,
        closeFailed: PropTypes.func,
        formFailed: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            currentKeyWord: ''
        }
    }

    handleSearchClick = () => {
        if(this.props.keyword.length<=0 || this.props.keyword.length>=30){
            this.props.formFailed('search');
        }else{
            this.props.changeProjectPage(1);
            this.props.searchProject(this.props.keyword, this.props.currentPage);
            this.setState({currentKeyWord: this.props.keyword});
        }
    };

    handleProjectClick = (projectId, projectState) => {
        this.props.setProjectId(projectId);
        this.props.getProjectDetail(projectId);
        this.props.setProjectState(projectState);
    }

    handleMoreClick = () => {
        this.props.changeProjectPage(this.props.currentPage+1);
        if(this.state.currentKeyWord === ''){
            this.props.getRelativeProjects(this.props.currentPage);
        }else{
            this.props.searchProject(this.state.currentKeyWord, this.props.currentPage);
        }
    }

    render() {

        let showProjects = this.props.projects.map((item, index) => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={'/projectDetail'} onClick={() => {
                            this.handleProjectClick(item.id, item.status);
                        }}>
                            <Icon name={"arrow right"} style={{color: '#1BB394'}}/>
                        </Link>
                    </td>
                </tr>
            );
        });


        let moreButton;
        if(this.props.more){
            moreButton = (
                <Button  content={'更多'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}} onClick={this.handleMoreClick}/>
            );
        }else{
            moreButton = null;
        }

        let setUpButton;
        if(this.props.globalRole === 'ProjectManager'){
            setUpButton = (
                <Link to={'/setUp'}>
                    <Button  content={'立项'} style={{backgroundColor: '#1BB394', color: '#E5FFFB', float: 'right'}} onClick={this.props.getDependencyInfos}/>
                </Link>
            );
        }else{
            setUpButton = null;
        }

        let searchFailMessage;
        if(this.props.failed === 'search'){
            searchFailMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查一下您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            searchFailMessage = null;
        }

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

                            {setUpButton}
                        </Segment>
                        {searchFailMessage}
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
                        {moreButton}
                    </Container>
                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    globalRole: state._userReducer.globalRole,
    keyword: state._projectHome.keyword,
    projects: state._projectHome.projects,
    currentPage: state._projectHome.currentPage,
    more: state._projectHome.more,
    failed: state._userReducer.failed
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeKeyword: (event) => {
        dispatch(changeKeyword(event.target.value));
    },
    searchProject: (keyword, currentPage) => {
        dispatch(searchProject(keyword, currentPage));
    },
    setProjectId: (projectId) => {
        dispatch(setProjectId(projectId));
    },
    changeProjectPage: (currentPage) => {
        dispatch(changeProjectPage(currentPage));
    },
    getRelativeProjects: (currentPage) => {
        dispatch(getRelativeProjects(currentPage));
    },
    getDependencyInfos: () => {
        dispatch(getProjectIds());
        dispatch(getCustomers());
        dispatch(getBusinessFields());
    },
    getProjectDetail: (projectId) => {
        dispatch(getProjectDetail(projectId));
    },
    setProjectState: (projectState) => {
        dispatch(setProjectState(projectState))
    },
    closeFailed: () => {
        dispatch(closeFailed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);