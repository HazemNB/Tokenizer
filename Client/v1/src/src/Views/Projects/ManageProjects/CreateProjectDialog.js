import React, { useEffect, useState } from 'react'
import SoftButton from "components/SoftButton";
import Swal from 'sweetalert2';
import ProjectsApi from '../../../API/ProjectsApi';
import IdReq from '../../../Requests/IdReq';
import { Dialog } from '@mui/material';
import { Icon } from '@mui/material';
import SoftInput from 'components/SoftInput';

const CreateProjectDialog = ({ Enabled, setEnabled, setIsLoaded }) => {
    const [ProjectName, setProjectName] = useState('');

    const createProject = async () => {
        setEnabled(false);

        Swal.fire({
            icon: 'info',
            text: 'Creating project...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        if (!ProjectName) {
            Swal.fire({
                icon: 'error',
                title: 'Project name is required',
                text: 'Please enter project name',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            });
            return;
        }

        let req = new IdReq();
        req.Name = ProjectName;

        let res = await ProjectsApi.CreateProject(req);

        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
                didOpen: () => {
                    Swal.hideLoading();
                }
            });

            setIsLoaded(false);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.status.message,
                didOpen: () => {
                    Swal.hideLoading();
                }
            });
        }
    }





    return (
        <Dialog open={Enabled}>
            <div>
                <div style={{ display: 'flex', flexDirection:"row-reverse", justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <Icon onClick={() => setEnabled(false)}>close</Icon>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:"2fr 1fr", gridColumnGap:"1em", justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                    <SoftInput placeholder="Project Name" value={ProjectName} onChange={(e) => setProjectName(e.target.value)} />
                    <SoftButton variant="contained" color="info"
                        onClick={() => {
                            createProject();
                        }}>Create</SoftButton>
                </div>
            </div>
        </Dialog>
    )
}

export default CreateProjectDialog;
