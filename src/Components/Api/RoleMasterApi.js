import { apiClient } from "../../apiClient";
import UrlData from "../../UrlData";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorHandler from "../ErrorHandler/ErrorHandler";


export const AddRoleApi = (roleName, roleDescription, menuDataArray, roleId, navigate) => {
       if (!roleName || !menuDataArray) {
        toast.success("Please fill all the details");
        return null;
      }
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        r_rolename: roleName,
        r_description: roleDescription,
        Privilage: menuDataArray,
        r_isactive: "1",
    };
    if (roleId !== null && roleId !== "") {
        data.r_id = roleId;
    }
    const url = 'RoleMaster/Insert';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('API response:', response);
            // toast.success("Visitor Type added successfully!");
            if (data.r_id) {
                toast.success("Role updated successfully!");
            } else {
                toast.success("Role added successfully!");
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

export const getAllRoleApi = (navigate) => {
    const userId = localStorage.getItem('userId');
    const params = {
        UserId: userId,
        r_isactive: "1"
    };
    const url = 'RoleMaster/GetAll';
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

export const getAllScreenApi = (navigate) => {
    const userId = localStorage.getItem('userId');
    const params = {
        UserId: userId,
    };
    const url = 'RoleMaster/GetMenu';
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

// export const getUserApi = (uId, navigate) => {
//     const userId = localStorage.getItem('userId');
//     console.log(uId)
//     const params = {
//         userId: userId,
//         um_id: uId,
//     };
//     const url = 'RoleMaster/Get';
//     return apiClient({
//         method: 'get',
//         url: UrlData + url,
//         params: params,
//     })
//         .then((response) => {
//             console.log('get API response:', response.data);
//             // toast.success("Job Added Successfully!")
//             const token1 = response.data.outcome.tokens;
//             Cookies.set("UserCredential", token1, { expires: 7 });
//             return response.data.data;
//         })
//         .catch((error) => {
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.outcome
//             ) {
//                 const token1 = error.response.data.outcome.tokens;
//                 Cookies.set("UserCredential", token1, { expires: 7 });
//             }
//             console.log(error);

//             const errors = ErrorHandler(error, navigate);
//             toast.error(errors);
//             return null;
//         });
// };

export const deleteRoleApi = (roleId, navigate) => {
    const userId = localStorage.getItem('userId');
    const data = {
        userId: userId,
        r_id: roleId,
    };
    const url = 'RoleMaster/DeleteRole';
    return apiClient({
        method: 'post',
        url: UrlData + url,
        data: data,
    })
        .then((response) => {
            console.log('delete API response:', response.data);
            toast.success("Role Deleted Successfully!")
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