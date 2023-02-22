import React, { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from 'App';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Card, Icon  } from '@mui/material';
import "./MyAccount.scss";
import Details from './Details';
import Edit from './Edit';
const index = () => {
  const user  = useContext(UserContext);
  const [toggle, setToggle] = useState(true);

  
  return (
    <div>
     <DashboardLayout>
     <DashboardNavbar />
     <Card className="card-details">
            <div className='card-top'>
              <h4 style={{ color: "#344767" }}>Account Details</h4>
              <button onClick={() => { setToggle(!toggle) }} title="Go To Details" className='card-btn'>  <Icon> {
                "edit"
              } </Icon></button>
 

            </div>
            {
              toggle ? <><Details user={user}/> </> : <><Edit  /></>
            }


          </Card>
        </DashboardLayout>
    </div>
  )
}

export default index
