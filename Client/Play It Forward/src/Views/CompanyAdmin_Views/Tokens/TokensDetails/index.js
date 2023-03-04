import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./TokensDetails.scss"
import Token from './Token';
const index = () => {
  const { state } = useLocation();
  let token = state.token;
  console.log("state", state.token)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="tokenDetails">
        <div className='tokenDetails_Token'>
          <Token Token={state.token} />
        </div>
        <div className='tokenDetails_Stats'>
          <div>
            <h5>{token.template.name} #{token.id}</h5>
            <h5 style={{color:"green"}}>${token.amount}</h5>
            {/* token.active ? */}
            <h5>
              {token.isActive ? ( <span style={{ color: "green" }}>ACTIVE</span>) : (<span style={{ color: "red" }}>INACTIVE</span>)}
            </h5>
            <h5>Played Forward {token.playedForwardCount == null ? "0" : token.playedForwardCount} Times</h5>
          </div>
          <div style={{ display: "flex", flexDirection:"column", marginLeft:"auto" }}>
            {token.claimed ? <span style={{ color: "green" }}>CLAIMED</span> : <span style={{ color: "grey" }}>UNCLAIMED</span>}
            {token.redeemed ? <span style={{ color: "green" }}>REDEEMED</span> : <span style={{ color: "grey" }}>UNREDEEMED</span>}
          </div>

          <div>
            <h5>Current Owner: </h5>
            {
              token.currentOwner ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{token.currentOwner.name}</span>
                  <span>{token.currentOwner.email}</span>
                </div>
              ) : (
                <span>None</span>
              )
            }
            <h5>Total Owners: {token.owners?.length == null ? "0" : token.owners?.length}</h5>
          </div>

          <div>
            <h5>Created At: {new Date(token.createdAt).toLocaleDateString()}</h5>
            <h5>Last Updated: {new Date(token.lastUpdated).toLocaleDateString()}</h5>
          </div>

        </div>
      </div>
      <div className='tokens-btn'>
        

      </div>
    </DashboardLayout>


  )
}

export default index