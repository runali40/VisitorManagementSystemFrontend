import React, { useState, useEffect, useCallback } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Pagination } from "../../Utils/Pagination";
import CryptoJS from "crypto-js";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure this is loaded once globally
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
import { deleteEmployeeApi, getAllEmployeeApi } from "../../Api/EmployeeMasterApi";
import { deleteVisitorApi, getAllVisitorApi } from "../../Api/VisitorFormApi";

const Visitor = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [allVisitors, setAllVisitors] = useState([]); // Dummy empty state
    const [searchData, setSearchData] = useState("")
    const [secretKey, setSecretKey] = useState("");
    const [photopathIV, setPhotopathIv] = useState("")
    const [rowId, setRowId] = useState("")

    useEffect(() => {


        const fetchData = async () => {

            await getAllVisitor();
            // await getSecretKey();
        };
        fetchData();
    }, [currentPage, itemsPerPage]);

    // useEffect(() => {
    //     const allSecretKeys = allVisitors.map((data) => data.secretKey);
    //     console.log(allSecretKeys); // Or set to state
    // }, [allVisitors]);

    const getSecretKey = (Id, secretKey, photopathIV) => {
        setSecretKey(secretKey);
        setPhotopathIv(photopathIV)
        setRowId(Id)
    };

    const getAllVisitor = async () => {
        const data = await getAllVisitorApi(navigate);
        console.log(data)
        setAllVisitors(data)
    }

    const getVisitorData = (vId) => {
        navigate('/visitorForm', { state: { vId } });
    };

    const DeleteVisitorData = async (vId) => {
        const data = await deleteVisitorApi(vId, navigate);
        console.log(data)
        getAllVisitor()
    }

    const handleSearch = (e) => {
        const searchDataValue = e.target.value.toLowerCase();
        setSearchData(searchDataValue);

        if (searchDataValue.trim() === "") {
            getAllVisitor();
        } else {
            const filteredData = allVisitors.filter((visitor) => {
                const fullName = visitor.FullName ? visitor.FullName.toLowerCase() : '';
                const mobileNumber = visitor.MobileNumber ? visitor.MobileNumber.toLowerCase() : '';
                return fullName.includes(searchDataValue) || mobileNumber.includes(searchDataValue);
            });
            setAllVisitors(filteredData);
            setCurrentPage(1);
        }
    };

    // const iv = CryptoJS.lib.WordArray.random(16);
    // const encrypted = CryptoJS.AES.encrypt(wordArrayImage, key, { iv });
    // const result = `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`;
    const decryptImage = useCallback((encryptedImage) => {

        try {
            const [ivHex, encryptedHex] = encryptedImage.split(":"); // Split IV and ciphertext
            console.log(ivHex, "ivHex")
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
            console.log(`data:image/png;base64,${decryptedBase64}`)
            return `data:image/png;base64,${decryptedBase64}`; // Return image in Base64 format
        } catch (error) {
            console.error("Error during decryption:", error);
            return ""; // Return empty string if error occurs
        }
    }, [secretKey]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allVisitors.slice(indexOfFirstItem, indexOfLastItem);

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
                                                <h3>Visitor Form</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => navigate("/visitorForm")}
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
                                                    <th style={headerCellStyle}>Full Name</th>
                                                    <th style={headerCellStyle}>Company Name</th>
                                                    <th style={headerCellStyle}>Email</th>
                                                    <th style={headerCellStyle}>Mobile No</th>
                                                    <th style={headerCellStyle}>Gov Id</th>
                                                    <th style={headerCellStyle}>Visitor Category</th>
                                                    <th style={headerCellStyle}>Person to Meet</th>
                                                    <th style={headerCellStyle}>Purpose of Visit</th>
                                                    <th style={headerCellStyle}>Expected Time</th>
                                                    <th style={headerCellStyle}>Photo</th>
                                                    <th style={headerCellStyle}>Status</th>
                                                    <th style={{ ...headerCellStyle, textAlign: "center" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((data, index) => {
                                                    const decryptedImage = data.PhotoPath && data.secretKey
                                                        ? decryptImage(data.PhotoPath)
                                                        : "";

                                                    return (
                                                        <tr key={data.Id}>
                                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                            <td>{data.FullName}</td>
                                                            <td>{data.CompanyName}</td>
                                                            <td>{data.Email}</td>
                                                            <td>{data.MobileNumber}</td>
                                                            <td>{data.GovermentId}</td>
                                                            <td>{data.CategoryName}</td>
                                                            <td>{data.PersonToMeet}</td>
                                                            <td>{data.PurposeName}</td>
                                                            <td>{data.VisitTime ? data.VisitTime.split("T")[0] : null}</td>
                                                            {/* <td></td> */}
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

                                                            <td>{data.IsActive ? "Active" : "Inactive"}</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <Edit className="text-success mr-2" onClick={() => getVisitorData(data.Id)} />
                                                                    <Delete className="text-danger" onClick={() => DeleteVisitorData(data.Id)} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>

                                        </Table>

                                        <div className="row mt-4 mt-xl-3">
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <h6 className="text-lg-start text-center"> Showing {indexOfFirstItem + 1} to{" "}
                                                    {Math.min(indexOfLastItem, allVisitors.length)} of{" "}
                                                    {allVisitors.length} entries</h6>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12"></div>
                                            <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                                                <Pagination
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    allData={allVisitors}
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

export default Visitor;
