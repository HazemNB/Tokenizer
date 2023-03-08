import { Card } from '@mui/material'
import React from 'react'
import "./TokensStats.scss"
const TokensStats = ({stats}) => {
  return (
    <div>

<Card id="CreateUserCard" style={{ padding: "10px 40px",margin:"10px 0 " }}>
 <div className='card-details'>
    <ul>
        <li><h4>Active: <span>{stats.Active}</span></h4></li>
        <li><h4>Claimed: <span>{stats.Claimed}</span></h4></li>
        <li><h4>Count: <span>{stats.Count}</span></h4></li>
    </ul>
    <ul>
        <li><h4>Redeemed: <span>{stats.Redeemed}</span></h4></li>
        <li><h4>TotalAmount: <span>{stats.TotalAmount}</span></h4></li>
        <li><h4>PlayedForward: <span>{stats.PlayedForward}</span></h4></li>
     </ul>
    <ul>
        <li><h4>IsPlayedForward: <span>{stats.IsPlayedForward}</span></h4></li>
        <li><h4>PlayedForwardCountSum: <span>{stats.PlayedForwardCountSum}</span></h4></li>
    </ul>
</div>
    </Card>
    </div>
  )
}

export default TokensStats
