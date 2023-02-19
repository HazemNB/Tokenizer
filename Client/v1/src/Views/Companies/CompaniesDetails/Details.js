import { Card } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import SoftButton from 'components/SoftButton';
import React, { useState } from 'react'
import EditCompaniesReq from 'Requests/Companies/EditCompaniesReq';
import CompaniesApi from 'API/CompaniesApi';

const Details = ({company}) => {
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Description, setDescription] = useState()
  const [Country, setCountry] = useState();
  const [City, setCity] = useState();
  const [Address, setAddress] = useState();
  const [Zip, setZip] = useState();
  const [Website, setWebsite] = useState();
  const [CompanyTypeId, setCompanyTypeId] = useState();
  const [UserLimit, setUserLimit] = useState();
  const [TokenLimit, setTokenLimit] = useState();
  const [TemplateLimit, setTemplateLimit] = useState();
const companyDetails = async()=>{
  Swal.fire({
    icon: 'info',
    title: 'Company Details',
    text: 'Please wait...',
    // allowOutsideClick: false,
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
    //check if Name empty
    if (!Name) {
      Swal.fire({
        icon: 'error',
        title: 'Name is required',
        text: 'Please enter Name',
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
     //check if Phone empty
     if (!Phone) {
      Swal.fire({
        icon: 'error',
        title: 'Phone is required',
        text: 'Please enter Phone',
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
      //country if Phone empty
    if (!Country) {
      Swal.fire({
        icon: 'error',
        title: 'Country is required',
        text: 'Please enter Country',
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
    //check if UserLimit empty
    if (!UserLimit) {
      Swal.fire({
        icon: 'error',
        title: 'UserLimit is required',
        text: 'Please enter UserLimit',
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
     //check if City empty
     if (!City) {
      Swal.fire({
        icon: 'error',
        title: 'City is required',
        text: 'Please enter City',
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
      //check if Zip empty
      if (!Zip) {
        Swal.fire({
          icon: 'error',
          title: 'Zip is required',
          text: 'Please enter Zip',
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
       //check if Address empty
    if (!Address) {
      Swal.fire({
        icon: 'error',
        title: 'Address is required',
        text: 'Please enter Address',
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
      //check if CompantTypeId empty
      if (!CompanyTypeId) {
        Swal.fire({
          icon: 'error',
          title: 'CompanyTypeId is required',
          text: 'Please enter CompanyTypeId',
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
    let req = new EditCompaniesReq();
    req.Id = 1;
    req.Name = Name;
    req.Email = Email;
    req.Description = Description;
    req.Phone = Phone;
    req.Country = Country;
    req.City = City;
    req.Address = Address;
    req.Zip = Zip;
    req.Website = Website;
    req.CompanyTypeId = CompanyTypeId;
    req.UserLimit = UserLimit;
    req.TokenLimit = TokenLimit;
    req.TemplateLimit = TemplateLimit;
    let res = await CompaniesApi.EditCompany(req);
    if (res.status.success) {
      Swal.fire({
        icon: 'success',
        title: res.status.message,
        text: '',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: true,
        didOpen: () => {
          Swal.hideLoading()
        }
      });
    }
    else {
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
  
        <div className='CreateUsersDiv'>
        <Card id="CreateUserCard" style={{ padding: "10px 20px" }}>
     
          <SoftBox>
            <SoftBox py={2} style={{ borderBottom: "1px solid #ccc" }} px={2} display="flex" flexDirection={{ xs: "column", lg: "row" }}>


              <div className='name-phone'>
                <SoftBox
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ xs: "flex-start" }}
                  flexDirection={{ xs: "column" }}
                  mb={2}
                  className='CreateCompanyBox'
                >

                  <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                    Name
                  </SoftTypography>
                  <input type="text" className='CreateUserInput' onChange={(e)=>setName(e.target.value)} />

                </SoftBox>
                <SoftBox
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ xs: "flex-start" }}
                  flexDirection={{ xs: "column" }}
                  mb={2}
                  className='CreateCompanyBox'
                >

                  <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                    Phone
                  </SoftTypography>
                  <input type="text" className='CreateUserInput' defaultValue={company.phone}  onChange={(e)=>setPhone(e.target.value)}  />

                </SoftBox>
              </div>




              <div className='email-logo'>
                <SoftBox
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ xs: "flex-start" }}
                  flexDirection={{ xs: "column" }}
                  mb={2}
                  className='CreateCompanyBox'
                >
                  <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                    Email
                  </SoftTypography>
                  <input type="text" className='CreateUserInput'   onChange={(e) => setEmail(e.target.value)}  />
                </SoftBox>
                <SoftBox
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ xs: "flex-start" }}
                  flexDirection={{ xs: "column" }}
                  mb={2}
                  className='CreateCompanyBox'
                >
                  <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                    Logo
                  </SoftTypography>
                  <input id="LogoInput" type="file" className='CreateUserInput' />
                </SoftBox>
              </div>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Description
                </SoftTypography>
                <textarea rows={7}  onChange={(e) => setDescription(e.target.value)}/>
              </SoftBox>
            </SoftBox>
            <SoftBox py={2} style={{ borderBottom: "1px solid #ccc" }} px={2} display="flex" flexDirection={{ xs: "column", lg: "row" }}>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >

                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Country
                </SoftTypography>
                <input type="text" className='CreateUserInput'  onChange={(e) => setCountry(e.target.value)} />

              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  City
                </SoftTypography>
                <input type="text" className='CreateUserInput' onChange={(e) => setCity(e.target.value)}  />
              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Address
                </SoftTypography>
                <input type="text" className='CreateUserInput'  onChange={(e) => setAddress(e.target.value)} />
              </SoftBox>
            </SoftBox>
            <SoftBox py={2} style={{ borderBottom: "1px solid #ccc" }} px={2} display="flex" flexDirection={{ xs: "column", lg: "row" }}>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >

                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Zip
                </SoftTypography>
                <input type="text" className='CreateUserInput' onChange={(e) => setZip(e.target.value)}  />

              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Website
                </SoftTypography>
                <input type="text" className='CreateUserInput'  onChange={(e) => setWebsite(e.target.value)} />
              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Company Type
                </SoftTypography>
                <input type="text" className='CreateUserInput' onChange={(e) => setCompanyTypeId(e.target.value)} />
              </SoftBox>
            </SoftBox>
            <SoftBox py={2} style={{ borderBottom: "1px solid #ccc" }} px={2} display="flex" flexDirection={{ xs: "column", lg: "row" }}>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >

                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Use Limit
                </SoftTypography>
                <input type="number" className='CreateUserInput' onChange={(e) => setUserLimit(e.target.value)} />

              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Token Limit
                </SoftTypography>
                <input type="number" className='CreateUserInput'  onChange={(e) => setTokenLimit(e.target.value)} />
              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Template Limit
                </SoftTypography>
                <input type="number" className='CreateUserInput'  onChange={(e) => setTemplateLimit(e.target.value)}/>
              </SoftBox>

            </SoftBox>
            <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateCompanyBox' >
              <SoftButton variant="gradient" color="info" fullWidth onClick={companyDetails}>
                  Company Details
              </SoftButton>
            </SoftBox>
          </SoftBox>
            </Card>
        </div>
   
  )
}

export default Details
