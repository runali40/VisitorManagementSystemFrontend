import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Pagination } from "../../Utils/Pagination";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure this is loaded once globally
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import { getReportsApi } from "../../Api/ReportsApi";
import Select from "react-select";
import { getAllEmployeeApi } from "../../Api/EmployeeMasterApi";
import { getAllDepartmentApi } from "../../Api/DepartmentMasterApi";
import { getAllVisitorTypeApi } from "../../Api/VisitorTypeMasterApi";

const Reports = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [allReports, setAllReports] = useState([]); // Dummy empty state
    const [searchData, setSearchData] = useState("");
    const [date, setDate] = useState("")
    const [allEmployee, setAllEmployee] = useState([]);
    const [employee, setEmployee] = useState("")
    const [allDeparment, setAllDepartment] = useState([]);
    const [department, setDepartment] = useState("")
    const [allVisitorsType, setAllVisitorsType] = useState([]);
    const [visitorsType, setVisitorsType] = useState("")

    useEffect(() => {
        getAllReports();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const fetchData = async () => {

            await getAllEmployee();
            await getAllDepartment();
            await getAllVisitorsType();
        };
        fetchData();
    }, []);

    const getAllReports = async () => {
        const data = await getReportsApi(navigate);
        console.log(data)
        setAllReports(data)
    }

    const getAllEmployee = async () => {
        const data = await getAllEmployeeApi(navigate);
        console.log(data)
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.EmployeeName}`,
        }));
        setAllEmployee(options);
    }

    const getAllDepartment = async () => {
        const data = await getAllDepartmentApi(navigate);
        console.log(data)
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.DepartmentName}`,
        }));
        setAllDepartment(options);
    }

    const getAllVisitorsType = async () => {
        const data = await getAllVisitorTypeApi(navigate);
        console.log(data)
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.VisitorTypeName}`,
        }));
        setAllVisitorsType(options);
    }

    const handleSearch = (e) => {
        const searchDataValue = e.target.value.toLowerCase();
        setSearchData(searchDataValue);

        if (searchDataValue.trim() === "") {
            getAllReports();
        } else {
            const filteredData = allReports.filter(
                (department) =>
                    department.DepartmentCode.toLowerCase().includes(searchDataValue) ||
                    department.DepartmentName.toLowerCase().includes(searchDataValue)

            );
            setAllReports(filteredData);
            setCurrentPage(1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allReports.slice(indexOfFirstItem, indexOfLastItem);

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
                                                <h3>Reports</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                                {/* <Button onClick={handleNavigate}  style={headerCellStyle}>
                                                    Add
                                                </Button> */}
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                // onClick={() => navigate("/addDepartmentMaster")}
                                                >
                                                    Print
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body mx-3" style={{ backgroundColor: "rgb(240, 188, 180)" }}>
                                        {/* <div className="container-fluid" > */}
                                        <div className="row py-2" /* style={{backgroundColor:"rgb(240, 188, 180)"}} */>
                                            <div className="col-lg-3">
                                                <input
                                                    type="date"
                                                    id="expectedTime"
                                                    className="form-control mt-1"

                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-3">
                                                <Select
                                                    className="mt-1"
                                                    value={employee}
                                                    // onChange={handlePurpose}
                                                    options={allEmployee}
                                                    placeholder="Select Host Name"

                                                />
                                            </div>
                                            <div className="col-lg-3">
                                                <Select
                                                    className="mt-1"
                                                    // value={purposeOfVisit}
                                                    // onChange={handlePurpose}
                                                    options={allDeparment}
                                                    placeholder="Select Department"

                                                />
                                            </div>
                                            <div className="col-lg-3">
                                                <Select
                                                    className="mt-1"
                                                    value={visitorsType}
                                                    // onChange={handlePurpose}
                                                    options={allVisitorsType}
                                                    placeholder="Select Visitor Type"

                                                />
                                            </div>
                                        </div>
                                        {/* </div> */}



                                    </div>
                                    <div className="card-body">
                                        <div className="row mt-4">
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
                                                    <th style={headerCellStyle}>Visitor Name</th>
                                                    <th style={headerCellStyle}>Visitor Type</th>
                                                    <th style={headerCellStyle}>Email ID</th>
                                                    <th style={headerCellStyle}>Mobile No.</th>
                                                    <th style={headerCellStyle}>Visit Date & Time</th>
                                                    <th style={headerCellStyle}>Check-out Time</th>
                                                    <th style={headerCellStyle}>Host Name</th>
                                                    <th style={headerCellStyle}>Host Department</th>
                                                    <th style={headerCellStyle}>Purpose of Visit</th>
                                                    <th style={headerCellStyle}>Visitor ID/Pass No.</th>
                                                    <th style={headerCellStyle}>Visitor Address</th>
                                                    <th style={headerCellStyle}>Status</th>
                                                    <th style={headerCellStyle}>Photo</th>
                                                    <th style={headerCellStyle}>Pass</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((data, index) => (
                                                    <tr key={data.Id}>
                                                        <td>
                                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                                        </td>
                                                        <td>{data.DepartmentCode}</td>
                                                        <td>{data.DepartmentName}</td>
                                                        <td> <button
                                                                        className="btn"
                                                                        style={headerCellStyle}
                                                            // onClick={() => {

                                                            //     getSecretKey(data.Id, data.secretKey, data.PhotopathIV);
                                                            // }}
                                                                    >
                                                                        View
                                                                    </button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

                                        <div className="row mt-4 mt-xl-3">
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <h6 className="text-lg-start text-center"> Showing {indexOfFirstItem + 1} to{" "}
                                                    {Math.min(indexOfLastItem, allReports.length)} of{" "}
                                                    {allReports.length} entries</h6>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12"></div>
                                            <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                                                <Pagination
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    allData={allReports}
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

export default Reports;
