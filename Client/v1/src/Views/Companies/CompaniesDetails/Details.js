import React from 'react'
import { useLocation } from 'react-router-dom';

const Details = () => {
  const { state } = useLocation();

  return (
    <>

      <div className='company-datails'>
        <ul>
          {state.company.logo &&
            <li><img className='company-datails-img' src={"data:image/png;base64, " + state.company.logo}></img></li>
          }    
          <li>  <span>{state.company.name}</span></li>
          <li>  <span>{state.company.email}</span></li>
          <li>  <span>{state.company.description}</span></li>
        </ul>
        <ul>
          <li> City : <span>{state.company.city}</span></li>
          <li>Zip :  <span>{state.company.zip}</span></li>
          <li>Countr: <span>{state.company.country}</span></li>
        </ul>
        <ul>
          <li> <span>{state.company.phone}</span></li>
          <li>Address:  <span>{state.company.address}</span></li>
          <li>Website:  <span>{state.company.website}</span></li>
          <li>Uer Limit:  <span>{state.company.userLimit}</span></li>

        </ul>
      </div>
    </>
  )
}

export default Details
