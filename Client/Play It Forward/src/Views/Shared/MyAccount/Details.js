import React from 'react'
import Logo from "./1.jpg"
const Details = ({user}) => {
  return (
    <div className='account-datails'>
        <div className='Account-img'>
<img src={Logo}/>
        </div>
        <div className='AccountInfo'>
        <h4>Account Information</h4>
        <ul>
        <li><span className='prop-text'>Email</span> : <span className='val-text'>{user.email}</span></li>
        <li><span className='prop-text'>Id</span> : <span className='val-text'>{user.id}</span></li>
        <li><span className='prop-text'>Name</span> : <span className='val-text'>{user.name}</span></li>
        <li><span className='prop-text'>Phone</span> : <span className='val-text'>{user.phone}</span></li>
        <li><span className='prop-text'>SmsVerified</span> : <span className='val-text'>{user.smsVerified }</span></li>
        <li><span className='prop-text'>UserType</span> : <span className='val-text'>{user.userType }</span></li>

        </ul>
        </div>
    </div>
  )
}

export default Details