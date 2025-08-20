import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { AddEmployeeApi, getEmployeeApi } from "../../../Api/EmployeeMasterApi";
import { getAllDepartmentApi } from "../../../Api/DepartmentMasterApi";

const AddEmployeeMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employeeId } = location.state || {};
  console.log(employeeId, "employeeId");

  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [department, setDepartment] = useState("");
  const [allDepartment, setAllDepartment] = useState([]);

  useEffect(() => {
    if (employeeId != null) {
      // covers both null and undefined
      getEmployeeData();
    }
  }, [employeeId]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllDepartment();
    };
    fetchData();
  }, []);

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
    setDepartment(selectedValue);
    console.log(selectedValue, "selected value");
  };

  const AddEmployee = async () => {
    const data = await AddEmployeeApi(
      employeeCode,
      employeeName,
      email,
      mobileNo,
      department,
      employeeId,
      navigate
    );
    if (data) {
      console.log(data);
      navigate("/employeeMaster");
    }
  };

  const getEmployeeData = async () => {
    const data = await getEmployeeApi(employeeId, navigate);
    console.log(data);
    setEmployeeCode(data.EmployeeCode);
    setEmployeeName(data.EmployeeName);
    setEmail(data.Email);
    setMobileNo(data.MobileNo);
    setDepartment({
      value: data.DepartmentId,
      label: `${data.DepartmentName}`,
    });
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
                            id="employeeCode"
                            className="form-control mt-3"
                            placeholder="Enter Employee Code"
                            value={employeeCode}
                            // onChange={(e) => setEmployeeCode(e.target.value)}
                            maxLength={4}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^[0-9]*$/.test(value)) {
                                setEmployeeCode(value);
                              }
                            }}
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
                          <span className="text-danger fw-bold">*</span>
                          <input
                            type="text"
                            id="employeeName"
                            className="form-control mt-3"
                            placeholder="Enter Employee Name"
                            value={employeeName}
                            // onChange={(e) => setEmployeeName(e.target.value)}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only alphabets and spaces
                              if (/^[a-zA-Z\s]*$/.test(value)) {
                                setEmployeeName(value);
                              }
                            }}
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
                            // onChange={(e) => setEmail(e.target.value)}
                             onChange={(e) => {
                              const value = e.target.value;
                              // Allow only valid email characters while typing
                              if (/^[a-zA-Z0-9@._-]*$/.test(value)) {
                                setEmail(value);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                        <div className="form-group form-group-sm">
                          <label className="control-label fw-bold">
                            Mobile No:
                          </label>{" "}
                          <span className="text-danger fw-bold">*</span>
                          <input
                            type="text"
                            id="mobileNo"
                            className="form-control mt-3"
                            placeholder="Enter Mobile No"
                            value={mobileNo}
                            // onChange={(e) => setMobileNo(e.target.value)}
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
                            onChange={handleDepartment}
                            options={allDepartment}
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
                            AddEmployee();
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
