import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TheContent from "./Content.js";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import "../../assets/css/bootstrap.min.css"
// import "../../assets/css/style.css"

// import "../../assets/css/style-responsive.css"
// import "../../assets/css/bootstrap.min.css"
// import "../../assets/css/font.css"
// import "../../assets/css/font-awesome.css"
// import "../../assets/css/morris.css"
// import "../../assets/css/monthly.css"
// import "../../assets/js/jquery2.0.3.min.js"
// // import "../../assets/js/raphael-min.js"
// // import "../../assets/js/morris.js"
// import "../../assets/js/bootstrap.js"
// import "../../assets/js/scripts.js"
// import "../../assets/js/jquery.dcjqaccordion.2.7.js"
// import "../../assets/js/jquery.slimscroll.js"
// import "../../assets/js/jquery.nicescroll.js"
// // import "../../assets/js/flot-chart/excanvas.min.js"
// import "../../assets/js/jquery.scrollTo.js"

import "../../assets/css/bootstrap.min.css";
import "../../assets/css/font-awesome.css";
import "../../assets/css/style.css";
import "../../assets/css/style-responsive.css";
import "../../assets/css/font.css";
import "../../assets/css/morris.css";
import "../../assets/css/monthly.css";

// Import jQuery first, then other JS files
// import "../../assets/js/jquery2.0.3.min.js"
import "../../assets/js/bootstrap.js";
import "../../assets/js/jquery.dcjqaccordion.2.7.js";
import "../../assets/js/jquery.slimscroll.js";
import "../../assets/js/jquery.nicescroll.js";
import "../../assets/js/jquery.scrollTo.js";
import "../../assets/js/scripts.js";
import { Nav } from "react-bootstrap";
import { getAllWebMenuApi } from "../Api/SidebarApi.js";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [sidebarData, setSidebarData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleVisitor = () => {
    setIsVisitor(!isVisitor);
  };

  // useEffect(() => {
  //     getAllWebMenu();
  // }, [])

  const getAllWebMenu = async () => {
    const data = await getAllWebMenuApi();
    console.log(data);
    setSidebarData(data);
  };
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuId) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
  };
  const parentMenus = sidebarData.filter(
    (item) => item.ParentId === "00000000-0000-0000-0000-000000000000"
  );

  const getChildMenus = (parentId) =>
    sidebarData.filter(
      (item) =>
        item.ParentId.toLowerCase() === parentId.toLowerCase() &&
        item.m_action !== ""
    );
  return (
    <>
      <section id="container">
        {/* <!--header start--> */}
        <header className="header fixed-top clearfix">
          {/* <!--logo start--> */}
          <div className="brand">
            <NavLink to="/" className="logo">
              VISITORS
            </NavLink>
            <div className="sidebar-toggle-box">
              <div className="fa fa-bars"></div>
            </div>
          </div>
          {/* <!--logo end--> */}
          <div className="nav notify-row" id="top_menu">
            {/* <!--  notification start --> */}
            <ul className="nav top-menu">
              {/* <!-- settings start --> */}
              <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle">
                  <i className="fa fa-tasks"></i>
                  <span className="badge bg-success">8</span>
                </a>
                <ul className="dropdown-menu extended tasks-bar">
                  <li>
                    <p className="">You have 8 pending tasks</p>
                  </li>
                  <li>
                    <NavLink to="">
                      <div className="task-info clearfix">
                        <div className="desc pull-left">
                          <h5>Target Sell</h5>
                          <p>25% , Deadline 12 June’13</p>
                        </div>
                        <span
                          className="notification-pie-chart pull-right"
                          data-percent="45"
                        >
                          <span className="percent"></span>
                        </span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="">
                      <div className="task-info clearfix">
                        <div className="desc pull-left">
                          <h5>Product Delivery</h5>
                          <p>45% , Deadline 12 June’13</p>
                        </div>
                        <span
                          className="notification-pie-chart pull-right"
                          data-percent="78"
                        >
                          <span className="percent"></span>
                        </span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/">
                      <div className="task-info clearfix">
                        <div className="desc pull-left">
                          <h5>Payment collection</h5>
                          <p>87% , Deadline 12 June’13</p>
                        </div>
                        <span
                          className="notification-pie-chart pull-right"
                          data-percent="60"
                        >
                          <span className="percent"></span>
                        </span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="">
                      <div className="task-info clearfix">
                        <div className="desc pull-left">
                          <h5>Target Sell</h5>
                          <p>33% , Deadline 12 June’13</p>
                        </div>
                        <span
                          className="notification-pie-chart pull-right"
                          data-percent="90"
                        >
                          <span className="percent"></span>
                        </span>
                      </div>
                    </NavLink>
                  </li>

                  <li className="external">
                    <a href="#">See All Tasks</a>
                  </li>
                </ul>
              </li>
              {/* <!-- settings end --> */}
              {/* <!-- inbox dropdown start--> */}
              <li id="header_inbox_bar" className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <i className="fa fa-envelope-o"></i>
                  <span className="badge bg-important">4</span>
                </a>
                <ul className="dropdown-menu extended inbox">
                  <li>
                    <p className="red">You have 4 Mails</p>
                  </li>
                  <li>
                    <NavLink to="">
                      <span className="photo">
                        <img alt="avatar" src="images/3.png" />
                      </span>
                      <span className="subject">
                        <span className="from">Jonathan Smith</span>
                        <span className="time">Just now</span>
                      </span>
                      <span className="message">
                        Hello, this is an example msg.
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="">
                      <span className="photo">
                        <img alt="avatar" src="images/1.png" />
                      </span>
                      <span className="subject">
                        <span className="from">Jane Doe</span>
                        <span className="time">2 min ago</span>
                      </span>
                      <span className="message">Nice admin template</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="">
                      <span className="photo">
                        <img alt="avatar" src="images/3.png" />
                      </span>
                      <span className="subject">
                        <span className="from">Tasi sam</span>
                        <span className="time">2 days ago</span>
                      </span>
                      <span className="message">This is an example msg.</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="">
                      <span className="photo">
                        <img alt="avatar" src="images/2.png" />
                      </span>
                      <span className="subject">
                        <span className="from">Mr. Perfect</span>
                        <span className="time">2 hour ago</span>
                      </span>
                      <span className="message">Hi there, its a test</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="">See all messages</NavLink>
                  </li>
                </ul>
              </li>
              {/* <!-- inbox dropdown end --> */}
              {/* <!-- notification dropdown start--> */}
              <li id="header_notification_bar" className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <i className="fa fa-bell-o"></i>
                  <span className="badge bg-warning">3</span>
                </a>
                <ul className="dropdown-menu extended notification">
                  <li>
                    <p>Notifications</p>
                  </li>
                  <li>
                    <div className="alert alert-info clearfix">
                      <span className="alert-icon">
                        <i className="fa fa-bolt"></i>
                      </span>
                      <div className="noti-info">
                        <a href="#"> Server #1 overloaded.</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="alert alert-danger clearfix">
                      <span className="alert-icon">
                        <i className="fa fa-bolt"></i>
                      </span>
                      <div className="noti-info">
                        <a href="#"> Server #2 overloaded.</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="alert alert-success clearfix">
                      <span className="alert-icon">
                        <i className="fa fa-bolt"></i>
                      </span>
                      <div className="noti-info">
                        <a href="#"> Server #3 overloaded.</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              {/* <!-- notification dropdown end --> */}
            </ul>
            {/* <!--  notification end --> */}
          </div>
          <div className="top-nav clearfix">
            {/* <!--search & user info start--> */}
            <ul className="nav pull-right top-menu">
              <li>
                <input
                  type="text"
                  className="form-control search"
                  placeholder=" Search"
                />
              </li>
              {/* <!-- user login dropdown start--> */}
              <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <img alt="" src="images/2.png" />
                  <span className="username">John Doe</span>
                  <b className="caret"></b>
                </a>
                <ul className="dropdown-menu extended logout">
                  <li>
                    <NavLink>
                      <i className=" fa fa-suitcase"></i>Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink>
                      <i className="fa fa-cog"></i> Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/">
                      <i className="fa fa-key"></i> Log Out
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* <!-- user login dropdown end --> */}
            </ul>
            {/* <!--search & user info end--> */}
          </div>
        </header>
        {/* <!--header end--> */}
        {/* <!--sidebar start--> */}
        <aside>
          <div id="sidebar" className="nav-collapse">
            {/* <!-- sidebar menu start--> */}
            <div className="leftside-navigation">
              {/* <ul className="sidebar-menu" id="nav-accordion"> */}
              {/* <li><NavLink to="/dashboard">
                                   <i className="fa fa-dashboard"></i>
                                    <span>Dashboard</span>

                              
                                </NavLink></li> */}
              {/* <li className={`sub-menu ${isOpen ? 'active' : ''}`}>
                                    <div onClick={toggleSubmenu} style={{ cursor: 'pointer' }}>
                                        <i className="fa fa-book"></i>
                                        <span className="ms-2">Masters</span>
                                    </div>

                                    {isOpen && (
                                        <ul className="sub">
                                            <li><NavLink to="/VisitorType">Visitor Type Master</NavLink></li>
                                            <li><NavLink to="/departmentMaster">Department Master</NavLink></li>
                                            <li><NavLink to="/employeeMaster">Employee Master</NavLink></li>
                                            <li><NavLink to="/userMaster">User Master</NavLink></li>
                                            <li><NavLink to="/roleMaster">Role Master</NavLink></li>
                                        </ul>
                                    )}
                                </li>
                                <li className={`sub-menu ${isVisitor ? 'active' : ''}`}>
                                    <div onClick={toggleVisitor} style={{ cursor: 'pointer' }}>
                                        <i className="fa fa-book"></i>
                                        <span className="ms-2">Visitors</span>
                                    </div>

                                    {isVisitor && (
                                        <ul className="sub">
                                            <li><NavLink to="/visitor">Visitor Form</NavLink></li>

                                        </ul>
                                    )}
                                </li> */}

              <ul className="sidebar-menu" id="nav-accordion">
                <li>
                  <NavLink to="/dashboard">
                    <i className="fa fa-dashboard"></i>
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                {parentMenus.map((parent) => {
                  const childMenus = getChildMenus(parent.m_id);

                  return (
                    <>
                      <li
                        key={parent.m_id}
                        className={`sub-menu ${
                          openMenu === parent.m_id ? "active" : ""
                        }`}
                      >
                        <div
                          onClick={() => toggleMenu(parent.m_id)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa fa-book"></i>
                          <span className="ms-2">{parent.m_menuname}</span>
                        </div>

                        {openMenu === parent.m_id && (
                          <ul className="sub">
                            {childMenus.map((child) => (
                              <li key={child.m_id}>
                                <NavLink to={`/${child.m_action}`}>
                                  {child.m_menuname}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    </>
                  );
                })}
                {/* <li className={`sub-menu ${isVisitor ? 'active' : ''}`}>
                                    <div onClick={toggleVisitor} style={{ cursor: 'pointer' }}>
                                        <i className="fa fa-book"></i>
                                        <span className="ms-2">Reports</span>
                                    </div>

                                    {isVisitor && (
                                        <ul className="sub">
                                            <li><NavLink to="/reports">Reports</NavLink></li>

                                        </ul>
                                    )}
                                </li>  */}
              </ul>
              {/* </ul> */}
            </div>
            {/* <!-- sidebar menu end--> */}
          </div>
        </aside>
        <TheContent />
      </section>
      {/* <!--main content end--> */}
      {/* </section> */}
    </>
  );
};

export default Sidebar;
