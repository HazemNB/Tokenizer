import { Icon, Pagination } from '@mui/material'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import LoaderSmall from 'ProjectComponents/LoaderSmall'
import React, { useEffect, useState } from 'react'
import SearchTokensReq from '../../../Requests/Tokens/SearchTokensReq'
import SearchTokens from './SearchTokens'
import TokensStats from './TokensStats';
import Table from "examples/Tables/Table";
 import { useContext } from 'react';
import { UserContext } from 'App';
import TokensApi from '../../../API/TokensApi'
import { useNavigate } from 'react-router-dom'
import SoftTypography from 'components/SoftTypography'
import SoftButton from 'components/SoftButton'
import Token from 'Views/Projects/ProjectDetails/Token'


const index = () => {
    const User = useContext(UserContext);
    const navigate = useNavigate();
    const [SearchReq , setSearchReq] = useState(new SearchTokensReq());
    const [ResponseData, setResponseData] = useState(null);
  const [IsLoaded, setIsLoaded] = useState(false);
  const [TotalPages, setTotalPages] = useState(0);
  const [Page, setPage] = useState(1);
  const [TableDataRows, setTableDataRows] = useState([]);
  const searchTokens = async()=>{
    console.log("searchTokens", SearchReq)
let res =await TokensApi.SearchCompanyTokens(SearchReq);
console.log("res" , res)
if (res.status.success) {
    setResponseData(res.data);
    setTotalPages(res.data.Tokens.totalPages);

}
else {
    Swal.fire({
        icon: 'error',
        text: res.status.message,
    });
}
  }
  let columns = [
    { name: "Token", align: "center" },
    // { name: "ID", align: "center" },
    { name: "Amount", align: "left" },
    //token type and number
    { name: "Claimed", align: "left" },
    { name: "Redeemed", align: "left" },
    { name: "Name", align: "left" },
    { name: "Details", align: "center" },
];
useEffect(() => {
    searchTokens();
}, [Page, SearchReq]);
useEffect(() => {
    if (!IsLoaded) {
        searchTokens();
    }
    else {
        RefreshTable();
    }
}, [IsLoaded]);
useEffect(() => {
    if (ResponseData) {
        setIsLoaded(true);
        RefreshTable();
    }
}, [ResponseData]);
const RefreshTable = () => {
    let rows = [];
    ResponseData.Tokens.list?.forEach((token) => {
        rows.push(
            MakeTableRow(token)
        );
    });
    setTableDataRows(rows);
}
const MakeTableRow = (token) => {
     
 
    return (
        {    Token: (
            <div className="TokenDivTable" style={{zoom:"0.2"}}>
          <div className="TokenDivTable-content" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <h5 style={{marginRight:"40px",fontSize:"70px"}}>{token.id} </h5>  <Token Token={token} />
          </div>
            </div>
        ),
       
            // ID: (
            //     <SoftTypography variant="button" color="text" fontWeight="medium">
            //         {token.id}
            //     </SoftTypography>
            // ),
            Amount: (
                <SoftTypography variant="button" color="text" fontWeight="medium">
                    {token.amount}
                </SoftTypography>
            ),
            Claimed: (
                <SoftTypography variant="button" color="text" fontWeight="medium">
                    {token.claimed?<h4 style={{color:"green"}}>Claimed</h4>:<h4 style={{color:"red"}}>UnClaimed</h4>}
                </SoftTypography>
            ),
            Redeemed: (
                <SoftTypography variant="button" color="text" fontWeight="medium">

                    {token.redeemed?<h4 style={{color:"green"}}>Redeemed</h4>:<h4 style={{color:"red"}}>UnRedeemed</h4>}
                </SoftTypography>
            ),

            Name: (
                <SoftTypography variant="button" color="text" fontWeight="medium">
                    {token.template.name}
                </SoftTypography>
            ),

            Details: (
                <SoftButton
                    variant="contained" color="dark" size="small"
                    onClick={() => {
                        navigate(
                            '/Tokens/Details',
                            {
                                state: {
                                    token: token
                                }
                              }
                        )
                    }}
                    >
                    <Icon> {
                   "settings"
                    } </Icon>
                </SoftButton>
            ),

        }
    );
}
  return (
     <DashboardLayout>
<DashboardNavbar />
<SearchTokens SearchReq={SearchReq} setSearchReq={setSearchReq}/>
<div className='ProjectTokens-Table' style={{marginTop:".5em"}}>
{IsLoaded ? <><TokensStats stats={ResponseData.Stats}/>
<Table columns={columns} rows={TableDataRows} />
                    <div className='text-right mx-3 my-4' style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        <Pagination count={TotalPages} onChange={(e, num) => setPage(num)} color="primary" className='float-right' />
                    </div> </> : <LoaderSmall />}
</div>    </DashboardLayout>
   )
}

export default index
