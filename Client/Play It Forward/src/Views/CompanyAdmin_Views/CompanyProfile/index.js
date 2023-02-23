import { Card ,Icon} from '@mui/material'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import LoaderSmall from 'ProjectComponents/LoaderSmall'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useContext } from 'react';
import { UserContext } from 'App';
import Details from './Details';
import Edit from "./Edit"

const index = () => {
    const user  = useContext(UserContext);

    const [CompanyData, setCompanyData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);
    const [toggle, setToggle] = useState(true);
  
    
  return (
    <DashboardLayout>
         <DashboardNavbar/>
         <Card className="card-details">
         <div className='card-top'>
         <h4 style={{ color: "#344767" }}>Profile Details</h4>
              <button onClick={() => { setToggle(!toggle) }} title="Go To Details" className='card-btn'>  <Icon> {
                "edit"
              } </Icon></button>
            </div>
            {
              toggle ? <><Details Company = {user.company} /> </> : <><Edit  /></>
            }

            </Card>
        </DashboardLayout>
  )
}

export default index
