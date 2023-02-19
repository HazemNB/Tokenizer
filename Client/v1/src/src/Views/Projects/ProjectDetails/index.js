import React, { useEffect, useState } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from 'react-router-dom';
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import IdReq from '../../../Requests/IdReq';
import ProjectsApi from '../../../API/ProjectsApi';
import DetailsBody from './DetailsBody';
import "./ProjectDetails.scss";
const index = () => {
    const { state } = useLocation();

    const [Project, setProject] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);

    const GetProjectDetails = async () => {
        let req = new IdReq(state.project.id);
        let res = await ProjectsApi.GetProjectById(req);

        if (res.status.success) {
            setProject(res.data);
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }

    useEffect(() => {
        if (Project) {
            setIsLoaded(true);
        }
    }, [Project]);

    useEffect(() => {
        if (!IsLoaded) {
            GetProjectDetails();
        }
    }, [IsLoaded]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="PJ-Details-container">
                <div className='PJ-Details-Header'>
                    <div className='PJ-Header-Side'>Project #{state.project.id}</div>
                    <div className='PJ-Header-center'>{state.project.name}</div>
                    <div className='PJ-Header-Side'>{state.project.users.length} Users</div>
                </div>
                {IsLoaded ? <DetailsBody Project={Project} setIsLoaded = {setIsLoaded} /> : <LoaderSmall />}
            </div>
        </DashboardLayout>
    )
}

export default index