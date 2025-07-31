import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Pagination } from "../../../Utils/Pagination";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure this is loaded once globally
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import { deleteEmployeeApi, getAllEmployeeApi } from "../../../Api/EmployeeMasterApi";
import { Delete, Edit } from "@material-ui/icons";

const EmployeeMaster = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [allEmployee, setAllEmployee] = useState([]); // Dummy empty state
    const [searchData, setSearchData] = useState("")

    useEffect(() => {
        getAllEmployee();
    }, [currentPage, itemsPerPage]);

    const getAllEmployee = async () => {
        const data = await getAllEmployeeApi(navigate);
        console.log(data)
        setAllEmployee(data)
    }

    const getEmployeeData = (employeeId) => {
        navigate('/addEmployeeMaster', { state: { employeeId } });
    };

    const DeleteEmployeeData = async (employeeId) => {
        const data = await deleteEmployeeApi(employeeId, navigate);
        console.log(data)
        getAllEmployee()
    }

    const handleSearch = (e) => {
        const searchDataValue = e.target.value.toLowerCase();
        setSearchData(searchDataValue);

        if (searchDataValue.trim() === "") {
            getAllEmployee();
        } else {
            const filteredData = allEmployee.filter(
                (employee) =>
                    employee.EmployeeCode.toLowerCase().includes(searchDataValue) ||
                    employee.EmployeeName.toLowerCase().includes(searchDataValue)

            );
            setAllEmployee(filteredData);
            setCurrentPage(1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allEmployee.slice(indexOfFirstItem, indexOfLastItem);

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
                                                <h3>Employee Master</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                                {/* <Button onClick={handleNavigate}  style={headerCellStyle}>
                                                    Add
                                                </Button> */}
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => navigate("/addEmployeeMaster")}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body pt-3">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start">
                                                <h6 className="mt-2">Show</h6>&nbsp;&nbsp;
                                                <select className="form-select w-auto" style={{ height: "35px" }}>
                                                    <option value="10">10</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                &nbsp;&nbsp;
                                                <h6 className="mt-2">entries</h6>
                                            </div>

                                            <div className="col-lg-6 col-md-6"></div>

                                            <div className="col-lg-3 col-md-3 d-flex justify-content-lg-end mt-lg-0 mt-md-0 mt-3">
                                                <input className="form-control" placeholder="Search here" value={searchData}
                                                    onChange={handleSearch} />
                                            </div>
                                        </div>

                                        <br />

                                        <Table striped hover responsive className="border text-left">
                                            <thead>
                                                <tr>
                                                    <th style={headerCellStyle}>Sr.No</th>
                                                    <th style={headerCellStyle}>Employee Code</th>
                                                    <th style={headerCellStyle}>Employee Name</th>
                                                    <th style={headerCellStyle}>Email</th>
                                                    <th style={headerCellStyle}>Mobile No</th>
                                                    <th style={headerCellStyle}>Department</th>
                                                    <th style={headerCellStyle}>Status</th>
                                                    <th style={{ ...headerCellStyle, textAlign: "center" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((data, index) => (
                                                    <tr key={data.Id}>
                                                        <td>
                                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                                        </td>
                                                        <td>{data.EmployeeCode}</td>
                                                        <td>{data.EmployeeName}</td>
                                                        <td>{data.Email}</td>
                                                        <td>{data.MobileNo}</td>
                                                        <td>{data.DepartmentName}</td>
                                                        <td>{data.IsActive === true ? "Active" : "Inactive"}</td>
                                                        <td>
                                                            <div className="d-flex ">
                                                                <Edit
                                                                    className="text-success mr-2"
                                                                    type="button"
                                                                    onClick={() => getEmployeeData(data.Id)}

                                                                />
                                                                <Delete
                                                                    className="text-danger"
                                                                    type="button"
                                                                    onClick={() => DeleteEmployeeData(data.Id)}

                                                                /> </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

                                        <div className="row mt-4 mt-xl-3">
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <h6 className="text-lg-start text-center"> Showing {indexOfFirstItem + 1} to{" "}
                                                    {Math.min(indexOfLastItem, allEmployee.length)} of{" "}
                                                    {allEmployee.length} entries</h6>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12"></div>
                                            <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                                                <Pagination
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    allData={allEmployee}
                                                    itemsPerPage={itemsPerPage}
                                                />
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

export default EmployeeMaster;
