import React, { useEffect, useState } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Swal from 'sweetalert2';
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import Table from "examples/Tables/Table";
import { Icon } from '@mui/material';
import IdReq from '../../../Requests/IdReq';
import Pagination from '@mui/material/Pagination';
import ProjectsApi from '../../../API/ProjectsApi';
import SearchProjects from './SearchProjects';
import SearchProjectsReq from '../../../Requests/Projects/SearchProjectsReq';
import CreateProjectDialog from './CreateProjectDialog';
import AddUserToProject from './AddUserToProject';
import { FcDownRight } from "react-icons/fc";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Index = () => {
    let navigate = useNavigate();
    const [SearchReq, setSearchReq] = useState(new SearchProjectsReq());
    const [ResponseData, setResponseData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);

    const [TableDataRows, setTableDataRows] = useState([])
    const [Page, setPage] = useState(1);
    const [TotalPages, setTotalPages] = useState(0);

    const [CreateProjectDialogEnabled, setCreateProjectDialogEnabled] = useState(false);
    const [AddUserEnabled, setAddUserEnabled] = useState(false);
    const [SelectedProject, setSelectedProject] = useState(null);
    const searchProjects = async () => {
        SearchReq.pagingParams.pageNumber = Page;
        SearchReq.pagingParams.pageSize = 10;
        let res = await ProjectsApi.SearchProjects(SearchReq);
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
        searchProjects();
    }, [Page, SearchReq])

    useEffect(() => {
        if (!IsLoaded) {
            searchProjects();
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
        { name: "Users", align: "center" },
        { name: "Details", align: "center" },
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

    const MakeTableRow = (project) => {
        return (
            {
                ID: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {project.id}  
                    </SoftTypography>
                ),
                Name: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {project.name}
                    </SoftTypography>
                ),
                 
                Users: (
                    <SoftButton
                        variant="contained" color="secondary" size="small"
                        onClick={() => { 
                            setSelectedProject(project);
                            setAddUserEnabled(true);
                        }
                    }>
                        {project.users.length} Users
                    </SoftButton>
                ),
                Details: (
                    <SoftButton
                        variant="contained" color="info" 
                        onClick={() => {
                            navigate(
                                '/Projects/Details',
                                {
                                  state: {
                                    project: project
                                  }
                                }
                              )
                        }
                    }>
                        <BsFillArrowRightCircleFill style={{ color: "white", fontSize: "1.5em" }}/>
                    </SoftButton>
                ),
                Delete: (
                    <SoftButton
                        variant="contained" color="dark" size="small"
                        onClick={() => {
                            ToggleProjectDelete(project.id);
                        }
                    }>
                        <Icon> {
                        project.isDeleted ? "undo" : "delete"
                        } </Icon>
                    </SoftButton>
                ),

            }
        );
    }

    const ToggleProjectDelete = async (id) => {
        Swal.fire({
            icon: 'info',
            title: 'Toggling Project Delete',
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
        let res = await ProjectsApi.ToggleProjectDelete(req);
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
    // let test = true
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SearchProjects SearchReq={SearchReq} setSearchReq={setSearchReq}  CreateProjectDialogEnabled={CreateProjectDialogEnabled} setCreateProjectDialogEnabled={setCreateProjectDialogEnabled} />
            <Card sx={{ width: "100%", height: "100%", padding: "1rem", marginTop:"1em" }}>
                <SoftTypography variant="h5" color="text" fontWeight="medium">
                    Projects
                </SoftTypography>
                {IsLoaded ? <><Table columns={columns} rows={TableDataRows} />
                <div className='text-right mx-3 my-4' style={{ marginTop:"0.5em", marginBottom: "0.5em" }}>
                            <Pagination count={TotalPages} onChange={(e, num) => setPage(num)} color="primary" className='float-right' />
                </div> </>: <LoaderSmall />} 
                <CreateProjectDialog Enabled={CreateProjectDialogEnabled} setEnabled={setCreateProjectDialogEnabled} setIsLoaded={setIsLoaded} />
                <AddUserToProject Enabled={AddUserEnabled} setEnabled={setAddUserEnabled} Project={SelectedProject} setIsLoaded={setIsLoaded} />
            </Card> 
            {/* <button onClick={() => {setTest(!test)}}>
                
            </button>
            {
                test ? <>details</> : <>edit</>
            } */}
        </DashboardLayout>
    )
}

export default Index