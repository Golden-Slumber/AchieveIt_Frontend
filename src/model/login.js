import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Form, Grid, Header, Icon, Message, Segment, Transition} from "semantic-ui-react";
import SubmitButton from "./SubmitButton";
import {
    changePassword,
    changeUsername
} from "../redux/actions";
import {closeLoginFail} from "../redux/actions/loginActions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {closeFailed} from "../redux/actions/userActions";


export class LoginForm extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        password: PropTypes.string,
        isLogin: PropTypes.bool,
        failed: PropTypes.string,
        onChangeUsername: PropTypes.func,
        onChangePassword: PropTypes.func,
        onLogin: PropTypes.func,
        closeFailed: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state =
            {
                visible: false,
                errorOccurs: false
            }
    }

    componentDidMount() {
        this.setState({visible: true});
    }

    render() {

        let loginFailMessage;
        if(this.props.failed === 'login'){
            loginFailMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查一下您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            loginFailMessage = null;
        }

        return (

            <Transition visible={this.state.visible} animation={'fade down'} during={1000}>
                <Segment className={'login-form'}>
                    <style>{`
	  body > div,
	  body > div > div,
	  body > div > div > div.login-form {
	    height: 100%;
	  }
	`}</style>
                    <Grid textAlign={'center'} verticalAlign={'middle'} style={{height: '100%'}}>
                        <Grid.Column style={{maxWidth: 400}}>
                            <Header as={'h2'} style={{color: '#1BB394'}} textAlign={'center'}>
                                登录
                            </Header>
                            <Form className='attached fluid segment'>
                                <Segment raised>
                                    <Message error visible={this.state.errorOccurs}
                                             header={'Ehh... Something went wrong?'}
                                             list={['Take a look at the username and the password. Make sure they are correct.']}/>

                                    <Form.Input fluid icon={'user'} iconPosition={'left'}
                                                placeholder={'用户名'} error={this.state.errorOccurs}
                                                value={this.props.username} onChange={this.props.onChangeUsername}/>
                                    <Form.Input fluid icon={'lock'} iconPosition={'left'}
                                                placeholder={'密码'} type={'password'}
                                                error={this.state.errorOccurs}
                                                value={this.props.password} onChange={this.props.onChangePassword}/>
                                    <SubmitButton name={'Login'} expireTime={2}/>
                                </Segment>
                            </Form>
                            {loginFailMessage}
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Transition>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    username: state._loginReducer.username,
    password: state._loginReducer.password,
    isLogin: state._loginReducer.isLogin,
    failed: state._userReducer.failed
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeUsername: (event) => {
        dispatch(changeUsername(event.target.value))
    },
    onChangePassword: (event) => {
        dispatch(changePassword(event.target.value))
    },
    closeFailed: () => {
        dispatch(closeFailed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);