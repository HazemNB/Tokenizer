import React from 'react'
import { useLocation } from 'react-router-dom';

const Edit = () => {
    const { state } = useLocation();
    console.log(state)
  return (
    <div className='company-datails'>
    <ul>
    <li>  <span>{state.company.name}</span></li> 
    <li>  <span>{state.company.email}</span></li>
    <li>Logo:  <img src={"data:image/png;base64, " + state.company.logo}></img></li>
    <li>  <span>{state.company.description}</span></li>
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
  )
}

export default Edit
