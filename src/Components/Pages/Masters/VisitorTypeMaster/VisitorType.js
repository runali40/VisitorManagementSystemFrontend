
import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Cursor } from "react-bootstrap-icons";
import { Pagination } from "../../../Utils/Pagination";

const VisitorType = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
    const [allVisitors, setAllVisitors] = useState([])
    return (
        <>
            <section id="main-content">
                <section className="wrapper">
                    {/* <div className="typo-agile"> */}
                    <div className='container-fluid'>
                        <div
                            className="card m-3"
                            style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card-header m-3">
                                        <div className="row">
                                            <div className="col-lg-10">
                                                <h3>Visitor Type Master</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                                <button className="btn" style={headerCellStyle}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pt-3">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start justify-content-md-start">
                                                <h6 className="mt-2">Show</h6>&nbsp;&nbsp;
                                                <select
                                                    style={{ height: "35px" }}
                                                    className="form-select w-auto"
                                                    aria-label="Default select example"
                                                // value={selectedItemsPerPage}
                                                // onChange={handleChange}
                                                >
                                                    <option value="10">10</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                &nbsp;&nbsp;
                                                <h6 className="mt-2">entries</h6>
                                            </div>
                                            <div className="col-lg-6 col-md-6 d-flex justify-content-center justify-content-lg-end"></div>
                                            <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-end mt-lg-0 mt-md-0 mt-3">
                                                <input
                                                    className="form-control"
                                                    placeholder="Search here"
                                                // value={searchData}
                                                // onChange={handleSearch}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <Table striped hover responsive className="border text-left">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Sr.No
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Visitor Type Code
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Visitor Type Name
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Status
                                                    </th>
                                                    <th scope="col" className="text-center" style={headerCellStyle}>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>2312</td>
                                                    <td>Employee</td>
                                                    <td>Active</td>
                                                    <td>Edit</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <div className="row mt-4 mt-xl-3">
                                            <div className="col-lg-4 col-md-4 col-12 ">
                                                <h6 className="text-lg-start text-center">
                                                    {/*  Showing {indexOfFirstItem + 1} to{" "}
                                            {Math.min(indexOfLastItem, allStudent.length)} of{" "}
                                            {allStudent.length} */} entries
                                                </h6>
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
                    {/* </div> */}

                </section>
            </section>
        </>
    )
}

export default VisitorType