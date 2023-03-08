import { Card } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftButton from 'components/SoftButton'
import SoftInput from 'components/SoftInput'
import SoftTypography from 'components/SoftTypography'
import TokenTypeSelector from 'ProjectComponents/TokenTypeSelector'
import React, { useState } from 'react';
import "./ManageTokens.scss"

const SearchTokens = ({SearchReq , setSearchReq}) => {
    const [TemplateId , setTemplateId] = useState();
    const [TokenType,setTokenType ]=useState();
    const[IdFrom,setIdFrom] = useState();
    const [IdTo  , setIdTo] = useState();
    const[Url , setUrl] = useState();
    const [CreatedAtFrom,setCreatedAtFrom] = useState();
    const[Amount , setAmount] = useState();
    const[LastUpdated,setLastUpdated] = useState();
    const [Claimed,setClaimed] = useState();
    const [Redeemed,setRedeemed] = useState();
    const[IsActive,setIsActive]=useState();
    const [CompanyId,setCompanyId] = useState()

    const searchUsers = async()=>{
        let req = Object.assign({}, SearchReq);
        req.TemplateId=TemplateId;
        req.TokenTypeId=TokenType;
        req.IdFrom=IdFrom;
        req.IdTo=IdTo;
        req.Url=Url;
        req.CreatedAtFrom=CreatedAtFrom;
        req.Amount=Amount;
        req.LastUpdated=LastUpdated;
        req.Claimed=Claimed;
        req.Redeemed=Redeemed;
        req.IsActive=IsActive;
        req.CompanyId = CompanyId;
        setSearchReq(req);
    }
    return (
        <Card className="searchUsersCard">
            <SoftBox pt={3} px={2}>
                <SoftTypography variant="h6" fontWeight="medium">
                    Search Tokens
                </SoftTypography>
            </SoftBox>
            <SoftBox px={2} py={3} sx={{ display: 'grid', flexDirection: 'column', gridTemplateColumns: { sm: "1fr 1fr 1fr", xs: "1fr" }, gridColumnGap: "2em", gridRowGap: "1em" }} className="SearchUsersInputs">
            <SoftInput placeholder="Template Id" type="number" onChange={(e) => setTemplateId(e.target.value)} />
            <SoftInput placeholder="Company Id" type="number" onChange={(e) => setCompanyId(e.target.value)} />
            <TokenTypeSelector setTokenType={setTokenType}/>
            <SoftInput placeholder="Id From" type="text" onChange={(e) => setIdFrom(e.target.value)} />
            <SoftInput placeholder="Id To" type="text" onChange={(e) => setIdTo(e.target.value)} />
            <SoftInput placeholder="Url" type="text" onChange={(e) => setUrl(e.target.value)} />
            <SoftInput placeholder="Created At From" type="text" onChange={(e) => setCreatedAtFrom(e.target.value)} />
            <SoftInput placeholder="Amount" type="text" onChange={(e) => setAmount(e.target.value)} />
            <SoftInput placeholder="LastUpdated" type="text" onChange={(e) => setLastUpdated(e.target.value)} />
            <SoftInput placeholder="Claimed" type="text" onChange={(e) => setClaimed(e.target.value)} />
            <SoftInput placeholder="Redeemed" type="text" onChange={(e) => setRedeemed(e.target.value)} />
            <div>
                    <input type="checkbox" onChange={(e) => setIsActive(e.target.checked)} />
                    <label>Active</label>
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

export default SearchTokens
