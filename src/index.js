import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    BrowserRouter,
    Router,Switch,Redirect
} from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux';
import store, {persistor} from './redux';
import Home from "./components/home";
import LoginForm from "./model/login";
import requireAuthentication from "./components/checkAuth";
import StickyMenu from "./components/menu/menu";
import Project from "./components/project/project";
import SetUp from "./components/setUp/setUp";
import ProjectDetail from "./components/projectDetail/projectDetail";
import ProjectMember from "./components/projectMember/projectMember";
import ProjectFunction from "./components/projectFunction/projectFunction";
import ProjectHour from "./components/projectHour/projectHour";
import ProjectDevice from "./components/projectDevice/projectDevice";
import ProjectRisk from "./components/projectRisk/projectRisk";
import ProjectDefect from "./components/projectDefect/projectDefect";
import {PersistGate} from 'redux-persist/lib/integration/react';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                <div>
                    {/*<App />*/}
                    <StickyMenu/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/project" component={requireAuthentication(Project)}/>
                        <Route path="/setUp" component={SetUp} />
                        <Route path="/projectDetail" component={ProjectDetail} />
                        <Route path="/projectMember" component={ProjectMember} />
                        <Route path="/projectFunction" component={ProjectFunction} />
                        <Route path="/projectHour" component={ProjectHour} />
                        <Route path="/projectDevice" component={ProjectDevice} />
                        <Route path="/projectRisk" component={ProjectRisk} />
                        <Route path="/projectDefect" component={ProjectDefect} />
                        <Redirect to="/project"/>
                    </Switch>
                </div>
            </Router>
        </PersistGate>
    </Provider>, document.getElementById('root'));

