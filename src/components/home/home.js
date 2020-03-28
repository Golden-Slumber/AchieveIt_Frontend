import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import {switchIndex,} from "../../redux/actions";
import {connect} from "react-redux";
import {Button, Container, Header, Icon, Transition, Segment} from "semantic-ui-react";
import {closeIllegalAccess} from "../../redux/actions/pageSwitchActions";

const globalStyles = {
    height: '85vh',
    backgroundColor: '#efefef'
};

export class Home extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        illegal: PropTypes.bool,
        closeIllegalAccess: PropTypes.func,
        isLogin: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state =
            {
                visible: false
            }
    }

    componentDidMount() {
        this.setState({visible: true});
    }

    render() {
        return (
            <Transition visible={this.state.visible} animation={'fade down'} during={1000}>
                <Segment vertical style={globalStyles}>
                    {
                        (this.props.illegal === true)&&(this.props.isLogin === false) ?
                            <div className={'ui floating message'} >
                                <i className={'close icon'} onClick={this.props.closeIllegalAccess}/>
                                <p>请先登录.</p>
                            </div>: null
                    }
                    <Container text style={{margin: '7em 0em 0em 0em', color: '#7f7f7f'}}>
                        <Header as={'h1'} content={'AchieveIt'} style={{fontSize: '4em', color: '#7f7f7f'}}/>
                        <Header as={'h2'} content={'软件项目管理平台'}
                                style={{margin: '1em 0em 5em 0em', color: '#7f7f7f'}}/>
                        <Button as={Link} to="/project" size={'huge'}
                                style={{backgroundColor: '#1BB394', color: '#E5FFFB'}}>
                            开始使用
                            <Icon name={"arrow right"}/>
                        </Button>
                    </Container>
                </Segment>
            </Transition>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    illegal: state._currentPage.illegal,
    isLogin: state._loginReducer.isLogin
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    closeIllegalAccess: () => {
        dispatch(closeIllegalAccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);