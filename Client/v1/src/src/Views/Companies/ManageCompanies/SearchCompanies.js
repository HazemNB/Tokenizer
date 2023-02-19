import { Card } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import SoftInput from 'components/SoftInput'
import SoftTypography from 'components/SoftTypography'
import React, { useState } from 'react'

const SearchCompanies = ({ SearchReq, setSearchReq }) => {
    const [Id, setId] = useState();
    const[Email,setEmail]=useState();
    const [Name, setName] = useState();
    const [Description, setDescription] = useState();
    const [City, setCity] = useState();
     const [Zip, setZip] = useState();
     const [Country, setCountry] = useState();
     const [Phone, setPhone] = useState();
    const [Website, setWebsite] = useState();
    const [IsActive, setIsActive] = useState();
    const [IsDeleted, setIsDeleted] = useState();
    const searchCompanies = async () => {
        let req = Object.assign({}, SearchReq);
        req.id = Id;
        req.name = Name;
        req.email = Email;
        req.description = Description;
        req.city = City;
        req.zip = Zip;
        req.country = Country;
        req.phone = Phone;
        req.website = Website;
        // req.isActive = IsActive;
        // req.isDeleted = IsDeleted;
        setSearchReq(req);
    }


  return (
    <Card className="searchUsersCard">
         <SoftBox pt={3} px={2}>
                <SoftTypography variant="h6" fontWeight="medium">
                    Search Companies
                </SoftTypography>
            </SoftBox>
            <SoftBox px={2} py={3} sx={{ display: 'grid', flexDirection: 'column', gridTemplateColumns: { sm: "1fr 1fr 1fr", xs: "1fr" }, gridColumnGap: "2em", gridRowGap: "1em" }} className="SearchUsersInputs">
            <SoftInput placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                <SoftInput placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
                <SoftInput placeholder="Description" type="text" onChange={(e) => setDescription(e.target.value)} />
                <SoftInput placeholder="City" type="text" onChange={(e) => setCity(e.target.value)} />
                <SoftInput placeholder="Zip" type="text" onChange={(e) => setZip(e.target.value)} />
                <SoftInput placeholder="Country" type="text" onChange={(e) => setCountry(e.target.value)} />
                <SoftInput placeholder="Phone" type="text" onChange={(e) => setPhone(e.target.value)} />
                 <SoftInput placeholder="Website" type="text" onChange={(e) => setWebsite(e.target.value)} />
                <div>
                    <input type="checkbox" onChange={(e) => setIsActive(e.target.checked)} />
                    <label>Active?</label>
                </div>
                <div>
                    <input type="checkbox" onChange={(e) => setIsDeleted(e.target.checked)} />
                    <label>Deleted</label>
                </div>
            </SoftBox>
            <div style={{ textAlign: "center" }}>
                <SoftButton variant="contained" color="info" sx={{ width: "80%", marginBottom: "1em" }} onClick={searchCompanies}>
                    Search
                </SoftButton>
            </div>
    </Card>
  )
}

export default SearchCompanies
