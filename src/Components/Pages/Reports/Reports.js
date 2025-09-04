import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Pagination } from "../../Utils/Pagination";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure this is loaded once globally
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import { getPassApi, getReportsApi } from "../../Api/ReportsApi";
import Select from "react-select";
import CryptoJS from "crypto-js";
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
    const [allVisitorsType, setAllVisitorsType] = useState([]);
    const [visitorsType, setVisitorsType] = useState("")
    const [secretKey, setSecretKey] = useState("");
    const [photopathIV, setPhotopathIv] = useState("")
    const [rowId, setRowId] = useState("")
    const [visitorName, setVisitorName] = useState("")
    const [visitorCompany, setVisitorCompany] = useState("")
    const [purpose, setPurpose] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [visitTime, setVisitTime] = useState("")
    const [exitTime, setExitTime] = useState("")
    const [passNo, setPassNo] = useState("")
    const [photo, setPhoto] = useState(null)

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
        const data = await getReportsApi(visitorsType, date, navigate);
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

    const getPassData = async (reportId) => {
        const data = await getPassApi(reportId, navigate)
        console.log(data);
        setVisitorName(data.FullName)
        setVisitorCompany(data.CompanyName)
        setMobileNo(data.MobileNumber)
        setPurpose(data.PurposeName)
        setVisitTime(data.VisitTime)
        setExitTime(data.ExitTime)
        setPassNo(data.PassNo)
        setPhoto(data.PhotoPath)
        setSecretKey(data.secretKey)
    }

    const handleVisitorsType = async (selectedValue) => {
        setVisitorsType(selectedValue)
        console.log(selectedValue, "visitorsType")
        const data = await getReportsApi(selectedValue, date, navigate);
        setAllReports(data)
    }

    const handleChangeDate = async (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        console.log(newDate);
        console.log(date)
        const data = await getReportsApi(visitorsType, newDate, navigate);
        setAllReports(data)
        // getAllReports();
    };

    const handleSearch = (e) => {
        const searchDataValue = e.target.value.toLowerCase();
        setSearchData(searchDataValue);

        if (searchDataValue.trim() === "") {
            getAllReports();
        } else {
            const filteredData = allReports.filter((reports) => {
                const FullName = reports.FullName ? reports.FullName.toLowerCase() : '';
                const Email = reports.Email ? reports.Email.toLowerCase() : '';
                return FullName.includes(searchDataValue) || Email.includes(searchDataValue);
            });
            setAllReports(filteredData);
            setCurrentPage(1);
        }
    };

    const getSecretKey = (Id, secretKey, photopathIV) => {
        setSecretKey(secretKey);
        setPhotopathIv(photopathIV)
        setRowId(Id)
    };

    const decryptImage = useCallback((encryptedImage) => {

        try {
            const [ivHex, encryptedHex] = encryptedImage.split(":"); // Split IV and ciphertext
            // console.log(ivHex, "ivHex")
            const key = CryptoJS.enc.Hex.parse(secretKey); // Parse secret key
            const iv = CryptoJS.enc.Hex.parse(ivHex); // Parse IV
            // Decrypt the image
            const decryptedBytes = CryptoJS.AES.decrypt(
                { ciphertext: CryptoJS.enc.Hex.parse(encryptedHex) },
                key,
                { iv, padding: CryptoJS.pad.Pkcs7 } // Use Pkcs7 padding
            );
            // Convert decrypted WordArray back to Base64 string
            const decryptedBase64 = CryptoJS.enc.Base64.stringify(decryptedBytes);
            // console.log(`data:image/png;base64,${decryptedBase64}`)
            return `data:image/png;base64,${decryptedBase64}`; // Return image in Base64 format
        } catch (error) {
            console.error("Error during decryption:", error);
            return ""; // Return empty string if error occurs
        }
    }, [secretKey]);

    const decryptedImage1 = photo && secretKey
        ? decryptImage(photo)
        : "";
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allReports.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <style>
                {

                    `@media print {
  body * {
    visibility: hidden;
  }

  #section-to-print,
  #section-to-print * {
    visibility: visible;
  }

  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
    width: 100% !important;
    height: auto;
    background: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .card-header {
    background-color: green !important;
    color: white !important;
  }

  .card {
    border: 1px solid #ccc !important;
    padding: 10px;
  }

  .card-footer {
    background-color: #f8f9fa !important;
  }


  .card,
  .modal-body {
    box-shadow: none !important;
    border-radius: 0 !important;
  }
    .label {
    font-weight: bold;
    margin-right: 10px;
    
  }

  .value {
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-left: 20px;
  }
}`

                }
            </style>
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
                                                {/* <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                               
                                                >
                                                    Print
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body mx-3" style={{ backgroundColor: "rgb(240, 188, 180)" }}>
                                        {/* <div className="container-fluid" > */}
                                        <div className="row py-2" /* style={{backgroundColor:"rgb(240, 188, 180)"}} */>
                                            <div className="col-lg-4">
                                                <input
                                                    type="date"
                                                    id="expectedTime"
                                                    className="form-control mt-1"

                                                    value={date}
                                                    onChange={handleChangeDate}
                                                />
                                            </div>
                                            {/* <div className="col-lg-4">
                                                <Select
                                                    className="mt-1"
                                                    value={employee}
                                                    // onChange={handlePurpose}
                                                    options={allEmployee}
                                                    placeholder="Select Host Name"

                                                />
                                            </div> */}
                                            {/* <div className="col-lg-3">
                                                <Select
                                                    className="mt-1"
                                                    // value={purposeOfVisit}
                                                    // onChange={handlePurpose}
                                                    options={allDeparment}
                                                    placeholder="Select Department"

                                                />
                                            </div> */}
                                            <div className="col-lg-5">
                                                <Select
                                                    className="mt-1"
                                                    value={visitorsType}
                                                    onChange={handleVisitorsType}
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
                                                    {/* <th style={headerCellStyle}>Host Name</th>
                                                    <th style={headerCellStyle}>Host Department</th> */}
                                                    <th style={headerCellStyle}>Purpose of Visit</th>
                                                    <th style={headerCellStyle}>Visitor ID/Pass No.</th>
                                                    {/* <th style={headerCellStyle}>Visitor Address</th> */}
                                                    {/* <th style={headerCellStyle}>Status</th> */}
                                                    <th style={headerCellStyle}>Photo</th>
                                                    <th style={headerCellStyle}>Pass</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((data, index) => {
                                                    const decryptedImage = data.PhotoPath && data.secretKey
                                                        ? decryptImage(data.PhotoPath)
                                                        : "";
                                                    return (
                                                        <tr key={data.Id}>
                                                            <td>
                                                                {(currentPage - 1) * itemsPerPage + index + 1}
                                                            </td>
                                                            <td>{data.FullName}</td>
                                                            <td>{data.VisitorTypeName}</td>
                                                            <td>{data.Email}</td>
                                                            <td>{data.MobileNumber}</td>
                                                            <td>{data.VisitTime ? data.VisitTime.split("T")[0] : null}</td>
                                                            <td>{data.ExitTime}</td>
                                                            {/* <td>abc</td>
                                                            <td>IT</td> */}
                                                            <td>{data.PurposeName}</td>
                                                            <td>dfgd</td>
                                                            {/* <td>{data.ApprovalStatus}</td> */}
                                                            <td>
                                                                {rowId === data.Id ? (
                                                                    <img
                                                                        src={decryptedImage}
                                                                        alt="Decrypted"
                                                                        style={{ width: "100px", height: "auto" }}
                                                                    />
                                                                ) : (
                                                                    <button
                                                                        className="btn"
                                                                        style={headerCellStyle}
                                                                        onClick={() => {

                                                                            getSecretKey(data.Id, data.secretKey, data.PhotopathIV);
                                                                        }}
                                                                    >
                                                                        View
                                                                    </button>
                                                                )}
                                                            </td>
                                                            <td> <button
                                                                className="btn"
                                                                style={headerCellStyle}
                                                                data-toggle="modal" data-target="#exampleModal"
                                                                onClick={() => { getPassData(data.Id); getSecretKey(data.Id, data.secretKey, data.PhotopathIV); }}
                                                            >
                                                                View
                                                            </button></td>
                                                        </tr>
                                                    )
                                                })}
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
                    <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">One Day Pass</h4>
                                    <button className="btn btn-success float-end" onClick={() => window.print()}>Print</button>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body" id="section-to-print">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6">
                                            <div className="card position-relative">
                                                {/* Profile Icon (Left side) */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "23px",
                                                        left: "35px",
                                                        zIndex: 10,
                                                        width: "75px",
                                                        height: "75px",
                                                        backgroundColor: "#fff",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        border: "2px solid #ccc"
                                                    }}
                                                >
                                                    {/* <i className="bi bi-person-circle" style={{ fontSize: "40px", color: "gray" }}> */}
                                                    <img
                                                        src={decryptedImage1}
                                                        alt="Decrypted"
                                                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                                    />
                                                    {/* </i> */}
                                                </div>

                                                {/* Card Header */}
                                                <div className="card-header py-3" style={{ backgroundColor: "green", color: "white" }}>
                                                    <h4 className="text-center mb-0">One Day Pass</h4>
                                                </div>

                                                {/* Card Body */}
                                                <div className="card-body mt-5">
                                                    <div className="row">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Visitor Entry Code</h5></div>
                                                        <div className="col-lg-6 value"><h5>{passNo}</h5></div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Visitor Name</h5></div>
                                                        <div className="col-lg-6 value"><h5>{visitorName}</h5></div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Visitor Company</h5></div>
                                                        <div className="col-lg-6 value"><h5>{visitorCompany}</h5></div>
                                                    </div>
                                                    {/* <div className="row mt-3">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Host</h5></div>
                                                        <div className="col-lg-6 value"><h5>Admin</h5></div>
                                                    </div> */}
                                                    <div className="row mt-3">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Purpose</h5></div>
                                                        <div className="col-lg-6 value"><h5>{purpose}</h5></div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Mobile No</h5></div>
                                                        <div className="col-lg-6 value"><h5>{mobileNo}</h5></div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Valid From</h5></div>
                                                        <div className="col-lg-6 value"><h5>{visitTime ? visitTime.split("T")[0] : null}</h5></div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Valid To</h5></div>
                                                        <div className="col-lg-6 value"><h5>{exitTime}</h5></div>
                                                    </div>
                                                    {/* <div className="row mt-3">
                                                        <div className="col-lg-6 label text-dark"><h5 className="text-start ps-3">Area</h5></div>
                                                        <div className="col-lg-6 value"><h5>IT</h5></div>
                                                    </div> */}
                                                </div>

                                                {/* Card Footer */}
                                                <div className="card-footer py-3">
                                                    <div className="row">
                                                        <div className="col-lg-6"><h4>DIIS</h4></div>
                                                        <div className="col-lg-6">
                                                            <h4>Auth Sign</h4>
                                                            <h5 className="mt-2">......</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
