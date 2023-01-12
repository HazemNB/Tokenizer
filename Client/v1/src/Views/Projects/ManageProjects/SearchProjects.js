import { Card, Icon } from '@mui/material'
import React, { useState } from 'react'
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
const SearchProjects = ({ SearchReq, setSearchReq, CreateProjectDialogEnabled, setCreateProjectDialogEnabled }) => {
    const [Id, setId] = useState();
    const [Name, setName] = useState();
    const [IsDeleted, setIsDeleted] = useState();
   
    const searchProjects = async () => {
        // copy SearchReq to new object
        let req = Object.assign({}, SearchReq);
        req.id = Id;
        req.name = Name;
        req.isDeleted = IsDeleted;
        setSearchReq(req);
    }
    
    return (
        <Card className="searchUsersCard">
            <SoftBox pt={3} px={2} style={{ display: "flex", justifyContent: "space-between" }}>
                <SoftTypography variant="h6" fontWeight="medium">
                    Search Projects
                </SoftTypography>
                {/* Enable Create Project dialog button */}
                {<SoftButton variant="gradient" color="success" sx={{  }} onClick={() => setCreateProjectDialogEnabled(true)}>
                    <Icon>add</Icon> &nbsp; Create Project
                </SoftButton>}

            </SoftBox>

            <SoftBox px={2} py={3} sx={{ display: 'grid', flexDirection: 'column', gridTemplateColumns: { sm: "1fr 1fr 1fr", xs: "1fr" }, gridColumnGap: "2em", gridRowGap: "1em" }} className="SearchUsersInputs">
                <SoftInput placeholder="Project Id" type="number" onChange={(e) => setId(e.target.value)} />
                <SoftInput placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                <div>
                    <input type="checkbox" onChange={(e) => setIsDeleted(e.target.checked)} />
                    <label>Deleted</label>
                </div>
            </SoftBox>
            <div style={{ textAlign: "center" }}>
                <SoftButton variant="contained" color="info" sx={{ width: "80%", marginBottom: "1em" }} onClick={searchProjects}>
                    Search
                </SoftButton>
            </div>
        </Card>

    )
}

export default SearchProjects