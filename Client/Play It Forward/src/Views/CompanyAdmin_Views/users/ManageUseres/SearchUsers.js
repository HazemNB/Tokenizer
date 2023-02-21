import { Card } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import React, { useState } from 'react'

const SearchUsers = ({SearchReq , setSearchReq}) => {
    const [Id, setId] = useState();
    const [Name, setName] = useState();
    const [Email, setEmail] = useState();
    const [Phone, setPhone] = useState();
    const [UserType, setUserType] = useState();
    const [IsActive, setIsActive] = useState();
    const [IsDeleted, setIsDeleted] = useState();
    const searchUsers = async () => {
        // copy SearchReq to new object
        let req = Object.assign({}, SearchReq);
        req.id = Id;
        req.name = Name;
        req.email = Email;
        req.phone = Phone;
        req.userType = UserType;
        req.isActive = IsActive;
        req.isDeleted = IsDeleted;
        setSearchReq(req);
    }
  return (
    <Card className="searchUsersCard">
       <SoftBox pt={3} px={2}>
                <SoftTypography variant="h6" fontWeight="medium">
                    Search Users
                </SoftTypography>
            </SoftBox>
            <SoftBox px={2} py={3} sx={{ display: 'grid', flexDirection: 'column', gridTemplateColumns: { sm: "1fr 1fr 1fr", xs: "1fr" }, gridColumnGap: "2em", gridRowGap: "1em" }} className="SearchUsersInputs">
            <SoftInput placeholder="User Id" type="number" onChange={(e) => setId(e.target.value)} />
                <SoftInput placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                <SoftInput placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
                <SoftInput placeholder="Phone" type="text" onChange={(e) => setPhone(e.target.value)} />
                <SoftInput placeholder="User Type" type="text" onChange={(e) => setUserType(e.target.value)} />
                <div>
                    <input type="checkbox" onChange={(e) => setIsActive(e.target.checked)} />
                    <label>Active</label>
                </div>
                <div>
                    <input type="checkbox" onChange={(e) => setIsDeleted(e.target.checked)} />
                    <label>Deleted</label>
                </div>
                </SoftBox>
                <div style={{ textAlign: "center" }}>
                <SoftButton variant="contained" color="info" sx={{ width: "80%", marginBottom: "1em" }} onClick={searchUsers}>
                    Search
                </SoftButton>
            </div>
        </Card>
  )
}

export default SearchUsers