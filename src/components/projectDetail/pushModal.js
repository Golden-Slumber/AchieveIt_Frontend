import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelHourModal,
    cancelPushing, changeChoice,
    changeVerifyState,
    judgeWorkingHour,
    pushProject,
    setProjectState
} from "../../redux/actions";
import Radio from "semantic-ui-react/dist/commonjs/addons/Radio";
import {propTypes} from "react-csv/src/metaProps";
import {closeFailed} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class PushModal extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        projectState: PropTypes.string,
        choice: PropTypes.string,
        cancelPushing: PropTypes.func,
        pushProject: PropTypes.func,
        changeChoice: PropTypes.func,
        failed: PropTypes.string,
        closeFailed: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        let result;
        if(this.props.projectState === 'Rejected'){
            result = 'Applied';
        }else if(this.props.projectState === 'Applied'){
            if(this.props.choice === 'true'){
                result = 'Initiated';
            }else{
                result = 'Rejected';
            }
        }else if(this.props.projectState === 'Initiated'){
            result = 'Developing';
        }else if(this.props.projectState === 'Developing'){
            result = 'Delivered';
        }else if(this.props.projectState === 'Delivered'){
            result = 'Finished';
        }else if(this.props.projectState === 'Finished' || this.props.projectState === 'ArchiveDeclined'){
            result = 'ReadyArchive';
        }else{
            if(this.props.choice === 'true'){
                result = 'Archived';
            }else{
                result = 'ArchiveDeclined';
            }
        }
        this.props.pushProject(this.props.projectId, result);
    }

    handleChange = (e, {value}) => {
        this.props.changeChoice(value);
    }

    render() {

        let pushFailMessage;
        if(this.props.failed === 'push'){
            pushFailMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>可能您没有足够的权限。</p>
                </Message>
            );
        }else{
            pushFailMessage = null;
        }

        let choicePart;
        if(this.props.projectState === 'Initiated' || this.props.projectState === 'ReadyArchive'){
            choicePart = (
                <div className="description">
                    <Radio
                        label='不通过'
                        name='radioGroup'
                        value='false'
                        checked={this.props.verifyState === 'false'}
                        onChange={this.handleChange}
                    />
                    <Radio
                        label='通过'
                        name='radioGroup'
                        value='true'
                        checked={this.props.verifyState === 'true'}
                        onChange={this.handleChange}
                    />
                </div>
            );
        }else{
            choicePart = (
                <div className="description">
                    <label>将推进项目{this.props.projectId}的状态</label>
                </div>
            )
        }

        return (
            <div className="ui active modal">
                <div className="header">
                    推进项目状态
                </div>
                <div className="content">
                    {choicePart}
                </div>
                {pushFailMessage}
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelPushing}>
                        取消
                    </div>
                    <div className="ui positive right labeled icon button" onClick={this.handleFinishClick}>
                        确认
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId,
    projectState: state._projectDetail.projectState,
    choice: state._projectDetail.choice,
    failed: state._userReducer.failed
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelPushing: () => {
        dispatch(cancelPushing())
    },
    pushProject: (projectId, projectState) => {
        dispatch(pushProject(projectId, projectState));
    },
    changeChoice: (choice) => {
        dispatch(changeChoice(choice));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PushModal);