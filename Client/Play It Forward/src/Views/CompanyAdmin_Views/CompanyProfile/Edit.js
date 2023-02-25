import { Card } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';
import React, { useState } from 'react'
import EditCompaniesReq from '../../../Requests/Companies/EditCompaniesReq';
import Swal from 'sweetalert2';
import "./CompanyProfileDetails.scss"
import CompaniesApi from '../../../API/CompaniesApi';
import CompanyTypeSelector from '../../../ProjectComponents/Selectors/CompanyTypeSelector';
const Edit = ({Company, setIsLoaded}) => {
  console.log("Company is " , Company);
  const [Name, setName] = useState(Company.name);
  const [Phone, setPhone] = useState(Company.phone);
  const [Email, setEmail] = useState(Company.email);
  const [Description, setDescription] = useState(Company.description)
  const [Country, setCountry] = useState(Company.email);
  const [City, setCity] = useState(Company.city);
  const [Address, setAddress] = useState(Company.address);
  const [Zip, setZip] = useState(Company.zip);
  const [Website, setWebsite] = useState(Company.website);
  const [CompanyTypeId, setCompanyTypeId] = useState(Company.companyTypeId)
  const [UserLimit, setUserLimit] = useState(Company.userLimit);
  const [TokenLimit, setTokenLimit] = useState(Company.tokenLimit);
  const [TemplateLimit, setTemplateLimit] = useState(Company.templateLimit);
  const [CompanyType, setCompanyType] = useState();
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
    let req = new EditCompaniesReq();
    req.id = Company.id;
    req.name = Name;
    req.email = Email;
    req.phone = Phone;
    req.country = Country;
    req.city = City;
    req.address = Address;
    req.zip = Zip;
    req.website = Website;
    req.userLimit = Company.userLimit;
    req.companyTypeId= Company.companyTypeId
    req.tokenLimit = Company.tokenLimit;
    req.templateLimit = Company.templateLimit;
    let res = await CompaniesApi.EditCompany(req);
   
   console.log(res)
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
      setIsLoaded(false);
      } {
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
              <input type="text" className='CreateUserInput'  defaultValue={Name}  onChange={(e)=>setName(e.target.value)} />
    
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
              <input type="text" className='CreateUserInput' defaultValue={Phone}   onChange={(e)=>setPhone(e.target.value)}  />
    
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
              <input type="text" className='CreateUserInput'  defaultValue={Email}  onChange={(e) => setEmail(e.target.value)}  />
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
            <textarea rows={7}  defaultValue={Description}  onChange={(e) => setDescription(e.target.value)}/>
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
            <input type="text" className='CreateUserInput'  defaultValue={Country}  onChange={(e) => setCountry(e.target.value)} />
    
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
            <input type="text" className='CreateUserInput'  defaultValue={City}  onChange={(e) => setCity(e.target.value)}  />
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
            <input type="text" className='CreateUserInput' defaultValue={Address}    onChange={(e) => setAddress(e.target.value)} />
          </SoftBox>
        </SoftBox>
        {/* .... */}
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
            <input type="text" className='CreateUserInput' defaultValue={Zip}   onChange={(e) => setZip(e.target.value)}  />
    
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
            <input type="text" className='CreateUserInput'  defaultValue={Website}   onChange={(e) => setWebsite(e.target.value)} />
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
              Company Type Selector
            </SoftTypography>
            <CompanyTypeSelector setCompanyType={setCompanyType} />
                      </SoftBox>
        </SoftBox>
        {/* ...... */}
       
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

export default Edit
