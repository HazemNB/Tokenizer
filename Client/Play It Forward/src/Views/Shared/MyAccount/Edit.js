import { Card } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import "./MyAccount.scss"
const Edit = () => {
  const [Name, setName] = useState();
  const [Phone, setPhone] = useState();
  const [Email, setEmail] = useState();
  const [Description, setDescription] = useState()
  const [Country, setCountry] = useState();
  const [City, setCity] = useState();
  const [Address, setAddress] = useState();
  const [Zip, setZip] = useState();
  const [Website, setWebsite] = useState();
  const [CompanyTypeId, setCompanyTypeId] = useState()
  const [UserLimit, setUserLimit] = useState();
  const [TokenLimit, setTokenLimit] = useState();
  const [TemplateLimit, setTemplateLimit] = useState();
  const AccountDetails = async()=>{
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
              <input type="text" className='CreateUserInput'   onChange={(e)=>setName(e.target.value)} />
    
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
              <input type="text" className='CreateUserInput'   onChange={(e)=>setPhone(e.target.value)}  />
    
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
              <input type="text" className='CreateUserInput'    onChange={(e) => setEmail(e.target.value)}  />
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
            <textarea rows={7}    onChange={(e) => setDescription(e.target.value)}/>
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
            <input type="text" className='CreateUserInput'    onChange={(e) => setCountry(e.target.value)} />
    
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
            <input type="text" className='CreateUserInput'    onChange={(e) => setCity(e.target.value)}  />
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
            <input type="text" className='CreateUserInput'    onChange={(e) => setAddress(e.target.value)} />
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
            <input type="text" className='CreateUserInput'    onChange={(e) => setZip(e.target.value)}  />
    
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
            <input type="text" className='CreateUserInput'    onChange={(e) => setWebsite(e.target.value)} />
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
            <input type="text" className='CreateUserInput'    onChange={(e) => setCompanyTypeId(e.target.value)} />
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
              User Limit
            </SoftTypography>
            <input type="number" className='CreateUserInput'   onChange={(e) => setUserLimit(e.target.value)} />
    
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
            <input type="number" className='CreateUserInput'    onChange={(e) => setTokenLimit(e.target.value)} />
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
            <input type="number" className='CreateUserInput'    onChange={(e) => setTemplateLimit(e.target.value)}/>
          </SoftBox>
    
        </SoftBox>
        <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateCompanyBox' >
          <SoftButton variant="gradient" color="info" fullWidth onClick={AccountDetails}>
              Update Details
          </SoftButton>
        </SoftBox>
  </SoftBox>
</Card>
      </div>
  )
}

export default Edit
