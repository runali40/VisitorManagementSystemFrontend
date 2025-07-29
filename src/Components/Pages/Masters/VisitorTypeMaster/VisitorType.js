import React, { useState } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Pagination } from "../../../Utils/Pagination";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure this is loaded once globally
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
const VisitorType = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [allVisitors] = useState([]); // Dummy empty state
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };
      const handleNavigate = () => {
    navigate("/addVisitorType");
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
                                                <h3>Visitor Type Master</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                                <Button onClick={handleNavigate}  style={headerCellStyle}>
                                                    Add
                                                </Button>
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
                                                <input className="form-control" placeholder="Search here" />
                                            </div>
                                        </div>

                                        <br />

                                        <Table striped hover responsive className="border text-left">
                                            <thead>
                                                <tr>
                                                    <th style={headerCellStyle}>Sr.No</th>
                                                    <th style={headerCellStyle}>Visitor Type Code</th>
                                                    <th style={headerCellStyle}>Visitor Type Name</th>
                                                    <th style={headerCellStyle}>Status</th>
                                                    <th style={{ ...headerCellStyle, textAlign: "center" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>2312</td>
                                                    <td>Employee</td>
                                                    <td>Active</td>
                                                    <td className="text-center">Edit</td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                        <div className="row mt-4 mt-xl-3">
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <h6 className="text-lg-start text-center">entries</h6>
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

            {/* ✅ Modal */}
            {/* <Modal show={showModal} onHide={handleClose} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5 className="fw-bold">Add Student</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                                <Form.Group className="mb-3" controlId="parameterCode">
                                    <Form.Label className="fw-bold">
                                        Student Name: <span className="text-danger fw-bold">*</span>
                                    </Form.Label>
                                    <Form.Control type="text" placeholder="Enter Student Name" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                                <Form.Group className="mb-3" controlId="parameterName">
                                    <Form.Label className="fw-bold">
                                        Student Class: <span className="text-danger fw-bold">*</span>
                                    </Form.Label>
                                    <Form.Control type="text" placeholder="Enter Student Class" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={headerCellStyle}>Save</Button>
                    <Button variant="secondary" onClick={() => { }}>Clear</Button>
                </Modal.Footer>
            </Modal> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisitorType;
