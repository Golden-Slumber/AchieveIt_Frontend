import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Dropdown, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    changeBusinessField,
    changeCustomer,
    changeEndTime, changeMainFunction, changeMainTech, changeMilestone,
    changeProjectId,
    changeProjectName,
    changeStartTime,
    projectSetup
} from "../../redux/actions";


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

export class SetUp extends React.Component {

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
        projectSetup: PropTypes.func,
        changeProjectId: PropTypes.func,
        changeProjectName: PropTypes.func,
        changeCustomer: PropTypes.func,
        changeStartTime: PropTypes.func,
        changeEndTime: PropTypes.func,
        changeMilestone: PropTypes.func,
        changeMainTech: PropTypes.func,
        changeBusinessField: PropTypes.func,
        changeMainFunction: PropTypes.func
    };

    handleSetupClick = () => {
        this.props.projectSetup(this.props.projectId, this.props.projectName, this.props.customer, this.props.startTime, this.props.endTime, this.props.milestone, this.props.mainTech, this.props.businessField, this.props.mainFunction);
    }

    render() {

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container clssName='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>
                        <Segment>
                            <form className="ui form">
                                <h4 className="ui dividing header">立项相关信息</h4>
                                <div className="field">
                                    <label>项目ID</label>
                                    <Dropdown
                                        placeholder='选择项目ID'
                                        fluid
                                        search
                                        selection
                                        options={options}
                                        onChange={this.props.changeProjectId}
                                    />
                                </div>
                                <div className="field">
                                    <label>项目名</label>
                                    <input type="text" placeholder="项目名" onChange={this.props.changeProjectName}/>
                                </div>
                                <div className="field">
                                    <label>客户信息</label>
                                    <Dropdown
                                        placeholder='选择客户'
                                        fluid
                                        search
                                        selection
                                        options={options}
                                        onChange={this.props.changeCustomer}
                                    />
                                </div>
                                <div className="field">
                                    <label>开始时间</label>
                                    <input type="text" placeholder="开始时间" onChange={this.props.changeStartTime}/>
                                </div>
                                <div className="field">
                                    <label>结束时间</label>
                                    <input type="text" placeholder="结束时间" onChange={this.props.changeEndTime}/>
                                </div>
                                <div className="field">
                                    <label>里程碑</label>
                                    <input type="text" placeholder="里程碑" onChange={this.props.changeMilestone}/>
                                </div>
                                <div className="field">
                                    <label>主要技术</label>
                                    <input type="text" placeholder="主要技术" onChange={this.props.changeMainFunction}/>
                                </div>
                                <div className="field">
                                    <label>业务领域</label>
                                    <Dropdown
                                        placeholder='选择业务领域'
                                        fluid
                                        search
                                        selection
                                        options={options}
                                        onChange={this.props.changeBusinessField}
                                    />
                                </div>
                                <div className="field">
                                    <label>主要功能</label>
                                    <input type="text" placeholder="主要功能" onChange={this.props.changeMainFunction}/>
                                </div>
                                <div className="ui button" tabIndex="0" onClick={this.handleSetupClick}>申请立项</div>
                            </form>
                        </Segment>
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectHome.projectSetupInfo.projectId,
    projectName: state._projectHome.projectSetupInfo.projectName,
    customer: state._projectHome.projectSetupInfo.customer,
    startTime: state._projectHome.projectSetupInfo.startTime,
    endTime: state._projectHome.projectSetupInfo.endTime,
    milestone: state._projectHome.projectSetupInfo.milestone,
    mainTech: state._projectHome.projectSetupInfo.mainTech,
    businessField: state._projectHome.projectSetupInfo.businessField,
    mainFunction: state._projectHome.projectSetupInfo.mainFunction,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    projectSetup: (projectId, projectName, customer, startTime, endTime, milestone, mainTech, businessField, mainFunction) => {
        dispatch(projectSetup(projectId, projectName, customer, startTime, endTime, milestone, mainTech, businessField, mainFunction));
    },
    changeProjectId: (event, data) => {
        dispatch(changeProjectId(data.value))
    },
    changeProjectName: (event) => {
        dispatch(changeProjectName(event.target.value))
    },
    changeCustomer: (event, data) => {
        dispatch(changeCustomer(data.value))
    },
    changeStartTime: (event) => {
        dispatch(changeStartTime(event.target.value))
    },
    changeEndTime: (event) => {
        dispatch(changeEndTime(event.target.value))
    },
    changeMilestone: (event) => {
        dispatch(changeMilestone(event.target.value))
    },
    changeMainTech: (event) => {
        dispatch(changeMainTech(event.target.value))
    },
    changeBusinessField: (event, data) => {
        dispatch(changeBusinessField(data.value))
    },
    changeMainFunction: (event) => {
        dispatch(changeMainFunction(event.target.value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetUp);