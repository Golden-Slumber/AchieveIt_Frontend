import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import VerifyModal from "./verifyModal";
import {startJudging, finishVerifying} from "../../redux/actions/projectHourActions";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectHourVerify extends React.Component {

    static propTypes = {
        verifyList: PropTypes.array,
        hourModalState: PropTypes.string,
        startJudging: PropTypes.func,
        finishVerifying: PropTypes.func,
        activityOptions: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    handleVerifyClick = (workingHourId) => {
        this.props.startJudging(workingHourId);
    }

    render() {
        let showWorkingHours = this.props.verifyList.map((item, index) => {
            let activityName = '';
            for(let i=0; i<this.props.activityOptions.length; i++){
                if(item.referred_activity_type_id === this.props.activityOptions[i].value){
                    activityName = this.props.activityOptions[i].text;
                    break;
                }
            }
            return (
                <tr>
                    <td>{item.working_hour_id}</td>
                    <td>{item.referred_user_id}</td>
                    <td>{activityName}</td>
                    <td>{item.function_description_snapshot}</td>
                    <td>{item.start_time}</td>
                    <td>{item.end_time}</td>
                    <td><Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                        this.handleVerifyClick(item.working_hour_id);
                    }}/></td>
                </tr>
            );
        });

        let modal;
        if(this.props.hourModalState === 'judge'){
            modal = (
                <VerifyModal />
            );
        }else{
            modal = null;
        }

        return (


            <div>
                {modal}
                <table className="ui celled padded table">
                    <thead>
                    <tr>
                        <th>工时ID</th>
                        <th>用户ID</th>
                        <th>活动类型</th>
                        <th>功能类型</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>审核</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showWorkingHours}
                    </tbody>
                </table>
                <Button content={'完成'} onClick={this.props.finishVerifying}/>
            </div>

        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    verifyList: state._projectHour.verifyList,
    hourModalState: state._projectHour.hourModalState,
    activityOptions: state._projectHour.activityOptions
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startJudging: (workingHourId) => {
        dispatch(startJudging(workingHourId));
    },
    finishVerifying: () => {
        dispatch(finishVerifying());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHourVerify);