
import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import "datatables.net";
// import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
// import "datatables.net-responsive";

import Login from './Components/Pages/Login';
import Registration from './Components/Pages/Registration';
import Sidebar from './Components/Pages/Sidebar';


const App = (props) => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
           <Route path="/registration" element={<Registration/>}/>
          <Route exact path="/*" element={<Sidebar />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
