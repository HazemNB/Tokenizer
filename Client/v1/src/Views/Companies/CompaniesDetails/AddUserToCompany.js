import { Card } from '@mui/material'
import CompaniesApi from '../../../API/CompaniesApi'
import SoftButton from 'components/SoftButton'
import SoftTypography from 'components/SoftTypography'
import CompanySelector from 'ProjectComponents/CompanySelector'
import React, { useState } from 'react';
import ManyToManyReq from '../../../Requests/ManyToManyReq';
import Swal from 'sweetalert2'


const AddUserToCompany = ({ User, setEnabled, Enabled, setIsLoaded }) => {
    const [Company, setCompany] = useState(null);
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


        let req = new ManyToManyReq(Company.id, User.id);

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
        <Card sx={{ width: "100%", height: "100%", padding: "1rem", margin: "1em 0" }}>
            <SoftTypography variant="h5" color="text" fontWeight="medium">
                Add User To  Company
            </SoftTypography>
            <div className='CreateTokenTypeDiv'>
                <SoftTypography variant="h6" color="text" fontWeight="medium">
                    Add New User
                </SoftTypography>
                <CompanySelector setCompany={setCompany} />
                <SoftButton onClick={addUserToCompany}>Add Company</SoftButton>
            </div>

        </Card>
    )
}

export default AddUserToCompany