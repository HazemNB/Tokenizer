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
import SearchCompaniesReq from '../../../Requests/Companies/SearchCompaniesReq';
const CompaniesDetails = () => {
  const { state } = useLocation();
  const [CompanyData, setCompanyData] = useState(null);
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
              {/* <butt onclick(setTest(!test)</butt>
               {onClick={()=>{setToggle(!toggle)}}
                testState ? <>details</> : <>edit</>
               } */}

            </div>
            {
              toggle ? <Edit /> :
                <>
                  <Details company={state.company} />
                </>
            }
          </Card>

          <DetailsBody SearchReq={SearchReq} setSearchReq={setSearchReq} setIsLoaded={setIsLoaded} />
        </DashboardLayout>

      </div>

    </>
  )
}

export default CompaniesDetails
