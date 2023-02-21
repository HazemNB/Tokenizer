
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
import ManyToManyReq from '../../../Requests/ManyToManyReq';

const DetailsBody = ({CompanyData, setIsLoaded}) => {
  console.log(CompanyData)
  const [TableDataRows, setTableDataRows] = useState([])
  useEffect(() =>{
    RefreshTable();
  } ,[CompanyData])
  let columns = [
    { name: "ID", align: "center" },
    { name: "Name", align: "left" },
    { name: "Email", align: "left" },
    { name: "Delete", align: "center" },
  ];
  const RefreshTable = () => {
    let rows = [];
    CompanyData?.Users.forEach((user) => {
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
              RemoveUserFromCompany(user.id)
              // Remove User From Company(auesme=user.id){
              // let req = new ManyToMany(user.id, Company.id);
              // }
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
  const RemoveUserFromCompany = async (UserId) => {
 
    
    Swal.fire({
        icon: 'info',
        text: 'Removing user from company...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    let req = new ManyToManyReq(UserId , CompanyData.Company.id);

    let res = await CompaniesApi.RemoveUserFromCompany(req);

    if (res.status.success) {
        Swal.fire({
            icon: 'success',
            text: res.status.message,
            didOpen: () => {
                Swal.hideLoading();
            }
        });
        setIsLoaded(false);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.status.message,
            didOpen: () => {
                Swal.hideLoading();
            }
        });
    }
}



  return (
    <>
      {/* add user to company */}
      <AddUserToCompany setIsLoaded={setIsLoaded} Company={CompanyData.Company} />
      {/* <EditTemplates SearchReq={SearchReq} setSearchReq={setSearchReq}/> */}
      <Card style={{ marginTop: "1em" }}>
        <Table columns={columns} rows={TableDataRows} />
      </Card>
    </>
  )
}

export default DetailsBody
