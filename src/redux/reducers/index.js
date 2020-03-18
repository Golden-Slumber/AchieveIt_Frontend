import { combineReducers } from 'redux';
import currentPage from './currentPageReducer';
import loginReducer from './loginReducer';
import projectHome from "./projectHomeReducer";
import projectDetail from "./projectDetailReducer";
import projectHour from "./projectHourReducer";
import projectMember from "./projectMemberReducer";
import projectFunction from "./projectFunctionReducer";
import projectDevice from "./projectDeviceReducer";
import projectRisk from "./projectRiskReducer";

let rootReducer = combineReducers({
   _currentPage: currentPage,
   _loginReducer: loginReducer,
   _projectHome: projectHome,
   _projectDetail: projectDetail,
   _projectHour: projectHour,
   _projectMember: projectMember,
   _projectFunction: projectFunction,
   _projectDevice: projectDevice,
   _projectRisk: projectRisk
});

export default rootReducer;