import { Card, Icon } from '@mui/material'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react';
import "./CompaniesDetails.scss"
import { useLocation } from 'react-router-dom';
import IdReq from 'Requests/IdReq';
import CompaniesApi from '../../../API/CompaniesApi';
import CompanyInnerPageDetails from './CompanyInnerDetails/CompanyInnerPageDetails';
const index = () => {
  const { state } = useLocation();
  const [Company, setCompany] = useState(null);
  const [IsLoaded, setIsLoaded] = useState(false);
  const GetCompanyDetails = async () => {
    let req = new IdReq(state.company.id);
    let res = await CompaniesApi.GetCompany(req);

    if (res.status.success) {
        setCompany(res.data);
    }
    else {
        Swal.fire({
            icon: 'error',
            text: res.status.message,
        });
    }
}
useEffect(() => {
  if (Company) {
      setIsLoaded(true);
  }
}, [Company]);
useEffect(() => {
  if (!IsLoaded) {
      GetCompanyDetails();
  }
}, [IsLoaded]);

  return (
  
 <>
     <DashboardLayout>
     <DashboardNavbar />
    <Card className="card-details">
<div className='card-top'>
<h4 style={{color:"#344767"}}>Company Details</h4>
<button title="Go To Details" className='card-btn'><Icon> { "edit"} </Icon></button>
</div>
<div className='company-datails'>
  <ul>
  <li>Name: <span>{state.company.name}</span></li> 
  <li>Email: <span>{state.company.email}</span></li>
  <li>Logo: <span>Logo</span></li>
  <li>Description: <span>{state.company.description}</span></li>
  </ul>
  <ul>
  <li>City: <span>{state.company.city}</span></li> 
  <li>Zip: <span>{state.company.zip}</span></li>
  <li>Country: <span>{state.company.country}</span></li>
  </ul>
  <ul>
  <li>Address: <span>{state.company.address}</span></li> 
  <li>Phone: <span>{state.company.phone}</span></li>
  <li>Website: <span>{state.company.website}</span></li>
  </ul>
</div>
    </Card>
 

     </DashboardLayout>
      <CompanyInnerPageDetails/>
 </>
  )
}

export default index
