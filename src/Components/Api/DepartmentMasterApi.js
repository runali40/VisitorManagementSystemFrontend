import { apiClient } from "../../apiClient";
import UrlData from "../../UrlData";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

export const AddDepartmentApi = (
  departmentCode,
  departmentName,
  departmentId,
  navigate
) => {
  if (!departmentCode || !departmentName) {
    toast.success("Please fill all the details");
    return null;
  }
  const userId = localStorage.getItem("userId");
  const data = {
    userId: userId,
    departmentCode: departmentCode,
    departmentName: departmentName,
  };
  if (departmentId !== null && departmentId !== "") {
    data.id = departmentId;
  }
  const url = "DepartmentMaster/Insert";
  return apiClient({
    method: "post",
    url: UrlData + url,
    data: data,
  })
    .then((response) => {
      console.log("API response:", response);
      // toast.success("Visitor Type added successfully!");
      if (data.id) {
        toast.success("Department updated successfully!");
      } else {
        toast.success("Department added successfully!");
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

export const getAllDepartmentApi = (navigate) => {
  const userId = localStorage.getItem("userId");
  const params = {
    userId: userId,
  };
  const url = "DepartmentMaster/GetAll";
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

export const getDepartmentApi = (departmentId, navigate) => {
  const userId = localStorage.getItem("userId");
  console.log(departmentId);
  const params = {
    userId: userId,
    Id: departmentId,
  };
  const url = "DepartmentMaster/Get";
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

export const deleteDepartmentApi = (departmentId, navigate) => {
  const userId = localStorage.getItem("userId");
  const data = {
    userId: userId,
    id: departmentId,
  };
  const url = "DepartmentMaster/Delete";
  return apiClient({
    method: "post",
    url: UrlData + url,
    data: data,
  })
    .then((response) => {
      console.log("delete API response:", response.data);
      toast.success("Department Deleted Successfully!");
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
