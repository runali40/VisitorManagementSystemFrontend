import { apiClient } from "../../apiClient";
import UrlData from "../../UrlData";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorHandler from "../ErrorHandler/ErrorHandler";


export const AddUserApi = (username, employeeName, role, uId, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        um_user_name: username,
        um_roleid: role.value,
        employeeName: employeeName.value,
        um_isactive: "1"
    };
    if (uId !== null && uId !== "") {
        data.um_id = uId;
    }
    const url = 'UserMaster/Insert';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('API response:', response);
            // toast.success("Visitor Type added successfully!");
            if (data.um_id) {
                toast.success("User updated successfully!");
            } else {
                toast.success("User added successfully!");
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

export const getAllUserApi = (navigate) => {
    const userId = localStorage.getItem('userId');
    const params = {
        UserId: userId,
    };
    const url = 'UserMaster/GetAll';
    return apiClient({
        method: 'get',
        url: UrlData + url,
        params: params,
    })
        .then((response) => {
            console.log('get all API response:', response.data);
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

export const getUserApi = (uId, navigate) => {
    const userId = localStorage.getItem('userId');
    console.log(uId)
    const params = {
        userId: userId,
        um_id: uId,
    };
    const url = 'UserMaster/Get';
    return apiClient({
        method: 'get',
        url: UrlData + url,
        params: params,
    })
        .then((response) => {
            console.log('get API response:', response.data);
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

export const deleteUserApi = (uId, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        um_id: uId,
    };
    const url = 'UserMaster/Delete';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('delete API response:', response.data);
            toast.success("User Deleted Successfully!")
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