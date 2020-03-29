import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {cancelHourModal, changeVerifyState, judgeWorkingHour} from "../../redux/actions";
import Radio from "semantic-ui-react/dist/commonjs/addons/Radio";


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
        changeVerifyState: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.judgeWorkingHour(this.props.projectId, this.props.currentWorkingHourId, this.props.verifyState);
    }

    handleChange = (e, {value}) => {
        this.props.changeVerifyState(value);
    }

    render() {

        return (
            <div className="ui active modal">
                <div className="header">
                    审核工时记录
                </div>
                <div className="content">
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
    currentWorkingHourId: state._projectHour.currentWorkingHourId
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyModal);