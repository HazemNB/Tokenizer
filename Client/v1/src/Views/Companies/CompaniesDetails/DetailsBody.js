
import React, { useEffect, useState } from 'react'
import EditTemplates from './EditTemplates';
import SearchCompaniesReq from '../../../Requests/Companies/SearchCompaniesReq';
import CompaniesApi from '../../../API/CompaniesApi';
import IdReq from '../../../Requests/IdReq';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import Card from "@mui/material/Card";
import { Icon } from '@mui/material';
import AddUserToCompany from './AddUserToCompany';
import Table from "examples/Tables/Table";
import Swal from 'sweetalert2';

const DetailsBody = ({ComapanyData, setIsLoaded}) => {
  console.log(ComapanyData)
  const [TableDataRows, setTableDataRows] = useState([])

  let columns = [
    { name: "ID", align: "center" },
    { name: "Name", align: "left" },
    { name: "Email", align: "left" },
    { name: "Delete", align: "center" },
  ];
  const RefreshTable = () => {
    let rows = [];
    ResponseData?.list.forEach((user) => {
      console.log(ResponseData)
      rows.push(
        MakeTableRow(user)
      );
    });
    setTableDataRows(rows);
  }
  const MakeTableRow = (user) => {
    return (
      {
        ID: (
          <SoftTypography variant="button" color="text" fontWeight="medium">
            (  {user.id})
          </SoftTypography>
        ),
        Name: (
          <SoftTypography variant="button" color="text" fontWeight="medium">
            {user.name}
          </SoftTypography>
        ),
        Email: (
          <SoftTypography variant="button" color="text" fontWeight="medium">
            {user.email}
          </SoftTypography>
        ),


        Delete: (
          <SoftButton
            variant="contained" color="dark" size="small"
            onClick={() => {
              // ToggleCompanyDelete(company.id);
            }
            }>
            <Icon> 
             delete
            </Icon>
          </SoftButton>
        ),

      }
    );
  }
 
  return (
    <>
      {/* add user to company */}
      <AddUserToCompany setIsLoaded={setIsLoaded} />
      {/* <EditTemplates SearchReq={SearchReq} setSearchReq={setSearchReq}/> */}
      <Card style={{ marginTop: "1em" }}>
        {/* <Table columns={columns} rows={TableDataRows} /> */}
      </Card>
    </>
  )
}

export default DetailsBody
