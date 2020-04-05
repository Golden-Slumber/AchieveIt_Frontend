import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelFunctionManage,
    changeFunctionDescription, modifyFunction,
    setFunctionId,
    setSuperiorId
} from "../../redux/actions/projectFunctionActions";
import {closeFailed, formFailed} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const options = [
    {key: '1', value: '2', text: '3'},
    {key: '4', value: '5', text: '6'},
    {key: '7', value: '8', text: '9'}
];

export class ModifyModal extends React.Component {

    static propTypes = {
        currentFunctionId: PropTypes.string,
        currentSuperiorId: PropTypes.string,
        currentDescription: PropTypes.string,
        changeFunctionDescription: PropTypes.func,
        modifyFunction: PropTypes.func,
        cancelFunctionManage: PropTypes.func,
        failed: PropTypes.string,
        formFailed: PropTypes.func,
        closeFailed: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        if(this.props.currentDescription === '') {
            this.props.formFailed('modifyFunction');
        }else{
            this.props.modifyFunction(this.props.currentFunctionId, this.props.currentSuperiorId, this.props.currentDescription);
        }
    }

    render() {

        let updateFailedMessage;
        if(this.props.failed === 'modifyFunction'){
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
                    修改功能信息
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>功能ID  {this.props.currentFunctionId}</label>
                            </div>
                            <div className="field">
                                <label>功能描述</label>
                                <input type="text" placeholder={this.props.currentDescription} value={this.props.currentDescription}
                                       onChange={this.props.changeFunctionDescription}/>
                            </div>
                        </form>
                    </div>
                </div>
                {updateFailedMessage}
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelFunctionManage}>
                        取消
                    </div>
                    <div className="ui positive right labeled icon button" onClick={this.handleFinishClick}>
                        完成
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>

        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    currentFunctionId: state._projectFunction.currentFunctionId,
    currentSuperiorId: state._projectFunction.currentSuperiorId,
    currentDescription: state._projectFunction.currentDescription,
    failed: state._userReducer.failed
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeFunctionDescription: (e) => {
        dispatch(changeFunctionDescription(e.target.value));
    },
    modifyFunction: (functionId, superiorId, description) => {
        dispatch(modifyFunction(functionId, superiorId, description));
    },
    cancelFunctionManage: () => {
        dispatch(cancelFunctionManage())
    },
    formFailed: (form) => {
        dispatch(formFailed(form));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyModal);