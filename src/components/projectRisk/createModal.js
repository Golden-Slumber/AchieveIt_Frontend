import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelCreating,
    changeRiskCounter,
    changeRiskDescription, changeRiskFrequency,
    changeRiskImpact,
    changeRiskLevel, changeRiskPerson, changeRiskStatus,
    changeRiskType, createRisk
} from "../../redux/actions/projectRiskActions";
import {closeFailed, closeSuccess} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const options = [
    {key: 'PS', value: 'PS', text: 'PS'},
    {key: 'PD', value: 'PD', text: 'PD'},
    {key: 'ST', value: 'ST', text: 'ST'},
    {key: 'CU', value: 'CU', text: 'CU'},
    {key: 'DE', value: 'DE', text: 'DE'},
    {key: 'TE', value: 'TE', text: 'TE'},
    {key: 'BU', value: 'BU', text: 'BU'}
];

export class CreateModal extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        currentType: PropTypes.string,
        currentDescription: PropTypes.string,
        currentLevel: PropTypes.string,
        currentImpact: PropTypes.string,
        currentCountermeasure: PropTypes.string,
        currentStatus: PropTypes.string,
        currentFrequency: PropTypes.string,
        membersOptions: PropTypes.array,
        currentResponsiblePerson: PropTypes.array,
        changeRiskType: PropTypes.func,
        changeRiskDescription: PropTypes.func,
        changeRiskLevel: PropTypes.func,
        changeRiskImpact: PropTypes.func,
        changeRiskCounter: PropTypes.func,
        changeRiskStatus: PropTypes.func,
        changeRiskFrequency: PropTypes.func,
        changeRiskPerson: PropTypes.func,
        createRisk: PropTypes.func,
        cancelCreating: PropTypes.func,
        failed: PropTypes.string,
        successful: PropTypes.string,
        closeFailed: PropTypes.func,
        closeSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        this.props.createRisk(this.props.projectId, this.props.currentType, this.props.currentDescription, this.props.currentLevel, this.props.currentImpact,
            this.props.currentCountermeasure, this.props.currentStatus, this.props.currentFrequency, this.props.currentResponsiblePerson);
    }

    render() {

        let updateFailedMessage;
        if(this.props.failed === 'createRisk'){
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
                    新增风险
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form">
                            <div className="field">
                                <label>风险类型</label>
                                <Dropdown
                                    placeholder='选择风险类型'
                                    fluid
                                    search
                                    selection
                                    options={options}
                                    onChange={this.props.changeRiskType}
                                />
                            </div>
                            <div className="field">
                                <label>风险描述</label>
                                <input type="text" placeholder="描述" onChange={this.props.changeRiskDescription}/>
                            </div>
                            <div className="field">
                                <label>风险级别</label>
                                <input type="text" placeholder="级别" onChange={this.props.changeRiskLevel}/>
                            </div>
                            <div className="field">
                                <label>风险影响度</label>
                                <input type="text" placeholder="影响" onChange={this.props.changeRiskImpact}/>
                            </div>
                            <div className="field">
                                <label>风险应对策略</label>
                                <input type="text" placeholder="应对策略" onChange={this.props.changeRiskCounter}/>
                            </div>
                            <div className="field">
                                <label>风险状态</label>
                                <input type="text" placeholder="状态" onChange={this.props.changeRiskStatus}/>
                            </div>
                            <div className="field">
                                <label>风险跟踪频度</label>
                                <input type="text" placeholder="跟踪频度" onChange={this.props.changeRiskFrequency}/>
                            </div>
                            <div className="field">
                                <label>风险相关者</label>
                                <Dropdown
                                    placeholder='选择相关者'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={this.props.membersOptions}
                                    onChange={this.props.changeRiskPerson}
                                />
                            </div>
                        </form>
                        {updateFailedMessage}
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={this.props.cancelCreating}>
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
    projectId: state._projectDetail.projectId,
    currentType: state._projectRisk.currentType,
    currentDescription: state._projectRisk.currentDescription,
    currentLevel: state._projectRisk.currentLevel,
    currentImpact: state._projectRisk.currentImpact,
    currentCountermeasure: state._projectRisk.currentCountermeasure,
    currentStatus: state._projectRisk.currentStatus,
    currentFrequency: state._projectRisk.currentFrequency,
    currentResponsiblePerson: state._projectRisk.currentResponsiblePerson,
    membersOptions: state._projectRisk.membersOptions,
    failed: state._userReducer.failed,
    successful: state._userReducer.succesful
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRiskType: (e, data) => {
        dispatch(changeRiskType(data.value))
    },
    changeRiskDescription: (e) => {
        dispatch(changeRiskDescription(e.target.value))
    },
    changeRiskLevel: (e) => {
        dispatch(changeRiskLevel(e.target.value))
    },
    changeRiskImpact: (e) => {
        dispatch(changeRiskImpact(e.target.value))
    },
    changeRiskCounter: (e) => {
        dispatch(changeRiskCounter(e.target.value))
    },
    changeRiskStatus: (e) => {
        dispatch(changeRiskStatus(e.target.value))
    },
    changeRiskFrequency: (e) => {
        dispatch(changeRiskFrequency(e.target.value))
    },
    changeRiskPerson: (e, {value}) => {
        dispatch(changeRiskPerson(value))
    },
    createRisk: (projectId, type, description, level, impact, counter, status, frequency, person) => {
        dispatch(createRisk(projectId, type, description, level, impact, counter, status, frequency, person))
    },
    cancelCreating: () => {
        dispatch(cancelCreating())
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    closeSuccess: () => {
        dispatch(closeSuccess())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);