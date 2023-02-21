import React from 'react'
import { useLocation } from 'react-router-dom';

const Details = ({Company}) => {

  return (
    <>

      <div className='company-datails'>
        <ul>
          {Company.logo &&
            <li><img className='company-datails-img' src={"data:image/png;base64, " + Company.logo}></img></li>
          }    
          <li>  <span>{Company.name}</span></li>
          <li>  <span>{Company.email}</span></li>
          <li>  <span>{Company.description}</span></li>
        </ul>
        <ul>
        <li>Phone: <span>{Company.phone}</span></li>
          <li> City : <span>{Company.city}</span></li>
          <li>Zip:  <span>{Company.zip}</span></li>
          <li>Country: <span>{Company.country}</span></li>
          <li>Website:  <span>{Company.website}</span></li>

        </ul>
        <ul>
        <li>Address:  <span>{Company.address}</span></li>

          <li>User Limit:  <span>{Company.userLimit}</span></li>
          <li>TemplateLimit:  <span>{Company.templateLimit}</span></li>
          <li>Token Limit:  <span>{Company.tokenLimit}</span></li>
        </ul>
      </div>
    </>
  )
}

export default Details
