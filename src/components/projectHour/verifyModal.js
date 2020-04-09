import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {cancelHourModal, changeVerifyState, judgeWorkingHour} from "../../redux/actions/projectHourActions";
import Radio from "semantic-ui-react/dist/commonjs/addons/Radio";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class VerifyModal extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        currentWorkingHourId: PropTypes.string,
        verifyState: PropTypes.string,
        cancelHourModal: PropTypes.func,
        judgeWorkingHour: PropTypes.func,
        changeVerifyState: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        console.log(this.props.currentWorkingHourId);
        this.props.judgeWorkingHour(this.props.projectId, this.props.currentWorkingHourId, this.props.verifyState);
    }

    handleChange = (e, {value}) => {
        this.props.changeVerifyState(value);
    }

    render() {

        let updateFailedMessage;
        if(this.props.failed === 'verifyWorkHour'){
            updateFailedMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查一下您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            updateFailedMessage = null;
        }

        return (
            <div className="ui active modal">
                <div className="header">
                    审核工时记录
                </div>
                <div className="content">
                    <div className="description">
                        <Form>
                            <Form.Field>
                                <Radio
                                    label='不通过'
                                    name='radioGroup'
                                    value='false'
                                    checked={this.props.verifyState === 'false'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='通过'
                                    name='radioGroup'
                                    value='true'
                                    checked={this.props.verifyState === 'true'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </div>
                    {updateFailedMessage}
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelHourModal}>
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
    verifyState: state._projectHour.verifyState,
    currentWorkingHourId: state._projectHour.currentWorkingHourId,
    failed: state._userReducer.failed,
    successful: state._userReducer.successful
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelHourModal: () => {
        dispatch(cancelHourModal())
    },
    judgeWorkingHour: (projectId, currentWorkingHourId, verifyState) => {
        dispatch(judgeWorkingHour(projectId, currentWorkingHourId, verifyState));
    },
    changeVerifyState: (verifyState) => {
        dispatch(changeVerifyState(verifyState));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyModal);