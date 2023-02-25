import TokensApi from '../../../../API/TokensApi';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react';
import SearchTokensReq from '../../../../Requests/Tokens/SearchTokensReq';
import SearchTokens from './SearchTokens';
import { useLocation } from 'react-router-dom';
import SoftTypography from 'components/SoftTypography';
import Token from './Token';
import Table from "examples/Tables/Table";
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import { Pagination } from '@mui/material';



const index = () => {
    const { state } = useLocation();
    const [SearchReq, setSearchReq] = useState(new SearchTokensReq());
    const [ResponseData, setResponseData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);
    const [TotalPages, setTotalPages] = useState(0);
    const [Page, setPage] = useState(1);
    const [TableDataRows, setTableDataRows] = useState([])
 
    const searchTokens = async () => {
  

        let res = await TokensApi.SearchTokens(SearchReq);
        if (res.status.success) {
            setResponseData(res.data);
            setTotalPages(res.data.totalPages);

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
        { name: "ID", align: "center" },
        { name: "TemplateId", align: "left" },
        //token type and number
        { name: "Type", align: "left" },
        { name: "Number", align: "left" },
        { name: "URL", align: "left" },
      
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
        ResponseData.list?.forEach((token) => {
            rows.push(
                MakeTableRow(token)
            );
        });
        setTableDataRows(rows);
    }
    const MakeTableRow = (token) => {
        return (
            {    Token: (
                <div className='TokenDivTable'>
                    <Token Token={token} />
                </div>
            ),
           
                ID: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {token.id}
                    </SoftTypography>
                ),
                TemplateId: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {token.templateId}
                    </SoftTypography>
                ),
                Type: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {token.tokenType.name}
                    </SoftTypography>
                ),
                Number: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">

                        {token.number}
                    </SoftTypography>
                ),

                URL: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {token.url}
                    </SoftTypography>
                ),

            

            }
        );
    }

  return (
    <DashboardLayout>
<DashboardNavbar />
<SearchTokens SearchReq={SearchReq} setSearchReq={setSearchReq}/>
<div className='ProjectTokens-Table' style={{marginTop:".5em"}}>
{IsLoaded ? <><Table columns={columns} rows={TableDataRows} />
                    <div className='text-right mx-3 my-4' style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        <Pagination count={TotalPages} onChange={(e, num) => setPage(num)} color="primary" className='float-right' />
                    </div> </> : <LoaderSmall />}
</div>
</DashboardLayout>
  )
}

export default index
