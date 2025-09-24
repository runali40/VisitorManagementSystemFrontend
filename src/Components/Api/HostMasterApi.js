import { apiClient } from "../../apiClient";
import UrlData from "../../UrlData";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

export const AddHostApi = (
    hostName,
    departmentName,
    designation,
    email,
    mobileNo,
    hId,
    navigate
) => {
    // if (!departmentCode || !departmentName) {
    //     toast.success("Please fill all the details");
    //     return null;
    // }
    const userId = localStorage.getItem("userId");
    const data = {
        userId: userId,
        hostName: hostName,
        department: departmentName.value,
        designation: designation,
        email: email,
        mobileNumber: mobileNo,
    };
    if (hId !== null && hId !== "") {
        data.id = hId;
    }

    const url = "HostMaster/Insert";
    return apiClient({
        method: "post",
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log("API response:", response);
            // toast.success("Visitor Type added successfully!");
            if (data.id) {
                toast.success("Host updated successfully!");
            } else {
                toast.success("Host added successfully!");
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

export const getAllHostApi = (navigate) => {
    const userId = localStorage.getItem("userId");
    const params = {
        userId: userId,
        // IsActive: "1"
    };
    const url = "HostMaster/GetAll";
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

export const getHostApi = (hostId, navigate) => {
    const userId = localStorage.getItem("userId");
    console.log(hostId);
    const params = {
        userId: userId,
        Id: hostId,
    };
    const url = "HostMaster/Get";
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

export const deleteHostApi = (hostId, navigate) => {
    const userId = localStorage.getItem("userId");
    const data = {
        userId: userId,
        id: hostId,
    };
    const url = "HostMaster/Delete";
    return apiClient({
        method: "post",
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log("delete API response:", response.data);
            toast.success("Host Deleted Successfully!");
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
