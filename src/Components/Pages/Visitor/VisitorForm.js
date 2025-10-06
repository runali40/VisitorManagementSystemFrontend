import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import Webcam from "react-webcam";
import CryptoJS from "crypto-js";
import { getAllVisitorTypeApi } from "../../Api/VisitorTypeMasterApi";
import {
    AddVisitorFormApi,
    getAllPurposeApi,
    getVisitorApi,
    SendSmsApi,
    VisitorCard,
} from "../../Api/VisitorFormApi";
import { flushSync } from "react-dom";
import { getAllHostApi, getHostApi } from "../../Api/HostMasterApi";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

const VisitorForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { vId } = location.state || {};
    console.log(vId, "vId");
    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("")
    const [govId, setGovId] = useState("");
    const [visitorCategory, setVisitorCategory] = useState("");
    const [allVisitorCategory, setAllVisitorCategory] = useState([]);
    const [personToMeet, setPersonToMeet] = useState("");
    const [purposeOfVisit, setPurposeOfVisit] = useState("");
    const [allPurpose, setAllPurpose] = useState([]);
    const [visitDate, setVisitDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // format: YYYY-MM-DD
    });
    const [expectedTime, setExpectedTime] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photo1, setPhoto1] = useState(null);
    const webcamRef = useRef(null);
    const [deviceId, setDeviceId] = useState("");
    const [showWebcam, setShowWebcam] = useState(true);
    const [webcamKey, setWebcamKey] = useState(0);
    const [facingMode, setFacingMode] = useState("environment");
    const [secretKey, setSecretKey] = useState("");
    const [photopathIv, setPhotopathIv] = useState("");
    const [file, setFile] = useState(null)
    const [base64, setBase64] = useState("");
    const [allHost, setAllHost] = useState([])
    const [hostMobileNo, setHostMobileNo] = useState("")
    const [listening, setListening] = useState(false);
    const [website, setWebsite] = useState("")


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
        console.log(data);
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.VisitorTypeName}`,
        }));
        setAllVisitorCategory(options);
    };

    const handleVisitorCategory = (selected) => {
        const selectedValue = selected;
        setVisitorCategory(selected);
        console.log(selectedValue, "selected value");
        console.log(visitorCategory);
    };

    useEffect(() => {
        if (vId != null) {
            // covers both null and undefined
            getVisitorData();
        }
    }, [vId]);

    useEffect(() => {
        const fetchData = async () => {
            await getAllHost();
        };
        fetchData();
    }, []);

    const getAllHost = async () => {
        const data = await getAllHostApi(navigate);
        console.log(data);
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.HostName}`,
        }));
        setAllHost(options);
    };

    // const handleHost = (selected) => {
    //     const selectedValue = selected;
    //     setPersonToMeet(selectedValue);
    //     console.log(selectedValue, "selected value");
    //     setHostId(selectedValue.value)
    //     getHostData()
    // };

    const handleHost = (selectedOption) => {
        if (!selectedOption) return; // handle empty case

        setPersonToMeet(selectedOption);           // store full option object
        console.log(selectedOption, "selected option");

        // setHostId(selectedOption.value);           // correctly get the value
        getHostData(selectedOption.value);
    };

    const getHostData = async (hostId) => {
        const data = await getHostApi(hostId, navigate);
        console.log(data);
        // setHostName(data.HostName);
        // setEmail(data.Email)
        // setDesignation(data.Designation)
        setHostMobileNo(data.MobileNumber)
        // setDepartmentName({
        //     value: data.DepartmentId,
        //     label: data.DepartmentName
        // })
        // setHId(data.Id);
    };


    const AddVisitor = async () => {
        const data = await AddVisitorFormApi(
            fullName,
            companyName,
            email,
            mobileNo,
            govId,
            visitorCategory,
            personToMeet,
            hostMobileNo,
            purposeOfVisit,
            expectedTime,
            photo,
            secretKey,
            vId,
            photopathIv,
            visitDate,
            website,
            address,
            navigate
        );

        if (data) {   // ✅ only navigate if API returned valid response
            console.log(data);
            SendSms()
            navigate("/VisiotrsInfo");

        }
    };

    const SendSms = async () => {
        const data = await SendSmsApi(mobileNo, navigate)
        console.log(data, "sms snd")
    }

    const getVisitorData = async () => {
        const data = await getVisitorApi(vId, navigate);
        flushSync(() => {
            const photoValue = data?.PhotoPath;
            console.log("Photo value to set:", photoValue);
            setPhoto1(photoValue)
            setFullName(data.FullName);
            setCompanyName(data.CompanyName);
            setEmail(data.Email);
            setMobileNo(data.MobileNumber);
            setGovId(data.GovermentId);
            setPersonToMeet(data.PersonToMeet);
            setExpectedTime(data.VisitTime.split("T")[0]);
            setSecretKey(data.secretKey)
            setPersonToMeet({
                value: data.PersonToMeet,
                label: data.HostName
            })
            setPurposeOfVisit({
                value: data.PurposeId,
                label: `${data.PurposeName}`,
            });
            setVisitorCategory({
                value: data.CategoryId,
                label: `${data.CategoryName}`,
            });
            setExpectedTime(data.VisitTime.split("T")[1].slice(0, 5))
            setWebsite(data.Website)
            setHostMobileNo(data.HostNo)
            setAddress(data.Address)
        });
    };

    useEffect(() => {
        if (photo1) {
            setPhoto(photo1);

            console.log("208:", photo);
        }
    }, [photo1]);
    // useEffect(() => {
    //     console.log("Updated photo state:", photo);
    // }, [photo]);
    // const decryptedImageUrl = decryptImage(photo);
    // useEffect(() => {
    //     console.log(photo, "Updated photo");
    //     setPhoto(photo)
    // }, [photo]);

    const getAllPurpose = async () => {
        const data = await getAllPurposeApi(navigate);
        console.log(data);
        const options = data.map((data) => ({
            value: data.Id,
            label: `${data.PurposeName}`,
        }));
        setAllPurpose(options);
    };

    const handlePurpose = (selected) => {
        const selectedValue = selected;
        setPurposeOfVisit(selected);
        console.log(selectedValue, "selected value");
        console.log(purposeOfVisit);
    };

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
                console.log(iv.toString(CryptoJS.enc.Hex), "photopathIv");
                console.log(typeof photopathIv);
                // Extract the base64 part of the image
                const base64Image = imageSrc.split(",")[1];
                const wordArrayImage = CryptoJS.enc.Base64.parse(base64Image);

                // Encrypt the image
                const encryptedImage = CryptoJS.AES.encrypt(wordArrayImage, key, {
                    iv,
                });

                // Combine IV and encrypted data for storage
                const encryptedImageSrc = `${iv.toString(
                    CryptoJS.enc.Hex
                )}:${encryptedImage.ciphertext.toString(CryptoJS.enc.Hex)}`;

                // localStorage.setItem("encryptedImage", encryptedImageSrc);
                console.log(encryptedImageSrc, "encryptedImageSrc");
                setPhoto(encryptedImageSrc); // Store URL if needed
                // toast.success("Photo Capture Successfully!")
                setShowWebcam(false);
            } catch (error) {
                console.error("Error during encryption:", error);
            }
        } else {
            console.error("Webcam ref not found");
        }
    }, [webcamRef, secretKey]);

    // Decrypt the Encrypted Image (Biometric)
    const decryptImage = useCallback(
        (encryptedImage) => {
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
                // console.log(`data:image/png;base64,${decryptedBase64}`);
                return `data:image/png;base64,${decryptedBase64}`; // Return image in Base64 format
            } catch (error) {
                console.error("Error during decryption:", error);
                return ""; // Return empty string if error occurs
            }
        },
        [secretKey]
    );

    // Use the decrypted image
    // const decryptedImageUrl = photo ? decryptImage(photo) : null;

    const decryptedImageUrl = photo && secretKey
        ? decryptImage(photo)
        : "";
    const decryptedImageUrl2 = photo ? decryptImage(photo) : null;

    const decryptedImage1 = photo && secretKey ? decryptImage(photo) : "";

    const handleRefreshWebcam = () => {
        setPhoto(null); // clear previous photo
        setShowWebcam(false); // force unmount
        setTimeout(() => {
            setShowWebcam(true); // remount webcam
        }, 100); // short delay to ensure clean remount
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log("📂 Selected File:", selectedFile);

            // Convert to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log("🔑 Base64 String:", reader.result); // <-- console log here
                setBase64(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const UploadVisitorCard = async () => {
        const data = await VisitorCard(
            base64,
            navigate
        );

        if (data) {   // ✅ only navigate if API returned valid response
            console.log(data);
            // navigate("/VisiotrsInfo");

        }
    };

    // const startListening = () => {
    //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //     if (!SpeechRecognition) {
    //         alert("Speech Recognition not supported in this browser");
    //         return;
    //     }

    //     const recognition = new SpeechRecognition();
    //     recognition.lang = "en-IN";
    //     recognition.continuous = false;
    //     recognition.interimResults = false;

    //     recognition.onstart = () => setListening(true);

    //     recognition.onresult = (event) => {
    //         const spokenText = event.results[0][0].transcript;
    //         const detectedNumber = spokenText.replace(/\D/g, "");
    //         setMobileNo(detectedNumber);
    //         setListening(false);
    //     };

    //     recognition.onerror = (event) => {
    //         console.error("Error:", event.error);
    //         alert("Speech error: " + event.error);
    //         setListening(false);
    //     };

    //     recognition.onend = () => setListening(false);

    //     recognition.start();

    // };

    // const FullNameData = () => {
    //     const SpeechRecognition =
    //         window.SpeechRecognition || window.webkitSpeechRecognition;

    //     if (!SpeechRecognition) {
    //         alert("Speech Recognition not supported in this browser");
    //         return;
    //     }

    //     const recognition = new SpeechRecognition();
    //     recognition.lang = "en-IN";
    //     recognition.continuous = false;
    //     recognition.interimResults = false;

    //     recognition.onstart = () => setListening(true);

    //     recognition.onresult = (event) => {
    //         const spokenText = event.results[0][0].transcript;
    //         console.log("Spoken:", spokenText);

    //         // ✅ Bind name directly
    //         setFullName(spokenText.trim()); 

    //         setListening(false);
    //     };

    //     recognition.onerror = (event) => {
    //         console.error("Error:", event.error);
    //         alert("Speech error: " + event.error);
    //         setListening(false);
    //     };

    //     recognition.onend = () => setListening(false);

    //     recognition.start();
    // };

    const startListening = (field) => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setListening(true);

        recognition.onresult = (event) => {
            let spokenText = event.results[0][0].transcript.trim();
            console.log("Spoken:", spokenText);

            if (field === "mobileNo") {
                // extract digits only
                const detectedNumber = spokenText.replace(/\D/g, "");
                setMobileNo(detectedNumber);
            } else if (field === "fullName") {
                setFullName(spokenText);
            } else if (field === "companyName") {
                setCompanyName(spokenText);
            } else if (field === "email") {
                // ✅ Fix common replacements
                spokenText = spokenText
                    .replace(/\bat the rate\b/gi, "@")
                    .replace(/\bat\b/gi, "@")
                    .replace(/\bdot\b/gi, ".")
                    .replace(/\bunderscore\b/gi, "_")
                    .replace(/\bdash\b/gi, "-");

                // ✅ Remove all spaces
                spokenText = spokenText.replace(/\s+/g, "");

                // ✅ Lowercase (emails are case-insensitive)
                setEmail(spokenText.toLowerCase());
            }

            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Error:", event.error);
            alert("Speech error: " + event.error);
            setListening(false);
        };

        recognition.onend = () => setListening(false);

        recognition.start();
    };


    return (
        <>
            <section id="main-content">
                <section className="wrapper">
                    <div className="container-fluid">
                        <div
                            className="card m-3"
                            style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
                        >
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
                                                    {/* <input
                                                        type="text"
                                                        id="fullName"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Full Name"
                                                        value={fullName}
                                                      
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                           
                                                            if (/^[a-zA-Z\s]*$/.test(value)) {
                                                                setFullName(value);
                                                            }
                                                        }}
                                                    /> */}
                                                    <div className="input-group">
                                                        {/* <input type="text" class="form-control" placeholder="Search"/> */}
                                                        <input
                                                            type="text"
                                                            id="fullName"
                                                            className="form-control mt-3"
                                                            placeholder="Enter Full Name"
                                                            value={fullName}

                                                            onChange={(e) => {
                                                                const value = e.target.value;

                                                                if (/^[a-zA-Z\s]*$/.test(value)) {
                                                                    setFullName(value);
                                                                }
                                                            }}
                                                        />
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-default mt-3" type="submit" onClick={() => startListening("fullName")}>
                                                                {/* <i class="glyphicon glyphicon-search"></i> */}
                                                                {listening === "fullName" ? (
                                                                    <MicOffIcon style={{ color: "red" }} />
                                                                ) : (
                                                                    <MicIcon />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Company Name:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            id="companyName"
                                                            className="form-control mt-3"
                                                            placeholder="Enter Company Name"
                                                            value={companyName}
                                                            // onChange={(e) => setCompanyName(e.target.value)}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                // Allow only alphabets and spaces
                                                                if (/^[a-zA-Z\s]*$/.test(value)) {
                                                                    setCompanyName(value);
                                                                }
                                                            }}
                                                        />
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-default mt-3" type="submit" onClick={() => startListening("companyName")}>
                                                                {/* <i class="glyphicon glyphicon-search"></i> */}
                                                                {listening === "companyName" ? (
                                                                    <MicOffIcon style={{ color: "red" }} />
                                                                ) : (
                                                                    <MicIcon />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>

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
                                                    <div className="input-group">
                                                        <input
                                                            type="email"
                                                            id="dutyName"
                                                            className="form-control mt-3"
                                                            placeholder="Enter Email"
                                                            value={email}
                                                            // onChange={(e) => setEmail(e.target.value)}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                // Allow only valid email characters while typing
                                                                if (/^[a-zA-Z0-9@._-]*$/.test(value)) {
                                                                    setEmail(value);
                                                                }
                                                            }}
                                                        />
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-default mt-3" type="submit" onClick={() => startListening("email")}>
                                                                {/* <i class="glyphicon glyphicon-search"></i> */}
                                                                {listening === "email" ? (
                                                                    <MicOffIcon style={{ color: "red" }} />
                                                                ) : (
                                                                    <MicIcon />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Mobile No:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            id="mobileNo"
                                                            className="form-control mt-3"
                                                            placeholder="Enter Mobile No"
                                                            value={mobileNo}
                                                            onChange={(e) => setMobileNo(e.target.value)}
                                                        // onChange={(e) => {
                                                        //     const value = e.target.value;
                                                        //     // Allow only numbers and max 10 digits
                                                        //     if (/^[0-9]{0,10}$/.test(value)) {
                                                        //         setMobileNo(value);
                                                        //     }
                                                        // }}
                                                        />
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-default mt-3" type="submit" onClick={() => startListening("mobileNo")}>
                                                                {/* <i class="glyphicon glyphicon-search"></i> */}
                                                                {listening === "mobileNo" ? (
                                                                    <MicOffIcon style={{ color: "red" }} />
                                                                ) : (
                                                                    <MicIcon />
                                                                )}

                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Address:
                                                    </label>{" "}

                                                    {/* <input
                                                        type="text"
                                                        id="govId"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Government Id"
                                                        value={govId}
                                                        onChange={(e) => setGovId(e.target.value)}
                                                    /> */}

                                                    <textarea className="form-control mt-3" rows="3" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Visitor Category:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
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
                                                    <span className="text-danger fw-bold">*</span>
                                                    <Select
                                                        className="mt-3"
                                                        value={personToMeet}
                                                        onChange={handleHost}
                                                        options={allHost}
                                                        placeholder="Select Person To Meet"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Host Mobile No:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="hostMobileNo"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Host Mobile No"
                                                        value={hostMobileNo}
                                                        onChange={(e) => setHostMobileNo(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Visit Date:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="date"
                                                        id="visitDate"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Visit Date"
                                                        value={visitDate}
                                                        onChange={(e) => setVisitDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Visit Time:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="time"
                                                        id="expectedTime"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Expected Time"
                                                        value={expectedTime}
                                                        onChange={(e) => setExpectedTime(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Purpose of Visit:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <Select
                                                        className="mt-3"
                                                        value={purposeOfVisit}
                                                        onChange={handlePurpose}
                                                        options={allPurpose}
                                                        placeholder="Select Purpose of Visit"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 mt-lg-0">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Website:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="website"
                                                        className="form-control mt-3"
                                                        placeholder="Enter Website"
                                                        value={website}
                                                        onChange={(e) => setWebsite(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">

                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-md-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Photo:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <br />
                                                    <button
                                                        className="btn btn-md text-light mt-3"
                                                        type="button"
                                                        style={{ backgroundColor: "#8b5c7e" }}
                                                        data-toggle="modal"
                                                        data-target="#exampleModal"
                                                        onClick={() =>
                                                            console.log(decryptedImageUrl, "photo")
                                                        }
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
                    <div
                        className="modal fade bd-example-modal-md"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-md" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">
                                        Capture Photo
                                    </h4>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {photo !== null ? (
                                                <div className="my-3">
                                                    <img src={decryptedImageUrl} alt="screenshot" />
                                                </div>
                                            ) : (
                                                showWebcam && (
                                                    <Webcam
                                                        audio={false}
                                                        ref={webcamRef}
                                                        screenshotFormat="image/png"
                                                        videoConstraints={videoConstraints}
                                                        className="my-3"
                                                        style={{ height: "110%", width: "60%" }}
                                                        onUserMediaError={(err) =>
                                                            console.error("Camera error:", err)
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                        <div className="col-lg-12">
                                            <button
                                                className="btn btn-md text-light mt-4"
                                                type="button"
                                                style={{ backgroundColor: "#8b5c7e" }}
                                                // data-toggle="modal" data-target="#exampleModal"
                                                onClick={capturePhoto}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                className="btn btn-md text-light mt-4 mx-2"
                                                type="button"
                                                style={{ backgroundColor: "#8b5c7e" }}
                                                onClick={handleRefreshWebcam}
                                            >
                                                Refresh
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-dismiss="modal"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="container-fluid">
                        <input className="form-control" type="file" onChange={handleFileChange} />
                        <button className="btn btn-success" onClick={UploadVisitorCard}>Submit</button>
                    </div> */}
                </section>
            </section>
        </>
    );
};

export default VisitorForm;
