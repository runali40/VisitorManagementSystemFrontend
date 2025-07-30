import React, { useState } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Pagination } from "../../../Utils/Pagination";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddEmployeeMaster = () => {
    const navigate = useNavigate();
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [allVisitors] = useState([]); // Dummy empty state
    const [showModal, setShowModal] = useState(false);
    const [employeeCode, setEmployeeCode] = useState("")
    const [employeeName, setEmployeeName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [department, setDepartment] = useState("")

    const handleShow = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

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
                                                <h3>Add Employee</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                               
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => navigate("/employeeMaster")}
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
                                                        Employee Code:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="dutyName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Employee Code"
                                                        value={employeeCode}
                                                        onChange={(e) => setEmployeeCode(e.target.value)}
                                                    />
                                                    {/* <Select
                                                        className="mt-3"
                                                        value={dutyName}
                                                        onChange={handleDutyName}
                                                        options={allDutyName}
                                                        placeholder="Select Duty Name"

                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Employee Name:
                                                    </label>{" "}
                                                    <input
                                                        type="text"
                                                        id="dutyName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Employee Name"
                                                        value={employeeName}
                                                        onChange={(e) => setEmployeeName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                          <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Email:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="dutyName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Mobile No:
                                                    </label>{" "}
                                                    <input
                                                        type="text"
                                                        id="mobileNo"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Mobile No"
                                                        value={mobileNo}
                                                        onChange={(e) => setMobileNo(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                          <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Department:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <Select
                                                        className="mt-3"
                                                        value={department}
                                                        // onChange={handleDutyName}
                                                        // options={allDutyName}
                                                        placeholder="Select Department"

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
                                                        // addRoleMaster();
                                                        // editDesignation();
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

export default AddEmployeeMaster;
