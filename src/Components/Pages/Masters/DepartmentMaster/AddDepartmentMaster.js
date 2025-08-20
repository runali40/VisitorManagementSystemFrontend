import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AddDepartmentApi,
  getDepartmentApi,
} from "../../../Api/DepartmentMasterApi";

const AddDepartmentMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { departmentId } = location.state || {};
  console.log(departmentId, "departmentId");
  const headerCellStyle = {
    backgroundColor: "#8b5c7e",
    color: "#fff",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [allVisitors] = useState([]); // Dummy empty state
  const [showModal, setShowModal] = useState(false);
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    if (departmentId != null) {
      // covers both null and undefined
      getDepartmentData();
    }
  }, [departmentId]);

  const AddDepartment = async () => {
    const data = await AddDepartmentApi(
      departmentCode,
      departmentName,
      departmentId,
      navigate
    );
    if (data) {
      console.log(data);
      navigate("/departmentMaster");
    }
  };

  const getDepartmentData = async () => {
    const data = await getDepartmentApi(departmentId, navigate);
    console.log(data);
    setDepartmentName(data.DepartmentName);
    setDepartmentCode(data.DepartmentCode);
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
                        <h3>Add Department</h3>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-end">
                        <button
                          className="btn btn-md text-light"
                          type="button"
                          style={{ backgroundColor: "#8b5c7e" }}
                          onClick={() => navigate("/departmentMaster")}
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
                            Department Code:
                          </label>{" "}
                          <span className="text-danger fw-bold">*</span>
                          <input
                            type="text"
                            id="dutyName"
                            className="form-control mt-3"
                            placeholder="Enter Department Code"
                            value={departmentCode}
                            // onChange={(e) => setDepartmentCode(e.target.value)}
                            maxLength={4}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^[0-9]*$/.test(value)) {
                                setDepartmentCode(value);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                        <div className="form-group form-group-sm">
                          <label className="control-label fw-bold">
                            Department Name:
                          </label>{" "}
                          <span className="text-danger fw-bold">*</span>
                          <input
                            type="text"
                            id="departmentName"
                            className="form-control mt-3"
                            placeholder="Enter Department Name"
                            value={departmentName}
                            // onChange={(e) => setDepartmentName(e.target.value)}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only alphabets and spaces
                              if (/^[a-zA-Z\s]*$/.test(value)) {
                                setDepartmentName(value);
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
                            AddDepartment();
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

export default AddDepartmentMaster;
