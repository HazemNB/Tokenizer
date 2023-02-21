import { Card } from '@mui/material'
import CompaniesApi from '../../../API/CompaniesApi'
import SoftButton from 'components/SoftButton'
import SoftTypography from 'components/SoftTypography'
import CompanyUserSelector from 'ProjectComponents/CompanyUserSelector'
import React, { useState } from 'react';
import ManyToManyReq from '../../../Requests/ManyToManyReq';
import Swal from 'sweetalert2'


const AddUserToCompany = ({setIsLoaded, Company }) => {
    const [SelectedUser, setSelectedUser] = useState(null);
    const addUserToCompany = async () => {

        Swal.fire({
            icon: 'info',
            text: 'Adding user to company...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        if (!Company) {
            Swal.fire({
                icon: 'error',
                title: 'Company is required',
                text: 'Please select user',
                didOpen: () => {
                    Swal.hideLoading();
                }
            });
            return;
        }
        if(!SelectedUser){

        }

        let req = new ManyToManyReq(SelectedUser.id, Company.id);

        let res = await CompaniesApi.AddUserToCompany(req);

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
        <Card sx={{ width: "100%", height: "10em", padding: "1rem", margin: "1em 0" }}>
            <SoftTypography variant="h5" color="text" fontWeight="medium">
                Add User To  Company
            </SoftTypography>
            <div className='CreateTokenTypeDiv'>
                <SoftTypography variant="h6" color="text" fontWeight="medium">
                    Add New User
                </SoftTypography>
                <CompanyUserSelector setUser={setSelectedUser} />
                <SoftButton onClick={addUserToCompany}>Add to Company</SoftButton>
            </div>

        </Card>
    )
}

export default AddUserToCompany