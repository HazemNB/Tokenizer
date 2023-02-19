
import { Card } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import SoftButton from 'components/SoftButton';
import React, { useState } from 'react'
import EditCompaniesReq from '../../../Requests/Companies/EditCompaniesReq';
import CompaniesApi from '../../../API/CompaniesApi';
import Swal from 'sweetalert2';
import IdReq from '../../../Requests/IdReq';
import { useLocation } from 'react-router-dom';
 


const Details = ({company}) => {
  const { state } = useLocation();
 
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
      title: 'Updating Details',
      text: 'Please wait...',
      // allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    let req = new IdReq(state.company.id);
     req.name = Name;
    req.email = Email;
    req.description = Description;
    req.phone = Phone;
    req.country = Country;
    req.city = City;
    req.address = Address;
    req.zip = Zip;
    req.website = Website;
    req.companyTypeId = CompanyTypeId;
    req.userLimit = UserLimit;
    req.tokenLimit = TokenLimit;
    req.templateLimit = TemplateLimit;
    let res = await CompaniesApi.GetCompany(req);

 
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
      }else {
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
        });}
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
              <input type="text" className='CreateUserInput'  defaultValue={company.name} onChange={(e)=>setName(e.target.value)} />
    
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
              <input type="text" className='CreateUserInput' defaultValue={company.email}  onChange={(e) => setEmail(e.target.value)}  />
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
            <textarea rows={7} defaultValue={company.description}  onChange={(e) => setDescription(e.target.value)}/>
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
            <input type="text" className='CreateUserInput' defaultValue={company.country}  onChange={(e) => setCountry(e.target.value)} />
    
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
            <input type="text" className='CreateUserInput' defaultValue={company.city}  onChange={(e) => setCity(e.target.value)}  />
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
            <input type="text" className='CreateUserInput' defaultValue={company.address}   onChange={(e) => setAddress(e.target.value)} />
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
            <input type="text" className='CreateUserInput' defaultValue={company.zip}  onChange={(e) => setZip(e.target.value)}  />
    
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
            <input type="text" className='CreateUserInput' defaultValue={company.website}   onChange={(e) => setWebsite(e.target.value)} />
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
              Company TypeId
            </SoftTypography>
            <input type="text" className='CreateUserInput' defaultValue={company.companyTypeId}  onChange={(e) => setCompanyTypeId(e.target.value)} />
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
            <input type="number" className='CreateUserInput' defaultValue={company.useLimit}  onChange={(e) => setUserLimit(e.target.value)} />
    
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
            <input type="number" className='CreateUserInput' defaultValue={company.tokenLimit}  onChange={(e) => setTokenLimit(e.target.value)} />
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
            <input type="number" className='CreateUserInput' defaultValue={company.templateLimit}  onChange={(e) => setTemplateLimit(e.target.value)}/>
          </SoftBox>
    
        </SoftBox>
        <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateCompanyBox' >
          <SoftButton variant="gradient" color="info" fullWidth onClick={companyDetails}>
              Update Details
          </SoftButton>
        </SoftBox>
      </SoftBox>
        </Card>
    </div>
    
    
  )
}

export default Details

