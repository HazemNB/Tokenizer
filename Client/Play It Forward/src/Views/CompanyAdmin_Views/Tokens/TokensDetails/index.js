import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./TokensDetails.scss"
import Token from './Token';
const index = () => {
  const { state } = useLocation();
  console.log("state" + state.token)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="tokensDetails" style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <div style={{ zoom: "0.5" }} >
          <Token Token={state.token} />
        </div>
        <ul style={{ listStyle: "none" }}>
          <li><h5>Ammount: {state.token.amount}</h5></li>
          <li><h5>Claimed: {state.token.claimed}</h5></li>
          <li><h5>Redeemed: {state.token.redeemed}</h5></li>

        </ul>
      </div>
      <div className='tokens-btn'>
        {
          state.token.redeemed ? (<button>Reload</button>) : (<button>load</button>)
        }


      </div>
    </DashboardLayout>


  )
}

export default index