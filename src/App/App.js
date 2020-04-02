import React from 'react';
import StickyMenu from '../components/menu';
import PrivateRoute from "./privateRoute";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from "../components/home";
import LoginForm from "../model/login";
import requireAuthentication from "../components/checkAuth";
import Project from "../components/project/project";
import SetUp from "../components/setUp/setUp";
import ProjectDetail from "../components/projectDetail/projectDetail";
import ProjectMember from "../components/projectMember/projectMember";
import ProjectFunction from "../components/projectFunction/projectFunction";
import ProjectHour from "../components/projectHour/projectHour";
import ProjectDevice from "../components/projectDevice/projectDevice";
import ProjectRisk from "../components/projectRisk/projectRisk";
import ProjectDefect from "../components/projectDefect/projectDefect";
import history from '../history';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const globalStyles = {
	backgroundColor: 'rgb(238, 239, 239)',
	fontFamily: 'Arial',
	minHeight: '100em',
};

const App = ({ authenticated, checked }) => (
	<Router history={history}>
		<div style={globalStyles}>
			<StickyMenu/>
			{ checked &&
			<div>
				<Route exact path="/" component={Home}/>
				<Route path="/login" component={LoginForm}/>
				<PrivateRoute path="/project" component={Project} authenticated={authenticated}/>
				<PrivateRoute path="/setUp" component={SetUp} authenticated={authenticated}/>
				<PrivateRoute path="/projectDetail" component={ProjectDetail} authenticated={authenticated}/>
				<PrivateRoute path="/projectMember" component={ProjectMember} authenticated={authenticated}/>
				<PrivateRoute path="/projectFunction" component={ProjectFunction} authenticated={authenticated}/>
				<PrivateRoute path="/projectHour" component={ProjectHour} authenticated={authenticated}/>
				<PrivateRoute path="/projectDevice" component={ProjectDevice} authenticated={authenticated}/>
				<PrivateRoute path="/projectRisk" component={ProjectRisk} authenticated={authenticated}/>
				<PrivateRoute path="/projectDefect" component={ProjectDefect} authenticated={authenticated}/>
			</div>
			}
		</div>
	</Router>
);

const { bool } = PropTypes;

App.propTypes = {
	authenticated: bool.isRequired,
	checked: bool.isRequired
};

const mapState = ({ session }) => ({
	checked: session.checked,
	authenticated: session.authenticated
});

export default connect(mapState)(App);