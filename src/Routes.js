// import Login from "./Components/Pages/Login";
// import Registration from "./Components/Pages/Registration";

import { lazy } from 'react';

const Registration = lazy(() => import('./Components/Pages/Login/Registration'));
const VisitorType = lazy(() => import('./Components/Pages/Masters/VisitorTypeMaster/VisitorType'));
const AddVisitorType = lazy(() => import('./Components/Pages/Masters/VisitorTypeMaster/AddVisitorType'));
const AddDepartmentMaster = lazy(() => import('./Components/Pages/Masters/DepartmentMaster/AddDepartmentMaster'));
const DepartmentMaster = lazy(() => import('./Components/Pages/Masters/DepartmentMaster/DepartmentMaster'));
const EmployeeMaster = lazy(() => import('./Components/Pages/Masters/EmployeeMaster/EmployeeMaster'));
const AddEmployeeMaster = lazy(() => import('./Components/Pages/Masters/EmployeeMaster/AddEmployeeMaster'));
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'));
const UserMaster = lazy(() => import('./Components/Pages/Masters/UserMaster/UserMaster'));
const AddUserMaster = lazy(() => import('./Components/Pages/Masters/UserMaster/AddUserMaster'));
const RoleMaster = lazy(() => import('./Components/Pages/Masters/RoleMaster/RoleMaster'));
const AddRoleMaster = lazy(() => import('./Components/Pages/Masters/RoleMaster/AddRoleMaster'));
const Visitor = lazy(() => import('./Components/Pages/Visitor/Visitor'));
const VisitorForm = lazy(() => import('./Components/Pages/Visitor/VisitorForm'));

const routes = [
  // { path: '/', exact: true, name: 'Login', element: Login },
  // { path: '/resgistration', exact: true, name: 'Registration', element: Registration },
  { path: '/registration', exact: true, name: 'Dashboard', element: Registration },
  // { path: '/sidebar', exact: true, name: 'sidebar', element: Sidebar },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/VisitorTypeMaster', exact: true, name: 'VisitorType', element: VisitorType },
  { path: '/addVisitorType', exact: true, name: 'AddVisitorType', element: AddVisitorType },
  { path: '/departmentMaster', exact: true, name: 'DepartmentMaster', element: DepartmentMaster },
  { path: '/addDepartmentMaster', exact: true, name: 'AddVisitorType', element: AddDepartmentMaster },
  { path: '/employeeMaster', exact: true, name: 'EmployeeMaster', element: EmployeeMaster },
  { path: '/addEmployeeMaster', exact: true, name: 'AddEmployeeMaster', element: AddEmployeeMaster },
  { path: '/userMaster', exact: true, name: 'UserMaster', element: UserMaster },
  { path: '/addUserMaster', exact: true, name: 'AddUserMaster', element: AddUserMaster },
  { path: '/roleMaster', exact: true, name: 'RoleMaster', element: RoleMaster },
  { path: '/addRoleMaster', exact: true, name: 'AddRoleMaster', element: AddRoleMaster },
  { path: '/VisiotrsInfo', exact: true, name: 'Visitor', element: Visitor },
  { path: '/visitorForm', exact: true, name: 'VisitorForm', element: VisitorForm },

]
export default routes