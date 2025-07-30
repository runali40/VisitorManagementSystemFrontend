import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Pagination } from "../../../Utils/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { AddVisitorTypeApi, getVisitorTypeApi } from "../../../Api/VisitorTypeMasterApi";

const AddVisitorType = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { visitorId } = location.state || {};
    console.log(visitorId, "visitorId")
    const [visitorTypeCode, setVisitorTypeCode] = useState("")
    const [visitorTypeName, setVisitorTypeName] = useState("")
    const [vId, setVId] = useState("")
    
useEffect(() => {
    if (visitorId != null) { // covers both null and undefined
        getVisitorsTypeData();
    }
}, [visitorId]);

const AddVisitorType = async () => {
    const data = await AddVisitorTypeApi(visitorTypeCode, visitorTypeName, visitorId, navigate);
    console.log(data)
    navigate("/visitorType")
}

const getVisitorsTypeData = async () => {
    console.log(visitorId)
    const data = await getVisitorTypeApi(visitorId, navigate);
    console.log(data)
    setVisitorTypeName(data.VisitorTypeName)
    setVisitorTypeCode(data.VisitorCode)
}

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
                                            {/* <Button onClick={() => navigate("/visitorType")} style={headerCellStyle} >
                                                    Back
                                                </Button> */}
                                            <button
                                                className="btn btn-md text-light"
                                                type="button"
                                                style={{ backgroundColor: "#8b5c7e" }}
                                                onClick={() => navigate("/visitorType")}
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
                                                    Visitor Type Code:
                                                </label>{" "}
                                                <span className="text-danger fw-bold">*</span>
                                                <input
                                                    type="text"
                                                    id="dutyName"
                                                    className="form-control mt-3"
                                                    placeholder="Enter Visitor Type Code"
                                                    value={visitorTypeCode}
                                                    onChange={(e) => setVisitorTypeCode(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                            <div className="form-group form-group-sm">
                                                <label className="control-label fw-bold">
                                                    Visitor Type Name:
                                                </label>{" "}
                                                <input
                                                    type="text"
                                                    id="dutyName"
                                                    className="form-control mt-3"
                                                    placeholder="Enter Visitor Type Code"
                                                    value={visitorTypeName}
                                                    onChange={(e) => setVisitorTypeName(e.target.value)}
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
                                                    AddVisitorType();

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

export default AddVisitorType;
