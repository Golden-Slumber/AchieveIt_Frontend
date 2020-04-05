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
import {closeFailed, closeSuccess, formFailed} from "../../redux/actions/userActions";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const typeOptions = [
    {key: 'PS', value: 'PS', text: 'PS'},
    {key: 'PD', value: 'PD', text: 'PD'},
    {key: 'ST', value: 'ST', text: 'ST'},
    {key: 'CU', value: 'CU', text: 'CU'},
    {key: 'DE', value: 'DE', text: 'DE'},
    {key: 'TE', value: 'TE', text: 'TE'},
    {key: 'BU', value: 'BU', text: 'BU'}
];

const levelOptions = [
    {key: 'L', value: 'L', text: 'L'},
    {key: 'M', value: 'M', text: 'M'},
    {key: 'H', value: 'H', text: 'H'},
]

const stateOptions = [
    {key: '已识别', value: '已识别', text: '已识别'},
    {key: '解决中', value: '解决中', text: '解决中'},
    {key: '已解决', value: '已解决', text: '已解决'},
]

const frequencyOptions = [
    {key: '每周1次', value: '每周1次', text: '每周1次'},
    {key: '每周2次', value: '每周2次', text: '每周2次'},
    {key: '每周3次', value: '每周3次', text: '每周3次'},
    {key: '每周4次', value: '每周4次', text: '每周4次'},
    {key: '每周5次', value: '每周5次', text: '每周5次'},
]

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
        closeSuccess: PropTypes.func,
        formFailed: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleFinishClick = () => {
        if(this.props.currentType === '' || this.props.currentDescription === '' || this.props.currentLevel === '' || this.props.currentImpact === '' ||
            this.props.currentCountermeasure === '' || this.props.currentStatus === '' || this.props.currentFrequency === '' || this.prop.currentResponsiblePerson === []){
            this.props.formFailed('createRisk');
        }else{
            this.props.createRisk(this.props.projectId, this.props.currentType, this.props.currentDescription, this.props.currentLevel, this.props.currentImpact,
                this.props.currentCountermeasure, this.props.currentStatus, this.props.currentFrequency, this.props.currentResponsiblePerson);
        }
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
                                    options={typeOptions}
                                    value={this.props.currentType}
                                    onChange={this.props.changeRiskType}
                                />
                            </div>
                            <div className="field">
                                <label>风险描述</label>
                                <input type="text" placeholder="描述" value={this.props.currentDescription} onChange={this.props.changeRiskDescription}/>
                            </div>
                            <div className="field">
                                <label>风险级别</label>
                                <Dropdown
                                    placeholder='选择风险级别'
                                    fluid
                                    search
                                    selection
                                    options={levelOptions}
                                    value={this.props.currentLevel}
                                    onChange={this.props.changeRiskLevel}
                                />
                            </div>
                            <div className="field">
                                <label>风险影响度</label>
                                <Dropdown
                                    placeholder='选择风险影响度'
                                    fluid
                                    search
                                    selection
                                    options={levelOptions}
                                    value={this.props.currentImpact}
                                    onChange={this.props.changeRiskImpact}
                                />
                            </div>
                            <div className="field">
                                <label>风险应对策略</label>
                                <input type="text" placeholder="应对策略" value={this.props.currentCountermeasure} onChange={this.props.changeRiskCounter}/>
                            </div>
                            <div className="field">
                                <label>风险状态</label>
                                <Dropdown
                                    placeholder='选择风险状态'
                                    fluid
                                    search
                                    selection
                                    options={stateOptions}
                                    value={this.props.currentStatus}
                                    onChange={this.props.changeRiskStatus}
                                />
                            </div>
                            <div className="field">
                                <label>风险跟踪频度</label>
                                <Dropdown
                                    placeholder='选择风险跟踪频度'
                                    fluid
                                    search
                                    selection
                                    options={frequencyOptions}
                                    value={this.props.currentFrequency}
                                    onChange={this.props.changeRiskFrequency}
                                />
                            </div>
                            <div className="field">
                                <label>风险负责人</label>
                                <Dropdown
                                    placeholder='选择负责人'
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
    },
    formFailed: (form) => {
        dispatch(formFailed(form));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);