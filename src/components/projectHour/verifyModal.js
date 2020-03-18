import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {cancelHourModal, changeVerifyState, judgeWorkingHour} from "../../redux/actions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class VerifyModal extends React.Component {

    static propTypes = {
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
        this.props.judgeWorkingHour(this.props.currentWorkingHourId);
    }

    render() {

        return (
            <div className="ui active modal">
                <div className="header">
                    审核工时记录
                </div>
                <div className="content">
                    <div className="description">
                        <div className="ui slider checkbox">
                            <input type="checkbox" name="newsletter" onClick={this.props.changeVerifyState}/>
                            <label>审核通过</label>
                        </div>
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
    verifyState: state._projectHour.verifyState,
    currentWorkingHourId: state._projectHour.currentWorkingHourId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelHourModal: () => {
        dispatch(cancelHourModal())
    },
    judgeWorkingHour: (currentWorkingHourId) => {
        dispatch(judgeWorkingHour(currentWorkingHourId));
    },
    changeVerifyState: (e) => {
        dispatch(changeVerifyState(e.target.value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyModal);