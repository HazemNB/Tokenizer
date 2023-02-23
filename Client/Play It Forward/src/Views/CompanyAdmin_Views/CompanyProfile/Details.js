import React from 'react'
import Logo from "./1.jpg"

const Details = ({Company}) => {
  console.log("Compa" + Company)
  return (
 
 <>
    <div className='company-datails'>
        <ul>
      
       <img className='company-datails-img' src={Logo}></img>
            
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
