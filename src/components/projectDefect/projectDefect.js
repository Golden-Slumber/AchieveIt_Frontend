import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ProjectMenu from "../projectMenu/projectMenu";
import {closeFailed} from "../../redux/actions/userActions";

const globalStyles = {
    backgroundColor: 'rgb(238, 239, 239)',
    fontFamily: 'Arial',
    minHeight: '100em',
};

export class ProjectDefect extends React.Component {

    static propTypes = {
        projectId: PropTypes.string,
        url: PropTypes.string,
        failed: PropTypes.string,
        closeFailed: PropTypes.func
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

        let defectFailMessage;
        if(this.props.failed === 'defect'){
            defectFailMessage = (
                <Message negative={true}>
                    <i className={'close icon'} onClick={this.props.closeFailed}/>
                    <div className={'header'}>出了一点小小的问题</div>
                    <p>可能您没有足够的权限。</p>
                </Message>
            );
        }else{
            defectFailMessage = null;
        }

        return (

            <div>
                <Segment style={globalStyles}>
                    <Container clssName='main ui' style={{margin: '100px, 100px, 0px, 100px'}}>

                        <h1 className="ui header">{this.props.projectId}</h1>

                        <Segment style={{minHeight: '30em'}}>
                            <ProjectMenu />
                            {defectFailMessage}
                            <h1>{this.props.url}</h1>
                        </Segment>
                    </Container>

                </Segment>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    projectId: state._projectDetail.projectId,
    url: state._projectDefect.url,
    failed: state._userReducer.failed
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    closeFailed: () => {
        dispatch(closeFailed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDefect);