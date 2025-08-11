import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Pagination } from "../../Utils/Pagination";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure this is loaded once globally
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@material-ui/icons";
import Select from "react-select";
import CryptoJS from "crypto-js";
import { getAllEmployeeApi } from "../../Api/EmployeeMasterApi";
import { getAllDepartmentApi } from "../../Api/DepartmentMasterApi";
import { getAllVisitorTypeApi } from "../../Api/VisitorTypeMasterApi";
import { AddApproverApi, getAllApproverApi, getApproverApi } from "../../Api/ApproverApi";

const Approver = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [allApprover, setAllApprover] = useState([]); // Dummy empty state
    const [searchData, setSearchData] = useState("");
    const [date, setDate] = useState("")
    const [allEmployee, setAllEmployee] = useState([]);
    const [employee, setEmployee] = useState("")
    const [allDeparment, setAllDepartment] = useState([]);
    const [department, setDepartment] = useState("")
    const [allVisitorsType, setAllVisitorsType] = useState([]);
    const [approval, setApproval] = useState("")
    const [secretKey, setSecretKey] = useState("");
    const [photopathIV, setPhotopathIv] = useState("")
    const [rowId, setRowId] = useState("")
    const [approvalId, setApprovalId] = useState("")

    useEffect(() => {
        getallApprover();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const fetchData = async () => {

            await getAllEmployee();
            // await getAllDepartment();
            // await getAllVisitorsType();
        };
        fetchData();
    }, []);

    const getallApprover = async () => {
        const data = await getAllApproverApi(navigate);
        console.log(data)
        setAllApprover(data)
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

    const getApproverData = async (approverId) => {
        const data = await getApproverApi(approverId, navigate);
        console.log(data);
        setApprovalId(data.Id)
    }

    const AddApproval = async () => {
        const data = await AddApproverApi(approval, approvalId, navigate);
        console.log(data)
        getallApprover()
    }

    const statusOptions = [
        { value: "Approved", label: "Approved" },
        { value: "Reject", label: "Rejected" }
    ];

    const handleChangeApprover = (selectedValue) => {
        console.log(selectedValue)
        setApproval(selectedValue)
    }

    const handleSearch = (e) => {
        const searchDataValue = e.target.value.toLowerCase();
        setSearchData(searchDataValue);

        if (searchDataValue.trim() === "") {
            getallApprover();
        } else {
            const filteredData = allApprover.filter(
                (department) =>
                    department.DepartmentCode.toLowerCase().includes(searchDataValue) ||
                    department.DepartmentName.toLowerCase().includes(searchDataValue)

            );
            setAllApprover(filteredData);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allApprover.slice(indexOfFirstItem, indexOfLastItem);

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
                                                <h3>Approval</h3>
                                            </div>
                                            {/* <div className="col-lg-2 d-flex justify-content-end">
                                            
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                // onClick={() => navigate("/addDepartmentMaster")}
                                                >
                                                    Add
                                                </button>
                                            </div> */}
                                        </div>
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
                                                    {/* <th style={headerCellStyle}>Visitor Address</th> */}
                                                    <th style={headerCellStyle}>Status</th>
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
                                                            <td>{data.VisitTime}</td>
                                                            <td>{data.ExitTime}</td>
                                                            <td>abc</td>
                                                            <td>IT</td>
                                                            <td>{data.PurposeName}</td>
                                                            <td>dfgd</td>
                                                            <td>{data.ApprovalStatus}</td>
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
                                                            {/* <td> <button
                                                                className="btn"
                                                                style={headerCellStyle}
                                                                data-toggle="modal" data-target="#exampleModal"
                                                            >
                                                                View
                                                            </button></td> */}
                                                            <td>
                                                                <div className="d-flex ">
                                                                    <Edit
                                                                        className="text-success mr-2"
                                                                        type="button"
                                                                        data-toggle="modal" data-target="#exampleModal"
                                                                        onClick={() => getApproverData(data.Id)}

                                                                    />
                                                                    {/* <Delete
                                                                                                                                className="text-danger"
                                                                                                                                type="button"
                                                                                                                                onClick={() => DeleteDepartmentData(data.Id)}
                                                            
                                                                                                                            />  */}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>

                                        <div className="row mt-4 mt-xl-3">
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <h6 className="text-lg-start text-center"> Showing {indexOfFirstItem + 1} to{" "}
                                                    {Math.min(indexOfLastItem, allApprover.length)} of{" "}
                                                    {allApprover.length} entries</h6>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12"></div>
                                            <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                                                <Pagination
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    allData={allApprover}
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
                                    <h4 className="modal-title" id="exampleModalLabel">Add Approval</h4>
                                    {/* <button className="btn" onClick={() => window.print()}>Print</button> */}
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body" >
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <Select
                                                        className="mt-3"
                                                        value={approval}
                                                        onChange={handleChangeApprover}
                                                        options={statusOptions}
                                                        placeholder="Select Approval"

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={AddApproval}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Approver;
