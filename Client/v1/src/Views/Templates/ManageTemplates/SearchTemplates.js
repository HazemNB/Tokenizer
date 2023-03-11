import { Card } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import SoftInput from 'components/SoftInput'
import SoftTypography from 'components/SoftTypography'
import React, { useState } from 'react'

const SearchTemplates = ({ SearchReq, setSearchReq }) => {
    const[CompanyId,setCompanyId]=useState();
    const[ProjectId,setProjectId]=useState();
    const[Name , setName] = useState();
    const[Amount,setAmount] = useState();
   const[Description,setDescription] = useState();
   const searchTemplates = ()=>{
    let req = Object.assign({}, SearchReq);
    req.CompanyId = CompanyId;
    req.ProjectId = ProjectId;
    req.Name = Name;
    req.Amount = Amount;
    req.Description = Description;
    setSearchReq(req);
   }
    return (
        <Card className="searchUsersCard">
            <SoftBox pt={3} px={2}>
                <SoftTypography variant="h6" fontWeight="medium">
                    Search Templates
                </SoftTypography>
                <SoftBox px={2} py={3} sx={{ display: 'grid', flexDirection: 'column', gridTemplateColumns: { sm: "1fr 1fr 1fr", xs: "1fr" }, gridColumnGap: "2em", gridRowGap: "1em" }} className="SearchUsersInputs">
                <SoftInput placeholder="Company Id" type="number" onChange={(e) => setCompanyId(e.target.value)} />
                <SoftInput placeholder="Project Id" type="number" onChange={(e) => setProjectId(e.target.value)} />
                <SoftInput placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                <SoftInput placeholder="Amount" type="text" onChange={(e) => setAmount(e.target.value)} />
                <SoftInput placeholder="Description" type="text" onChange={(e) => setDescription(e.target.value)} />
       </SoftBox>
            </SoftBox>
            <div style={{ textAlign: "center" }}>
                <SoftButton variant="contained" color="info" sx={{ width: "80%", marginBottom: "1em" }} onClick={searchTemplates}>
                    Search Templates
                </SoftButton>
            </div>
        </Card>
    )
}

export default SearchTemplates
