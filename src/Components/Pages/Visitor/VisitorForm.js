import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import Webcam from "react-webcam";
import CryptoJS from "crypto-js";
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
    const [photo, setPhoto] = useState(null)
    const webcamRef = useRef(null);
    const [deviceId, setDeviceId] = useState("");
    const [facingMode, setFacingMode] = useState("environment");
    const [secretKey, setSecretKey] = useState("");
    const [photopathIv, setPhotopathIv] = useState("")

    useEffect(() => {
        const generateSecretKey = () => {
            const key = CryptoJS.lib.WordArray.random(32); // 32 bytes = 256 bits
            return key.toString(CryptoJS.enc.Hex);
        };
        const key = generateSecretKey();
        // const key ="eb7b5de469bed866f1a5360ef7ec87d85d4786a0ea40692a3b7b54e103fc6dd7"
        setSecretKey(key);
        // localStorage.setItem("biometricKey", key)
        console.log(key, "secret key");
    }, []);

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
        const data = await AddVisitorFormApi(fullName, companyName, email, mobileNo, govId, visitorCategory, personToMeet, purposeOfVisit, expectedTime, photo, secretKey, vId, photopathIv, navigate);
        console.log(data)
        navigate("/VisiotrsInfo")
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

    const videoConstraints = {
        width: 540,
        facingMode: facingMode,
        deviceId: deviceId || undefined,
    };

    const capturePhoto = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            try {
                const key = CryptoJS.enc.Hex.parse(secretKey);
                const iv = CryptoJS.lib.WordArray.random(16); // Generate a 16-byte IV
                setPhotopathIv(iv.toString(CryptoJS.enc.Hex));
                console.log(iv.toString(CryptoJS.enc.Hex), "photopathIv")
                console.log(typeof photopathIv)
                // Extract the base64 part of the image
                const base64Image = imageSrc.split(",")[1];
                const wordArrayImage = CryptoJS.enc.Base64.parse(base64Image);

                // Encrypt the image
                const encryptedImage = CryptoJS.AES.encrypt(wordArrayImage, key, { iv });

                // Combine IV and encrypted data for storage
                const encryptedImageSrc = `${iv.toString(CryptoJS.enc.Hex)}:${encryptedImage.ciphertext.toString(CryptoJS.enc.Hex)}`;

                // localStorage.setItem("encryptedImage", encryptedImageSrc);
                console.log(encryptedImageSrc, "encryptedImageSrc")
                setPhoto(encryptedImageSrc); // Store URL if needed
                // toast.success("Photo Capture Successfully!")
            } catch (error) {
                console.error("Error during encryption:", error);
            }
        } else {
            console.error("Webcam ref not found");
        }
    }, [webcamRef, secretKey]);

    // Decrypt the Encrypted Image (Biometric)
    const decryptImage = useCallback((encryptedImage) => {

        try {
            const [ivHex, encryptedHex] = encryptedImage.split(":"); // Split IV and ciphertext
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


    // Use the decrypted image
    const decryptedImageUrl = photo ? decryptImage(photo) : null;

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
                                                    onClick={() => navigate("/VisiotrsInfo")}
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
                                                    <br />
                                                    <button
                                                        className="btn btn-md text-light mt-3"
                                                        type="button"
                                                        style={{ backgroundColor: "#8b5c7e" }}
                                                        data-toggle="modal" data-target="#exampleModal"
                                                    >
                                                        Capture Photo
                                                    </button>
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
                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {photo ? (
                                                <div className="my-3">
                                                    <img src={decryptedImageUrl} alt="screenshot" />
                                                </div>
                                            ) :
                                                <Webcam
                                                    className="my-3"
                                                    id="clickPhoto"
                                                    style={{ height: "110%", width: "60%" }}
                                                    ref={webcamRef}
                                                    audio={false}
                                                    screenshotFormat="image/png"
                                                    videoConstraints={videoConstraints}
                                                    onUserMediaError={(err) => console.error("onUserMediaError: ", err)}
                                                />
                                            }
                                        </div>
                                        <div className="col-lg-12">

                                            <button
                                                className="btn btn-md text-light mt-3"
                                                type="button"
                                                style={{ backgroundColor: "#8b5c7e" }}
                                                // data-toggle="modal" data-target="#exampleModal"
                                                onClick={
                                                    capturePhoto
                                                }
                                            >
                                                Capture Photo
                                            </button>
                                        </div>
                                    </div>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
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
