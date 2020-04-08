import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Dropdown, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ProjectMenu from "../projectMenu/projectMenu";
import {closeFailed} from "../../redux/actions/userActions";
import {cancelChangeUrl, changeCurrentUrl, changeUrl, startChangeUrl} from "../../redux/actions/projectDefectActions";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectDefect extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        url: PropTypes.string,
        failed: PropTypes.string,
        closeFailed: PropTypes.func,
        isChanging: PropTypes.bool,
        startChangeUrl: PropTypes.func,
        cancelChangeUrl: PropTypes.func,
        changeUrl: PropTypes.func,
        changeCurrentUrl: PropTypes.func,
        currentUrl: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.changeUrl(this.props.projectId, this.props.currentUrl);
    }

    render() {

        let defectFailMessage;
        if(this.props.failed === 'defect'){
            defectFailMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>可能您没有足够的权限。</p>
                </Message>
            );
        }else{
            defectFailMessage = null;
        }

        let changeUrlFailMessage;
        if(this.props.failed === 'changeUrl'){
            changeUrlFailMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            changeUrlFailMessage = null;
        }

        let mainBody;
        if(this.props.isChanging){
            mainBody = (
                <div>
                    <Segment>
                        <form className="ui form">
                            <div className="field">
                                <label>缺陷系统地址</label>
                                <input type="text" placeholder="缺陷系统地址" value={this.props.currentUrl}
                                       onChange={this.props.changeCurrentUrl}/>
                            </div>
                        </form>
                    </Segment>
                    {changeUrlFailMessage}
                    <Button content={'取消'} onClick={this.props.cancelChangeUrl}/>
                    <Button content={'完成'} style={{float: 'right'}} onClick={this.handleFinishClick}/>
                </div>
            );
        }else{
            mainBody = (
                <div>
                    <Segment >
                        <label>缺陷系统地址：{this.props.url === '' ? '暂无' : this.props.url}</label>
                    </Segment>
                    <Button content={'修改外挂缺陷系统地址'} style={{float: 'right'}} onClick={this.props.startChangeUrl}/>
                </div>
            );
        }

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container className='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <ProjectMenu />
                            {defectFailMessage}
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
    url: state._projectDefect.url,
    failed: state._userReducer.failed,
    isChanging: state._projectDefect.isChanging,
    currentUrl: state._projectDefect.currentUrl
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    closeFailed: () => {
        dispatch(closeFailed());
    },
    startChangeUrl: () => {
        dispatch(startChangeUrl());
    },
    cancelChangeUrl: () => {
        dispatch(cancelChangeUrl());
    },
    changeUrl: (projectId, url) => {
        dispatch(changeUrl(projectId, url));
    },
    changeCurrentUrl: (e) => {
        dispatch(changeCurrentUrl(e.target.value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDefect);