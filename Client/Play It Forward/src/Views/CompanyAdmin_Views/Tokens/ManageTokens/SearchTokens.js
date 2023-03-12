import React, { useState } from 'react'
import { Card } from '@mui/material'
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import TokenTypeSelector from 'ProjectComponents/Selectors/TokenTypeSelector';
const SearchTokens = ({ SearchReq, setSearchReq }) => {
    const [TemplateId, setTemplateId] = useState();
    const [TokenType, setTokenType] = useState();
    const [IdFrom, setIdFrom] = useState();
    const [IdTo, setIdTo] = useState();
    const [Url, setUrl] = useState()
    const [CreatedAtFrom, setCreatedAtFrom] = useState();
    const [Amount, setAmount] = useState();
    const [LastUpdated, setLastUpdated] = useState();
    const [Claimed, setClaimed] = useState();
    const [Redeemed, setRedeemed] = useState();
    const [IsActive, setIsActive] = useState();
    const searchUsers = async () => {
        let req = Object.assign({}, SearchReq);
        req.TemplateId = TemplateId;
        req.TokenTypeId = TokenType?.id;
        req.IdFrom = IdFrom;
        req.IdTo = IdTo;
        req.Url = Url;
        req.CreatedAtFrom = CreatedAtFrom;
        req.Amount = Amount;
        req.LastUpdated = LastUpdated;
        req.Claimed = Claimed;
        req.Redeemed = Redeemed;
        req.IsActive = IsActive;
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label>Token Type</label>
                    <TokenTypeSelector setTokenType={setTokenType} style={{ marginTop: "0" }} />
                </div>
                <SoftInput placeholder="Id From" type="text" onChange={(e) => setIdFrom(e.target.value)} />
                <SoftInput placeholder="Id To" type="text" onChange={(e) => setIdTo(e.target.value)} />
                <SoftInput placeholder="Url" type="text" onChange={(e) => setUrl(e.target.value)} />
                <SoftInput placeholder="Amount $" type="number" onChange={(e) => setAmount(e.target.value)} />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label>Created From</label>
                    <SoftInput placeholder="Created At From" type="date" onChange={(e) => setCreatedAtFrom(e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label>Last Updated</label>
                    <SoftInput placeholder="Last Updated" type="date" onChange={(e) => setLastUpdated(e.target.value)} />
                </div>
                <div>
                    <input type="checkbox" onChange={(e) => setIsActive(e.target.checked)} />
                    <label>Active</label>
                </div>
                <div>
                    <input type="checkbox" onChange={(e) => setClaimed(e.target.checked)} />
                    <label>Claimed</label>
                </div><div>
                    <input type="checkbox" onChange={(e) => setRedeemed(e.target.checked)} />
                    <label>Redeemed</label>
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
