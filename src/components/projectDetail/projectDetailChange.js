import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    cancelModify,
    modifyBusinessField,
    modifyCustomer,
    modifyEndTime, modifyMainFunction, modifyMainTech, modifyMilestone,
    modifyProjectInfo,
    modifyProjectName,
    modifyStartTime
} from "../../redux/actions";
import {startCreating} from "../../redux/actions/projectMemberActions";
import {closeFailed, formFailed} from "../../redux/actions/userActions";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectDetailChange extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        projectName: PropTypes.string,
        customer: PropTypes.string,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        milestone: PropTypes.string,
        mainTech: PropTypes.string,
        businessField: PropTypes.string,
        mainFunction: PropTypes.string,
        isModifying: PropTypes.bool,
        projectIdsOptions: PropTypes.array,
        customersOptions: PropTypes.array,
        businessFieldsOptions: PropTypes.array,
        failed: PropTypes.string,
        modifyProjectInfo: PropTypes.func,
        modifyProjectName: PropTypes.func,
        modifyCustomer: PropTypes.func,
        modifyStartTime: PropTypes.func,
        modifyEndTime: PropTypes.func,
        modifyMilestone: PropTypes.func,
        modifyMainTech: PropTypes.func,
        modifyBusinessField: PropTypes.func,
        modifyMainFunction: PropTypes.func,
        closeFailed: PropTypes.func,
        cancelModify: PropTypes.func,
        formFailed: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleModifyClick = () => {
        let time1 = new Date(this.props.startTime.replace('-', '/'));
        let time2 = new Date(this.props.endTime.replace('-', '/'));
        if(this.props.projectName === '' || this.props.customer === '' || this.props.startTime === '' || this.props.endTime === '' ||
            this.props.milestone === '' || this.props.mainTech === '' || this.props.businessField === '' || this.props.mainFunction === ''
          || time1 >= time2){
            this.props.formFailed('modifyProjectDetail');
        }else{
            this.props.modifyProjectInfo(this.props.projectId, this.props.projectName, this.props.customer, this.props.startTime,
                this.props.endTime, this.props.milestone, this.props.mainTech, this.props.businessField, this.props.mainFunction);
        }
    }

    handleCancelClick = () => {
        this.props.cancelModify(this.props.projectId);
    }

    render() {

        let detailChangeFailedMessage;
        if(this.props.failed === 'modifyProjectDetail'){
            detailChangeFailedMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>请检查一下您所填写的内容，确保它们是正确的。</p>
                </Message>
            );
        }else{
            detailChangeFailedMessage = null;
        }

        return (
            <form className="ui form">
                <div className="field">
                    <label>项目名</label>
                    <input type="text" placeholder="项目名" value={this.props.projectName}
                           onChange={this.props.modifyProjectName}/>
                </div>
                <div className="field">
                    <label>客户信息</label>
                    <Dropdown
                        placeholder='选择客户'
                        fluid
                        search
                        selection
                        options={this.props.customersOptions}
                        value={this.props.customer}
                        onChange={this.props.modifyCustomer}
                    />
                </div>
                <div className="field">
                    <label>开始时间</label>
                    <input type="text" placeholder="开始时间：格式为yyyy-MM-dd HH:mm:ss" value={this.props.startTime}
                           onChange={this.props.modifyStartTime}/>
                </div>
                <div className="field">
                    <label>结束时间</label>
                    <input type="text" placeholder="结束时间：格式为yyyy-MM-dd HH:mm:ss" value={this.props.endTime}
                           onChange={this.props.modifyEndTime}/>
                </div>
                <div className="field">
                    <label>里程碑</label>
                    <input type="text" placeholder="里程碑" value={this.props.milestone}
                           onChange={this.props.modifyMilestone}/>
                </div>
                <div className="field">
                    <label>主要技术</label>
                    <input type="text" placeholder="主要技术" value={this.props.mainTech}
                           onChange={this.props.modifyMainTech}/>
                </div>
                <div className="field">
                    <label>业务领域</label>
                    <Dropdown
                        placeholder='选择业务领域'
                        fluid
                        search
                        selection
                        options={this.props.businessFieldsOptions}
                        value={this.props.businessField}
                        onChange={this.props.modifyBusinessField}
                    />
                </div>
                <div className="field">
                    <label>主要功能</label>
                    <input type="text" placeholder="主要功能" value={this.props.mainFunction}
                           onChange={this.props.modifyMainFunction}/>
                </div>
                {detailChangeFailedMessage}
                <div className="ui button" tabIndex="0" onClick={this.handleCancelClick}>取消</div>
                <div className="ui button" tabIndex="0" onClick={this.handleModifyClick} style={{float: 'right'}}>完成修改</div>
            </form>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId,
    projectName: state._projectDetail.projectName,
    customer: state._projectDetail.customer,
    startTime: state._projectDetail.startTime,
    endTime: state._projectDetail.endTime,
    milestone: state._projectDetail.milestone,
    mainTech: state._projectDetail.mainTech,
    businessField: state._projectDetail.businessField,
    mainFunction: state._projectDetail.mainFunction,
    isModifying: state._projectDetail.isModifying,
    projectIdsOptions: state._projectDependency.projectIdsOptions,
    customersOptions: state._projectDependency.customersOptions,
    businessFieldsOptions: state._projectDependency.businessFieldsOptions,
    failed: state._userReducer.failed
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    modifyProjectInfo: (projectId, projectName, customer, startTime, endTime, milestone, mainTech, businessField, mainFunction) => {
        dispatch(modifyProjectInfo(projectId, projectName, customer, startTime, endTime, milestone, mainTech, businessField, mainFunction));
    },
    modifyProjectName: (event) => {
        dispatch(modifyProjectName(event.target.value));
    },
    modifyCustomer: (event, data) => {
        console.log(data.value);
        dispatch(modifyCustomer(data.value));
    },
    modifyStartTime: (event) => {
        dispatch(modifyStartTime(event.target.value));
    },
    modifyEndTime: (event) => {
        dispatch(modifyEndTime(event.target.value));
    },
    modifyMilestone: (event) => {
        dispatch(modifyMilestone(event.target.value));
    },
    modifyMainTech: (event) => {
        dispatch(modifyMainTech(event.target.value));
    },
    modifyBusinessField: (event, data) => {
        dispatch(modifyBusinessField(data.value));
    },
    modifyMainFunction: (event) => {
        dispatch(modifyMainFunction(event.target.value));
    },
    closeFailed: () => {
        dispatch(closeFailed());
    },
    cancelModify: (projectId) => {
        dispatch(cancelModify(projectId));
    },
    formFailed: (form) => {
        dispatch(formFailed(form));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailChange);