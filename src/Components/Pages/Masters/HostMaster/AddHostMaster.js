import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { useNavigate, useLocation } from "react-router-dom";
import {
    AddDepartmentApi,
    getAllDepartmentApi,
    getDepartmentApi,
} from "../../../Api/DepartmentMasterApi";
import { AddHostApi, getHostApi } from "../../../Api/HostMasterApi";

const AddHostMaster = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hostId } = location.state || {};
    console.log(hostId, "hostId");

    const [departmentName, setDepartmentName] = useState("");
    const [allDepartment, setAllDepartment] = useState([]);
    const [hostName, setHostName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [designation, setDesignation] = useState("")
    const [hId, setHId] = useState("")


    useEffect(() => {
        if (hostId != null) {
            // covers both null and undefined
            getHostData();
        }
    }, [hostId]);

    useEffect(() => {
        const fetchData = async () => {
            await getAllDepartment();
        };
        fetchData();
    }, []);

    const AddHost = async () => {
        const data = await AddHostApi(
            hostName,
            departmentName,
            designation,
            email,
            mobileNo,
            hId,
            navigate
        );
        if (data) {
            console.log(data);
            navigate("/hostMaster");
        }
    };

    const getAllDepartment = async () => {
        const data = await getAllDepartmentApi(navigate);
        console.log(data);
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.DepartmentName}`,
        }));
        setAllDepartment(options);
    };

    const handleDepartment = (selected) => {
        const selectedValue = selected;
        setDepartmentName(selectedValue);
        console.log(selectedValue, "selected value");
    };

    const getHostData = async () => {
        const data = await getHostApi(hostId, navigate);
        console.log(data);
        setHostName(data.HostName);
        setEmail(data.Email)
        setDesignation(data.Designation)
        setMobileNo(data.MobileNumber)
        setDepartmentName({
            value: data.DepartmentId,
            label: data.DepartmentName
        })
        setHId(data.Id);
    };

    return (
        <>
            <section id="main-content">
                <section className="wrapper">
                    <div className="container-fluid">
                        <div
                            className="card m-3"
                            style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card-header m-3">
                                        <div className="row">
                                            <div className="col-lg-10">
                                                <h3>Add Host</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => navigate("/hostMaster")}
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
                                                        Host Name:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="hostName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Host Name"
                                                        value={hostName}
                                                        // onChange={(e) => setDepartmentCode(e.target.value)}
                                                        // maxLength={4}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (/^[a-zA-Z\s]*$/.test(value)) {
                                                                setHostName(value);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Department:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <Select
                                                        className="mt-3"
                                                        value={departmentName}
                                                        onChange={handleDepartment}
                                                        options={allDepartment}
                                                        placeholder="Select Department"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Designation:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="designation"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Designation"
                                                        value={designation}
                                                        // onChange={(e) => setDepartmentCode(e.target.value)}
                                                        // maxLength={4}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Allow only alphabets and spaces
                                                            if (/^[a-zA-Z\s]*$/.test(value)) {
                                                                setDesignation(value);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Email:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Email"
                                                        value={email}
                                                        // onChange={(e) => setDepartmentName(e.target.value)}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Allow only alphabets and spaces
                                                            if (/^[a-zA-Z0-9@._-]*$/.test(value)) {
                                                                setEmail(value);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Mobile No:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="designation"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Mobile No"
                                                        value={mobileNo}
                                                        // onChange={(e) => setDepartmentCode(e.target.value)}
                                                        // maxLength={4}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Allow only numbers and max 10 digits
                                                            if (/^[0-9]{0,10}$/.test(value)) {
                                                                setMobileNo(value);
                                                            }
                                                        }}
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
                                                        AddHost();
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

export default AddHostMaster;
