import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import {
    changeKeyword, changeProjectPage,
    getRelativeProjects, getRelativeProjectsbyStatus,
    logOut
} from "../../redux/actions";
import {connect} from "react-redux";
import history from "../../history";
import {Button, Container, Menu, Segment} from "semantic-ui-react";
import currentPage from "../../redux/reducers/currentPageReducer";


const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '-1em',
    marginTop: '-1em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
    backgroundColor: '#1BB394',
};

const fixedMenuStyle = {
    border: '0px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#1BB394',

};

const MenuItemStyle =
    {
        color: '#E5FFFB',
    };


export class StickyMenu extends React.Component {
    static propTypes = {
        token: PropTypes.string,
        end: PropTypes.string,
        globalRole: PropTypes.string,
        username: PropTypes.string,
        isLogin: PropTypes.bool,
        currentPage: PropTypes.number,
        changeProjectPage: PropTypes.func,
        onLogOut: PropTypes.func,
        changeKeyword: PropTypes.func,
        getRelativeProjects: PropTypes.func,
        getRelativeProjectsbyStatus: PropTypes.func
    };

    state = {
        menuFixed: false,
        overlayFixed: false,
    };
    stickTopMenu = () => this.setState({menuFixed: true});
    unStickTopMenu = () => this.setState({menuFixed: false});

    handleProjectClick = () => {
        if(this.props.globalRole === 'ProjectSuperior'){
            this.props.getRelativeProjectsbyStatus('Applied');
        }else if(this.props.globalRole === 'ConfigurationManager'){
            this.props.getRelativeProjectsbyStatus('ReadyArchive');
        }else if(this.props.globalRole === 'QaManager' || this.props.globalRole === 'EpgManager'){
            this.props.getRelativeProjectsbyStatus('Initiated');
        }else{
            this.props.changeProjectPage(1);
            console.log(this.props.currentPage);
            this.props.getRelativeProjects(this.props.currentPage);
            this.props.changeKeyword('');
        }
    }

    render() {
        const {menuFixed, overlayFixed} = this.state;

        let right;
        if (this.props.isLogin) {
            right = (
                <Menu.Menu position='right'>
                    <Menu.Item content={'您好 '+this.props.globalRole+' '+this.props.username} style={MenuItemStyle} />
                    <Menu.Item content={'登出'} onClick={this.props.onLogOut} style={MenuItemStyle}/>
                </Menu.Menu>
            )
        } else {
            right = (
                <Menu.Menu position='right'>
                    <Link to="/login" className='item' style={MenuItemStyle}>
                        登录
                    </Link>
                </Menu.Menu>
            )
        }

        return (
            <Segment vertical>
                <Menu boardless fixed={menuFixed ? 'top' : undefined}
                      style={menuFixed ? fixedMenuStyle : menuStyle}>
                    <Container text>
                        <Link to="/" className='item'
                              style={MenuItemStyle}>
                            主页
                        </Link>
                        <Link to="/project" className='item' onClick={this.handleProjectClick}
                              style={MenuItemStyle}>
                            项目
                        </Link>
                        {right}
                    </Container>
                </Menu>
            </Segment>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    isLogin: state._loginReducer.isLogin,
    globalRole: state._userReducer.globalRole,
    username: state._userReducer.username,
    currentPage: state._projectHome.currentPage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogOut: () => {
        dispatch(logOut());
        history.push('/');
    },
    getRelativeProjects: (currentPage) => {
        dispatch(getRelativeProjects(currentPage));
    },
    changeKeyword: (keyWord) => {
        dispatch(changeKeyword(keyWord));
    },
    changeProjectPage: (currentPage) => {
        dispatch(changeProjectPage(currentPage));
    },
    getRelativeProjectsbyStatus: (status) => {
        dispatch(getRelativeProjectsbyStatus(status))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StickyMenu);
