import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import SearchTemplatesReq from '../../../Requests/Templates/SearchTemplatesReq'
import SearchTemplates from './SearchTemplates'
import { useContext } from 'react';
import { UserContext } from 'App';
import { useNavigate } from 'react-router-dom'
import SoftButton from 'components/SoftButton'
import SoftTypography from 'components/SoftTypography'
import { Icon, Pagination } from '@mui/material';
import Table from "examples/Tables/Table";
import LoaderSmall from 'ProjectComponents/LoaderSmall'

const index = () => {
const User = useContext(UserContext);
const navigate = useNavigate();
 const [SearchReq , setSearchReq] = useState(new SearchTemplatesReq);
 const [ResponseData, setResponseData] = useState(null);
 const [IsLoaded, setIsLoaded] = useState(false);
 const [TotalPages, setTotalPages] = useState(0);
 const [Page, setPage] = useState(1);
 const [TableDataRows, setTableDataRows] = useState([]);
 const searchTokens = async()=>{
  let res =await TokensApi.SearchTemplates(SearchReq);
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
  { name: "Id", align: "center" },
  // { name: "ID", align: "center" },
  { name: "Name", align: "left" },
  //token type and number
  { name: "Amount", align: "left" },
  { name: "ProjectId", align: "left" },
  // { name: "Name", align: "left" },
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
const MakeTableRow = (template) => {
     
 
  return (
      {   
          Id: (
              <SoftTypography variant="button" color="text" fontWeight="medium">
                  {template.id}
              </SoftTypography>
          ),
          Name: (
              <SoftTypography variant="button" color="text" fontWeight="medium">
{template.Name}
              </SoftTypography>
          ),
          Amount: (
              <SoftTypography variant="button" color="text" fontWeight="medium">

{template.Amount}              </SoftTypography>
          ),

          ProjectId: (
              <SoftTypography variant="button" color="text" fontWeight="medium">
                  {template.ProjectId}
              </SoftTypography>
          ),

          Details: (
              <SoftButton
                  variant="contained" color="dark" size="small"
                  // onClick={() => {
                  //     navigate(
                  //         '/Tokens/Details',
                  //         {
                  //             state: {
                  //                 token: token
                  //             }
                  //           }
                  //     )
                  // }}
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
<DashboardNavbar/>
<SearchTemplates SearchReq={SearchReq} setSearchReq={setSearchReq}/>
<div className='ProjectTokens-Table' style={{marginTop:".5em"}}>
{
  <Table columns={columns} rows={TableDataRows} />


}
</div>
      </DashboardLayout>
  )
}

export default index
