import React, { useEffect, useState } from 'react'
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Swal from 'sweetalert2';
import ProjectsApi from '../../../API/ProjectsApi';
import { Dialog } from '@mui/material';
import { Icon } from '@mui/material';
import ManyToManyReq from '../../../Requests/ManyToManyReq';
import UserSelector from 'ProjectComponents/UserSelector';
import IdReq from '../../../Requests/IdReq';
const AddUserToProject = ({ Enabled, setEnabled, setIsLoaded, Project }) => {
    const [User, setUser] = useState(null);

    const addUserToProject = async () => {
        setEnabled(false);

        Swal.fire({
            icon: 'info',
            text: 'Adding user to project...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        if (!User) {
            Swal.fire({
                icon: 'error',
                title: 'User is required',
                text: 'Please select user',
                didOpen: () => {
                    Swal.hideLoading();
                }
            });
            return;
        }

        let req = new ManyToManyReq(Project.id, User.id);

        let res = await ProjectsApi.AddUserToProject(req);

        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
                didOpen: () => {
                    Swal.hideLoading();
                }
            });
            setIsLoaded(false);
        } else {
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

    const RemoveUserFromProject = async (id) => {
        setEnabled(false);
        
        Swal.fire({
            icon: 'info',
            text: 'Removing user from project...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new IdReq(id);

        let res = await ProjectsApi.RemoveUserFromProject(req);

        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
                didOpen: () => {
                    Swal.hideLoading();
                }
            });
            setIsLoaded(false);
        } else {
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
        <Dialog open={Enabled} maxWidth={"md"} fullWidth onClose={() => setEnabled(false)}
        PaperProps={{
            sx: {
              width: "100%",
              maxHeight: 300,
              height: "100%",
            }
          }}>
            <div>
                <div style={{ display: 'flex', flexDirection: "row-reverse", justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <Icon onClick={() => setEnabled(false)}>close</Icon>
                </div>
                {/* Title saying Add User To Project: {id}.{name}  */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                    {Project ? <SoftTypography variant="h5" style={{ marginBottom: '10px' }}>Add User To Project #{Project.id} - {Project.name}</SoftTypography>
                        : <SoftTypography variant="h5" style={{ marginBottom: '10px' }}>No project selected!!</SoftTypography>
                    }                </div>
                <div style={{ display: 'grid', gridTemplateColumns: "2fr 1fr", gridColumnGap: "1em", justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                    <UserSelector setUser={setUser} />
                    <SoftButton onClick={addUserToProject}>Add User</SoftButton>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                    {
                        Project?.users?.map((user, index) => {
                            return (
                                <div key={index} style={{ display: 'grid', gridTemplateColumns: "2fr 1fr", gridColumnGap:"1em", justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                <SoftTypography variant="h6">#{user.user.id}  {user.user.name}</SoftTypography>
                                <SoftButton variant="outlined" color="error" onClick={() => RemoveUserFromProject(user.id)}>Remove</SoftButton>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
        </Dialog>
    )
}

export default AddUserToProject;
