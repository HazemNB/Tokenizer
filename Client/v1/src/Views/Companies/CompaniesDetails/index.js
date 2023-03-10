import { Card, Icon } from '@mui/material'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IdReq from '../../../Requests/IdReq';
import CompaniesApi from '../../../API/CompaniesApi';
import "./CompaniesDetails.scss"
import Edit from './EditCompany';
import Details from './Details';
import DetailsBody from './DetailsBody';
import LoaderSmall from 'ProjectComponents/LoaderSmall';
const index = () => {
  const { state } = useLocation();
 
  
  const [CompanyData, setCompanyData] = useState(null);
  console.log("companyData",  state.company)
  const [IsLoaded, setIsLoaded] = useState(false);
  const [toggle, setToggle] = useState(true);

  const GetCompanyDetails = async () => {
    let req = new IdReq(state.company.id);
    let res = await CompaniesApi.GetCompany(req);

    if (res.status.success) {
      setCompanyData(res.data);
    }
    else {
      Swal.fire({
        icon: 'error',
        text: res.status.message,
      });
    }
  }


  useEffect(() => {
    console.log(CompanyData)
    if (CompanyData) {
      setIsLoaded(true);
    }
  }, [CompanyData]);
  useEffect(() => {
    if (!IsLoaded) {
      GetCompanyDetails();
    }
  }, [IsLoaded]);

  if (!IsLoaded && !CompanyData) {
    return <LoaderSmall />;
  }

  return (
    <>
      <div>
        <DashboardLayout>
          <DashboardNavbar />
          <Card className="card-details">
            <div className='card-top'>
              <h4 style={{ color: "#344767" }}>Company Details</h4>
              <button onClick={() => { setToggle(!toggle) }} title="Go To Details" className='card-btn'>  <Icon> {
                "edit"
              } </Icon></button>

              {/* <butt onclick(setTest(!test)</butt>
                 {onClick={()=>{setToggle(!toggle)}}
                  testState ? <>details</> : <>edit</>
                 } */}

            </div>
            {
              toggle ? <><Details Company = {CompanyData.Company} /> </> : <><Edit setIsLoaded={setIsLoaded} company={CompanyData.Company} /></>
            }


          </Card>
          {IsLoaded ? <DetailsBody setIsLoaded={setIsLoaded} CompanyData= {CompanyData} /> : <LoaderSmall />}
        </DashboardLayout>
      </div>

    </>
  )
}
export default index;

