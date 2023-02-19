import React, { useEffect, useState } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Swal from 'sweetalert2';
import UsersApi from '../../../API/UsersApi';
import SearchUsers from './SearchUsers';
import SearchUsersReq from '../../../Requests/Users/SearchUsersReq';
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import Table from "examples/Tables/Table";
import { Icon } from '@mui/material';
import IdReq from '../../../Requests/IdReq';
import Pagination from '@mui/material/Pagination';
import AddProjectToUser from './AddProjectToUser';

const index = () => {
    const [SearchReq, setSearchReq] = useState(new SearchUsersReq());
    const [ResponseData, setResponseData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);

    const [TableDataRows, setTableDataRows] = useState([])
    const [Page, setPage] = useState(1);
    const [TotalPages, setTotalPages] = useState(0);

    const [SelectedUser, setSelectedUser] = useState(null);
    const [AddProjectEnabled, setAddProjectEnabled] = useState(false);

    const searchUsers = async () => {
        SearchReq.pagingParams.pageNumber = Page;
        SearchReq.pagingParams.pageSize = 10;
        let res = await UsersApi.SearchUsers(SearchReq);
        if (res.status.success) {
            setResponseData(res.data);
            setTotalPages(res.data.totalPages);
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }

    useEffect(() => {
        searchUsers();
    }, [Page, SearchReq])

    useEffect(() => {
        if (!IsLoaded) {
            searchUsers();
        }
        else{
            RefreshTable();
        }
    }, [IsLoaded]);

    useEffect(() => {
        if(ResponseData){
            setIsLoaded(true);
            RefreshTable();
        }
    }, [ResponseData]);

    let columns= [
        { name: "ID", align: "center" },
        { name: "Name", align: "left" },
        { name: "Email", align: "left" },
        { name: "Phone", align: "left" },
        { name: "Activation", align: "center" },
        { name: "Projects", align: "center" },
        { name: "Delete", align: "center" },
    ];

    const RefreshTable = () => {
        let rows = [];
        ResponseData.list?.forEach((user) => {
            rows.push(
                MakeTableRow(user)
            );
        });
        setTableDataRows(rows);
    }


    const MakeTableRow = (user) => {
        return (
            {
                ID: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {user.id} ({user.userType})
                    </SoftTypography>
                ),
                Name: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {user.name}
                    </SoftTypography>
                ),
                Email: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {user.email}
                    </SoftTypography>
                ),
                Phone: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {user.phone}
                    </SoftTypography>
                ),
                Activation: (
                    <button
                        style={{
                            backgroundColor: user.isActive ? "#ea0606" : "#4CAF50",
                            color: "white",
                            padding: "5px 10px",
                            border: "2px solid #black",
                            borderRadius: "5px",
                            cursor: "pointer",
                            height: "2em",
                            fontSize: "1.1em",
                            fontWeight: "bold",
                        }}
                        onClick={() => {
                            ToggleUserActivation(user.id);
                        }
                    }>
                        {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                ),
                Projects: (
                    <SoftButton
                        variant="contained" color="primary" size="small"
                        onClick={() => { 
                            setSelectedUser(user);
                            setAddProjectEnabled(true);
                        }
                    }>
                        {user.projects.length} Projects
                    </SoftButton>
                ),
                Delete: (
                    <SoftButton
                        variant="contained" color="dark" size="small"
                        onClick={() => {
                            ToggleUserDelete(user.id);
                        }
                    }>
                        <Icon> {
                        user.isDeleted ? "undo" : "delete"
                        } </Icon>
                    </SoftButton>
                ),

            }
        );
    }

    const ToggleUserActivation = async (id) => {
        Swal.fire({
            icon: 'info',
            title: 'Toggling User Activation',
            text: 'Please wait...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new IdReq(id);
        let res = await UsersApi.ToggleUserActivation(req);
        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
            });
            setIsLoaded(false);
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }
    
    const ToggleUserDelete = async (id) => {
        Swal.fire({
            icon: 'info',
            title: 'Toggling User Delete',
            text: 'Please wait...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new IdReq(id);
        let res = await UsersApi.ToggleUserDelete(req);
        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
            });
            setIsLoaded(false);
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SearchUsers SearchReq={SearchReq} setSearchReq={setSearchReq} />
            {
                IsLoaded ? (
                    <Card style={{ marginTop: "1em" }}>
                        <Table columns={columns} rows={TableDataRows} />
                        <div className='text-right mx-3 my-4' style={{ marginTop:"0.5em", marginBottom: "0.5em" }}>
                            <Pagination count={TotalPages} onChange={(e, num) => setPage(num)} color="primary" className='float-right' />
                        </div>
                    </Card>
                ) : (
                    <LoaderSmall/>
                )
            }

            <AddProjectToUser User={SelectedUser} setIsLoaded={setIsLoaded} Enabled={AddProjectEnabled} setEnabled={setAddProjectEnabled} />

        </DashboardLayout>
    )
}

export default index;