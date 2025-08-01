import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Pagination } from "../../../Utils/Pagination";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure this is loaded once globally
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import { deleteRoleApi, getAllRoleApi } from "../../../Api/RoleMasterApi";
import { Delete, Edit } from "@material-ui/icons";

const RoleMaster = () => {
    const headerCellStyle = {
        backgroundColor: "#8b5c7e",
        color: "#fff",
    };
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchData, setSearchData] = useState("")
    const [allRole, setAllRole] = useState([]); // Dummy empty state

    useEffect(() => {
        getAllRole();
    }, [currentPage, itemsPerPage]);

    const getAllRole = async () => {
        const data = await getAllRoleApi(navigate);
        console.log(data)
        setAllRole(data)
    }

    const GetRoleMaster = (roleId) => {
        navigate('/addRoleMaster', { state: { roleId } });
    };

    const DeleteRoleData = async (roleId) => {
        const data = await deleteRoleApi(roleId, navigate);
        console.log(data)
        getAllRole()
    }

    const handleSearch = (e) => {
        const searchDataValue = e.target.value.toLowerCase();
        setSearchData(searchDataValue);

        if (searchDataValue.trim() === "") {
            getAllRole();
        } else {
            const filteredData = allRole.filter((user) => {
                const roleName = user.r_rolename ? user.r_rolename.toLowerCase() : '';
                const description = user.r_description ? user.r_description.toLowerCase() : '';
                return roleName.includes(searchDataValue) || description.includes(searchDataValue);
            });
            setAllRole(filteredData);
            setCurrentPage(1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allRole.slice(indexOfFirstItem, indexOfLastItem);
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
                                                <h3>Role Master</h3>
                                            </div>
                                            <div className="col-lg-2 d-flex justify-content-end">
                                                {/* <Button onClick={handleNavigate}  style={headerCellStyle}>
                                                    Add
                                                </Button> */}
                                                <button
                                                    className="btn btn-md text-light"
                                                    type="button"
                                                    style={{ backgroundColor: "#8b5c7e" }}
                                                    onClick={() => navigate("/addRoleMaster")}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body pt-3">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start">
                                                <h6 className="mt-2">Show</h6>&nbsp;&nbsp;
                                                <select className="form-select w-auto" style={{ height: "35px" }}>
                                                    <option value="10">10</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                &nbsp;&nbsp;
                                                <h6 className="mt-2">entries</h6>
                                            </div>

                                            <div className="col-lg-6 col-md-6"></div>

                                            <div className="col-lg-3 col-md-3 d-flex justify-content-lg-end mt-lg-0 mt-md-0 mt-3">
                                                <input className="form-control" placeholder="Search here" value={searchData}
                                                    onChange={handleSearch} />
                                            </div>
                                        </div>

                                        <br />

                                        <Table striped hover responsive className="border text-left">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Sr.No
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Role Name
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Description
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Menu Name
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Status
                                                    </th>
                                                    <th scope="col" style={headerCellStyle}>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((data, index) => (
                                                    <tr key={data.r_id}>
                                                        <td>
                                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                                        </td>
                                                        <td>{data.r_rolename}</td>
                                                        <td>{data.r_description}</td>

                                                        <td>{data.m_menuname}</td>
                                                        <td>{data.r_isactive}</td>
                                                        <td>
                                                            <div className="d-flex"><Edit
                                                                className="text-success mr-2"
                                                                type="button"

                                                                style={{

                                                                    ...(data.r_isactive === "Inactive" && {
                                                                        opacity: 0.5,
                                                                        cursor: "not-allowed",
                                                                    }),
                                                                }}
                                                                onClick={data.r_isactive === "Inactive" ? null : () => GetRoleMaster(data.r_id)}
                                                            />
                                                                <Delete
                                                                    className="text-danger"
                                                                    type="button"


                                                                    style={{
                                                                        marginLeft: "0.5rem",
                                                                        ...(data.r_isactive === "Inactive" && {
                                                                            opacity: 0.5,
                                                                            cursor: "not-allowed",
                                                                        }),
                                                                    }}
                                                                    onClick={data.r_isactive === "Inactive" ? null : () => DeleteRoleData(data.r_id)}
                                                                /> </div>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

                                        <div className="row mt-4 mt-xl-3">
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <h6 className="text-lg-start text-center"> Showing {indexOfFirstItem + 1} to{" "}
                                                    {Math.min(indexOfLastItem, allRole.length)} of{" "}
                                                    {allRole.length} entries</h6>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12"></div>
                                            <div className="col-lg-4 col-md-4 col-12 mt-3 mt-lg-0 mt-md-0">
                                                <Pagination
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                    allData={allRole}
                                                    itemsPerPage={itemsPerPage}
                                                />
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

export default RoleMaster;
