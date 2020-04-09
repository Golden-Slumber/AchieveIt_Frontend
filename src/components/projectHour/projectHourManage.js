import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ModifyModal from "./modifyModal";
import {startCreating, startModifying, cancelHourModal, finishManaging} from "../../redux/actions/projectHourActions";
import CreateModal from "./createModal";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectHourManage extends React.Component {

    static propTypes = {
        workingHours: PropTypes.array,
        hourModalState: PropTypes.string,
        startCreating: PropTypes.func,
        startModifying: PropTypes.func,
        finishManaging: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleModifyClick = (workinghourId) => {
        this.props.startModifying(workinghourId);
    }

    render() {

        let showWorkingHours = this.props.workingHours.map((item, index) => {
            let time1 = new Date(item.end_time.replace('-', '/'));
            let time2 = new Date();
            let aDay = 24 * 60 * 60 * 1000;
            let diff = (time2 - time1) / aDay;
            return (
                <tr>
                    <td>{item.referred_activity_type_id}</td>
                    <td>{item.function_description_snapshot}</td>
                    <td>{item.start_time}</td>
                    <td>{item.end_time}</td>
                    <td>{
                        item.verified ?
                            '已审核通过'
                            :
                            '尚未通过审核'
                    }</td>
                    <td>{
                        diff <= 3 && !item.verified  ?
                            <Icon name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                                this.handleModifyClick(item.working_hour_id);
                            }}/> :
                            <Icon disabled name={"arrow right"} style={{color: '#1BB394'}} onClick={() => {
                                this.handleModifyClick(item.working_hour_id);
                            }}/>
                    }</td>
                </tr>
            );
        });

        let createModal = null;
        if (this.props.hourModalState === 'create') {
            createModal = (<CreateModal/>);
        }
        let modifyModal = null;
        if (this.props.hourModalState === 'modify') {
            modifyModal = (<ModifyModal/>);
        }
        return (

            <div>
                {createModal}
                {modifyModal}
                <table className="ui celled padded table">
                    <thead>
                    <tr>
                        <th>活动类型</th>
                        <th>功能</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>审核状态</th>
                        <th>修改</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showWorkingHours}
                    </tbody>
                </table>
                <Button content={'完成'} style={{float: 'right'}} onClick={this.props.finishManaging}/>
                <Button content={'新增'} onClick={this.props.startCreating}/>
            </div>

        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    workingHours: state._projectHour.workingHours,
    hourModalState: state._projectHour.hourModalState,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startCreating: () => {
        dispatch(startCreating());
    },
    startModifying: (workinghourId) => {
        dispatch(startModifying(workinghourId));
    },
    finishManaging: () => {
        dispatch(finishManaging());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHourManage);