import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { AddEmployeeApi, getEmployeeApi } from "../../Api/EmployeeMasterApi";
import { getAllVisitorTypeApi } from "../../Api/VisitorTypeMasterApi";
import { AddVisitorFormApi, getAllPurposeApi, getVisitorApi } from "../../Api/VisitorFormApi";

const VisitorForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { vId } = location.state || {};
    console.log(vId, "vId")
    const [fullName, setFullName] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [govId, setGovId] = useState("")
    const [visitorCategory, setVisitorCategory] = useState("")
    const [allVisitorCategory, setAllVisitorCategory] = useState([])
    const [personToMeet, setPersonToMeet] = useState("")
    const [purposeOfVisit, setPurposeOfVisit] = useState("")
    const [allPurpose, setAllPurpose] = useState([])
    const [expectedTime, setExpectedTime] = useState("")
    const [photo, setPhoto] = useState("")



    useEffect(() => {
        getAllVisitorCategory();
        getAllPurpose();
    }, [])

    const getAllVisitorCategory = async () => {
        const data = await getAllVisitorTypeApi(navigate);
        console.log(data)
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.VisitorTypeName}`,
        }));
        setAllVisitorCategory(options);
    }

    const handleVisitorCategory = (selected) => {
        const selectedValue = selected;
        setVisitorCategory(selected);
        console.log(selectedValue, "selected value");
        console.log(visitorCategory)
    }

    useEffect(() => {
        if (vId != null) { // covers both null and undefined
            getVisitorData();
        }
    }, [vId]);

    const AddVisitor = async () => {
        const data = await AddVisitorFormApi(fullName, companyName, email, mobileNo, govId, visitorCategory, personToMeet, purposeOfVisit, expectedTime, photo, vId, navigate);
        console.log(data)
        // navigate("/visitor")
    }

    const getVisitorData = async () => {

        const data = await getVisitorApi(vId, navigate);
        console.log(data)
        setFullName(data.FullName)
        setCompanyName(data.CompanyName)
        setEmail(data.Email)
        setMobileNo(data.MobileNumber)
        setGovId(data.GovermentId)
        setPersonToMeet(data.PersonToMeet)
        setExpectedTime(data.VisitTime.split("T")[0])
        setPhoto(data.PhotoPath)
        setPurposeOfVisit({
            value: data.PurposeId,
            label: `${data.PurposeName}`,
        })
        setVisitorCategory({
            value: data.CategoryId,
            label: `${data.CategoryName}`,
        })
    }


    const getAllPurpose = async () => {
        const data = await getAllPurposeApi(navigate);
        console.log(data)
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.PurposeName}`,
        }));
        setAllPurpose(options);
    }

    const handlePurpose = (selected) => {
        const selectedValue = selected;
        setPurposeOfVisit(selected);
        console.log(selectedValue, "selected value");
        console.log(purposeOfVisit)
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
                                                <h3>Add Visitor</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">

                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => navigate("/visitor")}
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
                                                        Full Name:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="fullName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Full Name"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Company Name:
                                                    </label>{" "}
                                                    <input
                                                        type="text"
                                                        id="companyName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Company Name"
                                                        value={companyName}
                                                        onChange={(e) => setCompanyName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Email:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="dutyName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Mobile No:
                                                    </label>{" "}
                                                    <input
                                                        type="text"
                                                        id="mobileNo"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Mobile No"
                                                        value={mobileNo}
                                                        onChange={(e) => setMobileNo(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Government Id:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="govId"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Government Id"
                                                        value={govId}
                                                        onChange={(e) => setGovId(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Visitor Category:
                                                    </label>{" "}
                                                    <Select
                                                        className="mt-3"
                                                        value={visitorCategory}
                                                        onChange={handleVisitorCategory}
                                                        options={allVisitorCategory}
                                                        placeholder="Select Visitor Category"

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Person To Meet:
                                                    </label>{" "}
                                                    <input
                                                        type="text"
                                                        id="personToMeet"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Person to Meet"
                                                        value={personToMeet}
                                                        onChange={(e) => setPersonToMeet(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Purpose of Visit:
                                                    </label>{" "}
                                                    <Select
                                                        className="mt-3"
                                                        value={purposeOfVisit}
                                                        onChange={handlePurpose}
                                                        options={allPurpose}
                                                        placeholder="Select Purpose of Visit"

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Expected Time:
                                                    </label>{" "}
                                                    <input
                                                        type="date"
                                                        id="expectedTime"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Expected Time"
                                                        value={expectedTime}
                                                        onChange={(e) => setExpectedTime(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Photo:
                                                    </label>{" "}
                                                    <input
                                                        type="text"
                                                        id="expectedTime"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Photo"
                                                        value={photo}
                                                        onChange={(e) => setPhoto(e.target.value)}
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
                                                        AddVisitor();
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

export default VisitorForm;
