import React, { useState } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Pagination } from "../../../Utils/Pagination";

const AddVisitorType = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };

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
                                                <h3>Add Visitor Type</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                                <Button /* onClick={handleShow} */ style={headerCellStyle} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Back
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body pt-3">
                                     
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

export default AddVisitorType;
