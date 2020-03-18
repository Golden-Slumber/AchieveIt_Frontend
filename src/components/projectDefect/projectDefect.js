import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";


const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectDefect extends React.Component {

    static propTypes = {
        projectId: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            isChanging: false
        }
    }

    handleChangeClick = () => {
        this.setState({isChanging: true});
    }



    render() {
        return (

            <div>
                <Segment style={globalStyles}>
                    <Container clssName='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <div className="ui tabular menu">
                                <Link to={'/projectDetail'}>
                                    <a className="item">项目信息 </a>
                                </Link>
                                <Link to={'/projectMember'}>
                                    <a className="item">项目成员 </a>
                                </Link>
                                <Link to={'/projectFunction'}>
                                    <a className="item">项目功能 </a>
                                </Link>
                                <Link to={'/projectHour'}>
                                    <a className="item">项目工时</a>
                                </Link>
                                <Link to={'/projectDevice'}>
                                    <a className="item">项目设备 </a>
                                </Link>
                                <Link to={'/projectRisk'}>
                                    <a className="item">项目风险 </a>
                                </Link>
                                <Link to={'/projectDefect'}>
                                    <a className="item active">项目缺陷 </a>
                                </Link>
                            </div>

                            <h1>URL</h1>
                        </Segment>
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDefect);