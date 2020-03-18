import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import {
    logOut
} from "../../redux/actions";
import {closeLoginFail,} from "../../redux/actions/loginActions";
import {connect} from "react-redux";
import history from "../../history";
import {Button, Container, Menu, Segment} from "semantic-ui-react";


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
        isLogin: PropTypes.bool,
        onLogOut: PropTypes.func,
        updateTimeline: PropTypes.func,
        onUpdate: PropTypes.func,
    };

    state = {
        menuFixed: false,
        overlayFixed: false,
    };
    stickTopMenu = () => this.setState({menuFixed: true});
    unStickTopMenu = () => this.setState({menuFixed: false});

    handleIndexClick = () => {
        this.props.switchIndex();
        // if(this.props.isLogin===true)
        // {
        //     let d = new Date();
        //     this.props.updateTimeline(this.props.token, this.props.end.toISOString(), d.toISOString());
        //     this.props.onUpdate(d);
        // }
    };

    render() {
        const {menuFixed, overlayFixed} = this.state;

        let right;
        if (this.props.isLogin) {
            right = (
                <Menu.Menu position='right'>
                    <Menu.Item content={this.props.globalRole} style={MenuItemStyle} />
                    <Menu.Item content={'登出'} onClick={this.props.onLogOut} style={MenuItemStyle}/>
                </Menu.Menu>
            )
        } else {
            right = (
                <Menu.Menu position='right'>
                    <Link to="/login" className='item' style={MenuItemStyle} onClick={this.props.switchLogin}>
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
                        <Link to="/" className='item' onClick={this.props.switchHome}
                              style={MenuItemStyle}>
                            主页
                        </Link>
                        <Link to="/project" className='item' onClick={this.handleIndexClick}
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
    globalRole: state._loginReducer.globalRole,
    token: state._loginReducer.jwtToken
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    switchHome: () => {
        dispatch(closeLoginFail());
    },
    switchIndex: () => {
        dispatch(closeLoginFail());
    },
    switchLogin: () => {
        dispatch(closeLoginFail());
    },
    onLogOut: () => {
        dispatch(logOut());
        history.push('/');
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(StickyMenu);
