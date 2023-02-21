import { Card } from '@mui/material'
import UsersApi from '../../../../API/UsersApi'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import SoftTypography from 'components/SoftTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useState } from 'react'
import CreateUserReq from '../../../../Requests/Users/CreateUserReq'
import Swal from 'sweetalert2'
import "./CreateUsers.scss"
const index = () => {
  const [Email,setEmail]= useState()
  const [Name,setName]= useState()
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [UserType, setType] = useState("User");
  const [Phone, setPhone] = useState();
  const createUser = async () => {
    Swal.fire({
      icon: 'info',
      title: 'Creating User',
      text: 'Please wait...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    //check if email empty
    if (!Email) {
      Swal.fire({
        icon: 'error',
        title: 'Email is required',
        text: 'Please enter email',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: true,
        didOpen: () => {
          Swal.hideLoading()
        }
      });
      return;
    }

    // check email is valid using regex
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!Email.match(emailRegex)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: true,
        didOpen: () => {
          Swal.hideLoading()
        }
      });
      return;
    }
    

    // check password > 6 characters and confirm password matches
    if (!Password || Password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Password must be at least 6 characters',
        text: 'Please enter password',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: true,
        didOpen: () => {
          Swal.hideLoading()
        }
      });
      return;
    }

    if (Password !== ConfirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please enter password',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: true,
        didOpen: () => {
          Swal.hideLoading()
        }
      });
      return;
    }



    let req = new CreateUserReq(Name, Email, Phone, UserType, Password);
    let res = await UsersApi.CreateUser(req);
    if (res.status.success) {
      Swal.fire({
        icon: 'success',
        title: 'User Created',
        text: res.status.message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: true,
        didOpen: () => {
          Swal.hideLoading()
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: res.status.message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: true,
        didOpen: () => {
          Swal.hideLoading()
        }
      });
    }
  }

   return (
    <DashboardLayout>
     <DashboardNavbar />
     <div className='CreateUsersDiv'>
     <Card id="CreateUserCard">
     <SoftBox pt={3} px={2}>
            <SoftTypography variant="h6" fontWeight="medium">
              Create a new user
            </SoftTypography>
          </SoftBox>
          <SoftBox pt={1} pb={2} px={2} display="flex" flexDirection="column">
          <SoftBox
              display="flex"
              justifyContent="space-around"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              mb={2}
              className='CreateUserBox'
            >
              <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Email
              </SoftTypography>
              <input type="text" className='CreateUserInput' onChange={(e) => setEmail(e.target.value)} />
            </SoftBox>
            <SoftBox
              display="flex"
              justifyContent="space-around"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              mb={2}
              className='CreateUserBox'
            >
              <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Name
              </SoftTypography>
              <input type="text" className='CreateUserInput' onChange={(e) => setName(e.target.value)} />
            </SoftBox>
            <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateUserBox' >
              <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Phone
              </SoftTypography>
              <input type="text" className='CreateUserInput' onChange={(e) => setPhone(e.target.value)} />
            </SoftBox>
            
            <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateUserBox' >
              <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                User Type
              </SoftTypography>
              <select name="userType" id="userType" className='CreateUserInput' onChange={(e) => setType(e.target.value)}>
                <option value="User">User</option>
                <option value="CompanyUser">Company User</option>
                <option value="CompanyAdmin">Company Admin</option>
                
              </select>
            </SoftBox>
                 <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateUserBox' >
              <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Password
              </SoftTypography>
              <input type="password" className='CreateUserInput' onChange={(e) => setPassword(e.target.value)} />
            </SoftBox>
            <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateUserBox' >
              <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Confirm Password
              </SoftTypography>
              <input type="password" className='CreateUserInput' onChange={(e) => setConfirmPassword(e.target.value)} />
            </SoftBox>
            
            <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateUserBox' >
              <SoftButton variant="gradient" color="info" fullWidth onClick={createUser}>
                Create User
              </SoftButton>
            </SoftBox>
            </SoftBox>
      </Card>
      </div>
    </DashboardLayout>
  )
}

export default index
