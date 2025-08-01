import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AddRoleApi, getAllScreenApi } from "../../../Api/RoleMasterApi";
import ErrorHandler from "../../../ErrorHandler/ErrorHandler";
import { apiClient } from "../../../../apiClient";

const AddRoleMaster = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };
    const navigate = useNavigate();
    const location = useLocation();
    const { roleId } = location.state || {};
    console.log(roleId, "roleId")

    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const [module, setModule] = useState("");
    const [noOfUsers, setNoOfUsers] = useState("");
    const [active, setActive] = useState(true);
    const [allScreens, setAllScreens] = useState([]);
    const [menuDataArray, setMenuDataArray] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);

    useEffect(() => {
        getAllScreen();
        setIsDataLoaded(true);
    }, []);

    useEffect(() => {
        // const recruitId = localStorage.getItem("recruitId");
        const UserId = localStorage.getItem("userId");
        if (isDataLoaded && roleId) {
            apiClient({
                method: "get",
                url: `RoleMaster/GetRoleById`.toString(),
                params: {
                    UserId: UserId,
                    // r_recruitid: recruitId,
                    r_id: roleId,
                    r_isactive: "1",
                },
            })
                .then((response) => {
                    console.log(response, "get by id role master");
                    const temp = response.data.data;
                    // console.log(response.data.data[0].r_rolename);
                    // if (temp.length !== 0) {
                    setRoleName(temp[0].r_rolename);
                    setRoleDescription(temp[0].r_description);
                    setModule(temp[0].r_module);
                    setNoOfUsers(temp[0].r_no_of_user);
                    setMenuDataArray(temp);
                    // }
                    // else {
                    //   setMenuDataArray([]);
                    // }
                    const token1 = response.data.outcome.tokens;
                    Cookies.set("UserCredential", token1, { expires: 7 });
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
                    const errors = ErrorHandler(error);
                    toast.error(errors);
                });
        }
    }, [isDataLoaded, roleId]);

    const getAllScreen = async () => {
        const data = await getAllScreenApi(navigate);
        console.log(data)
        setAllScreens(data)
    }

    const AddRole = async () => {
        const data = await AddRoleApi(roleName, roleDescription, menuDataArray, roleId, navigate);
        console.log(data)
        navigate("/roleMaster")
    }

    const handleCheckboxChange = (event, menuid) => {
        const { checked, id } = event.target;
        let newData = [...menuDataArray];
        let found = false;

        // Check if the menuData object with the specified menuid exists
        let updatedData = newData.map((menuData) => {
            if (menuData.a_menuid === menuid) {
                found = true;
                // Update the checkbox state
                return { ...menuData, [id]: checked ? "1" : "" };
            }
            return menuData;
        });

        // If all five checkboxes are unchecked, remove the menuData object
        if (!checked) {
            const menuData = updatedData.find((data) => data.a_menuid === menuid);
            if (
                menuData &&
                !menuData.a_addaccess &&
                !menuData.a_editaccess &&
                !menuData.a_viewaccess &&
                !menuData.a_deleteaccess &&
                !menuData.a_workflow
            ) {
                updatedData = updatedData.filter((data) => data.a_menuid !== menuid);
            }
        }

        // If the menuData object doesn't exist, create a new one
        if (!found && checked) {
            const newMenuData = {
                a_menuid: menuid,
                [id]: "1",
                a_addaccess: id === "a_addaccess" ? "1" : "",
                a_editaccess: id === "a_editaccess" ? "1" : "",
                a_viewaccess: id === "a_viewaccess" ? "1" : "",
                a_deleteaccess: id === "a_deleteaccess" ? "1" : "",
                a_workflow: id === "a_workflow" ? "1" : "",
            };
            updatedData.push(newMenuData);
        }

        // Set the updated data array
        setMenuDataArray(updatedData);
    };

    const handleCheckboxChange1 = (event, menuid) => {
        const { checked, id } = event.target;
        let newData = [...menuDataArray];
        let found = false;
        newData = newData.map((menuData) => {
            if (menuData.a_menuid === menuid) {
                found = true;
                return {
                    ...menuData,
                    [id]: checked ? "1" : "",
                    // Set other permissions to the same value as the clicked checkbox
                    a_addaccess: checked ? "1" : "",
                    a_editaccess: checked ? "1" : "",
                    a_viewaccess: checked ? "1" : "",
                    a_deleteaccess: checked ? "1" : "",
                    a_workflow: checked ? "1" : "",
                };
            }
            return menuData;
        });

        // If the checkbox is unchecked and there are no other checkboxes checked for this menuid,
        // then remove the menuData object from newData
        if (
            !checked &&
            !newData.some(
                (data) =>
                    data.a_menuid === menuid &&
                    data.a_addaccess === "1" &&
                    data.a_editaccess === "1" &&
                    data.a_viewaccess === "1" &&
                    data.a_deleteaccess === "1" &&
                    data.a_workflow === "1"
            )
        ) {
            newData = newData.filter((data) => data.a_menuid !== menuid);
        }

        setMenuDataArray(newData);
        if (!found && checked) {
            newData.push({
                a_menuid: menuid,
                [id]: "1",
                a_addaccess: "1",
                a_editaccess: "1",
                a_viewaccess: "1",
                a_deleteaccess: "1",
                a_workflow: "1",
            });
            setMenuDataArray(newData);
        }
    };

    const handleMasterCheckboxChange = (event) => {
        const { checked } = event.target;
        setIsAllChecked(checked);

        let updatedData;
        if (checked) {
            // If master is checked, set all checkboxes to "1"
            updatedData = allScreens.map((item) => ({
                a_menuid: item.a_menuid,
                a_addaccess: "1",
                a_editaccess: "1",
                a_viewaccess: "1",
                a_deleteaccess: "1",
                a_workflow: "1",
            }));
        } else {
            // If master is unchecked, set all checkboxes to ""
            updatedData = allScreens.map((item) => ({
                a_menuid: item.a_menuid,
                a_addaccess: "",
                a_editaccess: "",
                a_viewaccess: "",
                a_deleteaccess: "",
                a_workflow: "",
            }));
        }

        setMenuDataArray(updatedData);
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
                                                <h3>Add Role</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">

                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => navigate("/roleMaster")}
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
                                                        Role Name:
                                                    </label>{" "}
                                                    <span className="text-danger fw-bold">*</span>
                                                    <input
                                                        type="text"
                                                        id="roleName"
                                                        name="roleName"
                                                        className="form-control mt-3"
                                                        autoComplete="off"
                                                        placeholder="Enter Role Name"
                                                        value={roleName}
                                                        onChange={(e) => setRoleName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-lg-0 mt-4">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        Description:
                                                    </label>{" "}
                                                    {/* <span className="text-danger fw-bold">*</span> */}
                                                    <textarea
                                                        className="form-control mt-3"
                                                        id="description"
                                                        rows="2"
                                                        placeholder="Enter Description"
                                                        value={roleDescription}
                                                        onChange={(e) => setRoleDescription(e.target.value)}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-0 mt-lg-0 d-none">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        No of Assign Users:
                                                    </label>{" "}
                                                    {/* <span className="text-danger fw-bold">*</span> */}
                                                    <input
                                                        type="text"
                                                        id="noOfUsers"
                                                        name="noOfUsers"
                                                        className="form-control mt-3"
                                                        autoComplete="off"
                                                        placeholder="Enter No of Assign Users"
                                                        value={noOfUsers}
                                                        onChange={(e) => setNoOfUsers(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                                <div className="form-group form-group-sm">
                                                    <label className="control-label fw-bold">
                                                        {/* Department Head: */}
                                                    </label>
                                                    <div className="form-group form-group-sm ">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={active}
                                                                onChange={(e) => setActive(e.target.checked)}
                                                                id="defaultCheck1"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="defaultCheck1"
                                                            >
                                                                Is Active
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <Table striped hover responsive className="border text-left">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={headerCellStyle}>
                                                        <input
                                                            className="form-check-input flexCheckDefault"
                                                            type="checkbox"
                                                            checked={isAllChecked}
                                                            onChange={handleMasterCheckboxChange}
                                                        />
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Screen Name
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Add
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Update
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        View
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Delete
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Workflow
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allScreens.map((item) => (
                                                    <tr key={item.a_menuid}>
                                                        <td className="">
                                                            <input
                                                                className="form-check-input flexCheckDefault"
                                                                type="checkbox"
                                                                value=""
                                                                onChange={(e) =>
                                                                    handleCheckboxChange1(e, item.a_menuid)
                                                                }
                                                            />
                                                        </td>
                                                        <td style={{ display: "none" }} id="a_menuid">
                                                            {item.a_menuid}
                                                        </td>
                                                        <td id="m_menuname">{item.m_menuname}</td>
                                                        <td className="">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                checked={menuDataArray.some(
                                                                    (data) =>
                                                                        data.a_menuid === item.a_menuid &&
                                                                        data.a_addaccess === "1"
                                                                )}
                                                                id="a_addaccess"
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(e, item.a_menuid)
                                                                }
                                                            />
                                                        </td>

                                                        <td className="">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                checked={menuDataArray.some(
                                                                    (data) =>
                                                                        data.a_menuid === item.a_menuid &&
                                                                        data.a_editaccess === "1"
                                                                )}
                                                                id="a_editaccess"
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(e, item.a_menuid)
                                                                }
                                                            />
                                                        </td>
                                                        <td className="">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                checked={menuDataArray.some(
                                                                    (data) =>
                                                                        data.a_menuid === item.a_menuid &&
                                                                        data.a_viewaccess === "1"
                                                                )}
                                                                id="a_viewaccess"
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(e, item.a_menuid)
                                                                }
                                                            />
                                                        </td>
                                                        <td className="">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                checked={menuDataArray.some(
                                                                    (data) =>
                                                                        data.a_menuid === item.a_menuid &&
                                                                        data.a_deleteaccess === "1"
                                                                )}
                                                                id="a_deleteaccess"
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(e, item.a_menuid)
                                                                }
                                                            />
                                                        </td>
                                                        <td className="">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                checked={menuDataArray.some(
                                                                    (data) =>
                                                                        data.a_menuid === item.a_menuid &&
                                                                        data.a_workflow === "1"
                                                                )}
                                                                id="a_workflow"
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(e, item.a_menuid)
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-lg-12 text-end">
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => {
                                                        AddRole();

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

export default AddRoleMaster;
