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
import ProjectsApi from '../../../API/ProjectsApi';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
const Index = () => {
    let navigate = useNavigate();
    const [ResponseData, setResponseData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);

    const [TableDataRows, setTableDataRows] = useState([])

    const searchProjects = async () => {
        let res = await ProjectsApi.GetUserProjects();
        if (res.status.success) {
            setResponseData(res.data);
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }
 

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
    ];
    const RefreshTable = () => {
        let rows = [];
        ResponseData?.forEach((user) => {
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

            }
        );
    }

    
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card sx={{ width: "100%", height: "100%", padding: "1rem", marginTop:"1em" }}>
                <SoftTypography variant="h5" color="text" fontWeight="medium">
                    Projects
                </SoftTypography>
                {IsLoaded ? <><Table columns={columns} rows={TableDataRows} />
                <div className='text-right mx-3 my-4' style={{ marginTop:"0.5em", marginBottom: "0.5em" }}>
                </div> </>: <LoaderSmall />} 
            </Card> 
        </DashboardLayout>
    )
}

export default Index