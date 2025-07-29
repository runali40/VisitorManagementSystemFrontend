// import Login from "./Components/Pages/Login";
// import Registration from "./Components/Pages/Registration";

import { lazy } from 'react';


const Registration = lazy(() => import('./Components/Pages/Registration'));
const Grids = lazy(() => import('./Components/Pages/Grids'));
const Typography = lazy(() => import('./Components/Pages/Typography'));
const VisitorType = lazy(() => import('./Components/Pages/Masters/VisitorTypeMaster/VisitorType'));
const AddVisitorType = lazy(() => import('./Components/Pages/Masters/VisitorTypeMaster/AddVisitorType'));
const routes = [
  // { path: '/', exact: true, name: 'Login', element: Login },
  // { path: '/resgistration', exact: true, name: 'Registration', element: Registration },
  { path: '/registration', exact: true, name: 'Dashboard', element: Registration },
  // { path: '/sidebar', exact: true, name: 'sidebar', element: Sidebar },
  { path: '/typography', exact: true, name: 'Dashboard', element: Typography },
  { path: '/grids', exact: true, name: 'Dashboard', element: Grids },
  { path: '/visitorType', exact: true, name: 'VisitorType', element: VisitorType },
  { path: '/addVisitorType', exact: true, name: 'AddVisitorType', element: AddVisitorType },

]
export default routes