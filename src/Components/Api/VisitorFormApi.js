import { apiClient } from "../../apiClient";
import UrlData from "../../UrlData";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

export const AddVisitorFormApi = (
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
) => {
    if (
        !fullName ||
        !mobileNo ||
        !email ||
        !companyName ||
        !visitorCategory ||
        !personToMeet ||
        !purposeOfVisit ||
        !expectedTime ||
        !photo
    ) {
        toast.success("Please fill all the details");
        return null;
    }
    const userId = localStorage.getItem("userId");
    const data = {
        userId: userId,
        fullName: fullName,
        mobileNumber: mobileNo,
        email: email,
        govermentId: govId,
        categoryId: visitorCategory.value,
        companyName: companyName,
        photoPath: photo,
        personToMeet: personToMeet.value,
        purposeId: purposeOfVisit.value,
        visitTime: expectedTime,
        secretKey: secretKey,
        photopathIV: photopathIv,
        hostNo: hostMobileNo,
        visitDate: visitDate,
        website: website,
        address: address
        // visitTime: "2025-08-01"
    };
    if (vId !== null && vId !== "") {
        data.id = vId;
    }
    const url = "VisitorsInfo/Insert";
    return apiClient({
        method: "post",
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log("API response:", response);
            // toast.success("Visitor Type added successfully!");
            if (data.id) {
                toast.success("Visitor updated successfully!");
            } else {
                toast.success("Visitor added successfully!");
            }
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const getAllVisitorApi = (navigate) => {
    const userId = localStorage.getItem("userId");
    const params = {
        UserId: userId,
    };
    const url = "VisitorsInfo/GetAll";
    return apiClient({
        method: "get",
        url: UrlData + url,
        params: params,
    })
        .then((response) => {
            console.log("get all API response:", response.data);
            // toast.success("Job Added Successfully!")
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const getVisitorApi = (vId, navigate) => {
    const userId = localStorage.getItem("userId");
    console.log(vId);
    const params = {
        userId: userId,
        id: vId,
    };
    const url = "VisitorsInfo/Get";
    return apiClient({
        method: "get",
        url: UrlData + url,
        params: params,
    })
        .then((response) => {
            console.log("get API response:", response.data);
            // toast.success("Job Added Successfully!")
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const deleteVisitorApi = (vId, navigate) => {
    const userId = localStorage.getItem("userId");
    const data = {
        userId: userId,
        id: vId,
    };
    const url = "VisitorsInfo/Delete";
    return apiClient({
        method: "post",
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log("delete API response:", response.data);
            toast.success("Visitor Deleted Successfully!");
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const getAllPurposeApi = (navigate) => {
    const userId = localStorage.getItem("userId");
    const params = {
        UserId: userId,
    };
    const url = "VisitorsInfo/GetPurpose";
    return apiClient({
        method: "get",
        url: UrlData + url,
        params: params,
    })
        .then((response) => {
            console.log("get all API response:", response.data);
            // toast.success("Job Added Successfully!")
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const SendSmsApi = (
    mobileNo,
    navigate
) => {

    const userId = localStorage.getItem("userId");
    const data = {
        userId: userId,
        to: "+91" + mobileNo,
        message: "hello"
    };
    const url = "VisitorsInfo/sendSMS";
    return apiClient({
        method: "post",
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log("API response:", response);
            toast.success("SMS Send successfully!");

            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const VisitorCard = (
    visitingCard,
    navigate
) => {

    const userId = localStorage.getItem("userId");
    const data = {
        userId: userId,
        cardImage: visitingCard,

    };
    // if (vId !== null && vId !== "") {
    //     data.id = vId;
    // }
    const url = "VisitorsInfo/read-card";
    return apiClient({
        method: "post",
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log("API response:", response);
            toast.success("Visitor Card uploaded successfully!");
            // if (data.id) {
            //     toast.success("Visitor updated successfully!");
            // } else {
            //     toast.success("Visitor added successfully!");
            // }
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
            return response.data;
        })
        .catch((error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.outcome
            ) {
                const token1 = error.response.data.outcome.tokens;
                Cookies.set("UserCredential", token1, { expires: 7 });
            }
            console.log(error);

            const errors = ErrorHandler(error, navigate);
            toast.error(errors);
            return null;
        });
};

export const ScanCard = async (navigate) => {
    const userId = localStorage.getItem("userId");

    const data = { userId: userId };
    const url = "AutoScan/start-scan";

    try {
        const response = await apiClient.post(`${UrlData}${url}`, data);

        console.log("API response:", response.data);

        if (response.data?.outcome?.tokens) {
            const token1 = response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
        }

        toast.success("Visitor Card uploaded successfully!");
        return response.data; // ✅ Return your API data to React
    } catch (error) {
        console.error("ScanCard error:", error);

        if (error.response?.data?.outcome?.tokens) {
            const token1 = error.response.data.outcome.tokens;
            Cookies.set("UserCredential", token1, { expires: 7 });
        }

        const errors = ErrorHandler(error, navigate);
        toast.error(errors);
        return null;
    }
};

