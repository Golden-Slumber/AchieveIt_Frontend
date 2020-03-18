import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    modifyBusinessField,
    modifyCustomer,
    modifyEndTime, modifyMainFunction, modifyMainTech, modifyMilestone,
    modifyProjectInfo,
    modifyProjectName,
    modifyStartTime
} from "../../redux/actions";
import {startCreating} from "../../redux/actions/projectMemberActions";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

const options = [
    {key: '1', value: '2', text: '3'},
    {key: '4', value: '5', text: '6'},
    {key: '7', value: '8', text: '9'}
]

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
        modifyProjectInfo: PropTypes.func,
        modifyProjectName: PropTypes.func,
        modifyCustomer: PropTypes.func,
        modifyStartTime: PropTypes.func,
        modifyEndTime: PropTypes.func,
        modifyMilestone: PropTypes.func,
        modifyMainTech: PropTypes.func,
        modifyBusinessField: PropTypes.func,
        modifyMainFunction: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    render() {

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
                        options={options}
                        onChange={this.props.modifyCustomer}
                    />
                    {/*<select className="ui search dropdown" id="search-select" onChange={this.props.modifyCustomer}>*/}
                    {/*    <option value="">State</option>*/}
                    {/*    <option value="1">1</option>*/}
                    {/*    <option value="2">2</option>*/}
                    {/*</select>*/}
                </div>
                <div className="field">
                    <label>开始时间</label>
                    <input type="text" placeholder="开始时间" value={this.props.startTime}
                           onChange={this.props.modifyStartTime}/>
                </div>
                <div className="field">
                    <label>结束时间</label>
                    <input type="text" placeholder="结束时间" value={this.props.endTime}
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
                        options={options}
                        onChange={this.props.modifyBusinessField}
                    />
                </div>
                <div className="field">
                    <label>主要功能</label>
                    <input type="text" placeholder="主要功能" value={this.props.mainFunction}
                           onChange={this.props.modifyMainFunction}/>
                </div>
                <div className="ui button" tabIndex="0" onClick={this.props.modifyProjectInfo}>完成修改</div>
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
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    modifyProjectInfo: () => {
        dispatch(modifyProjectInfo());
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailChange);