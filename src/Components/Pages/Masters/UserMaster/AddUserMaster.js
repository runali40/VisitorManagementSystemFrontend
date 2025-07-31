import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Pagination } from "../../../Utils/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { AddUserApi, getUserApi } from "../../../Api/UserMasterApi";
import { getAllEmployeeApi } from "../../../Api/EmployeeMasterApi";

const AddUserMaster = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { uId } = location.state || {};
    console.log(uId, "uId")

    const [username, setUsername] = useState("")
    const [employeeName, setEmployeeName] = useState("")
    const [allEmployee, setAllEmployee] = useState([])
    const [role, setRole] = useState("")

    useEffect(() => {
        if (uId != null) { // covers both null and undefined
            getUserData();
        }
    }, [uId]);

    useEffect(() => {
        const fetchData = async () => {

            await getAllEmployee();
        };
        fetchData();
    }, []);

    const getAllEmployee = async () => {
        const data = await getAllEmployeeApi(navigate);
        console.log(data)
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.EmployeeName}`,
        }));
        setAllEmployee(options);
    }

    const handleEmployee = (selected) => {
        const selectedValue = selected;
        setEmployeeName(selectedValue);
        console.log(selectedValue, "selected value");
    }

    const AddUser = async () => {
        const data = await AddUserApi(username, employeeName, role, uId, navigate);
        console.log(data)
        navigate("/userMaster")
    }

    const getUserData = async () => {
        const data = await getUserApi(uId, navigate);
        console.log(data)
        setUsername(data.um_user_name)
        // setEmail(data.Email)
        // setMobileNo(data.MobileNo)
        setEmployeeName({
            value: data.EmployeeId,
            label: `${data.EmployeeName}`,
        })
    }

    return (
        <>
            <section id="main-content">
                <section className="wrapper">
                    <div className="container-fluid">
                        <div className="card m-3" style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card-header m-3">
                                        <div className="row">
                                            <div className="col-lg-10">
                                                <h3>Add User</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">

                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => navigate("/userMaster")}
                                                >
                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pt-3">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Username:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="dutyName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Employee:
                                                    </label>{" "}
                                                    <Select
                                                        className="mt-3"
                                                        value={employeeName}
                                                        onChange={handleEmployee}
                                                        options={allEmployee}
                                                        placeholder="Select Employee"

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Role:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <Select
                                                        className="mt-3"
                                                        value={role}
                                                        // onChange={handleDutyName}
                                                        // options={allDutyName}
                                                        placeholder="Select Role"

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-lg-12 text-end">
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => {
                                                        AddUser();

                                                    }}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default AddUserMaster;
