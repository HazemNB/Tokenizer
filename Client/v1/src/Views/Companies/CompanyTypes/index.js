import { Card, Table } from '@mui/material'
import CompaniesApi from '../../../API/CompaniesApi';
import IdReq from '../../../Requests/IdReq'
import SoftButton from 'components/SoftButton'
import SoftInput from 'components/SoftInput'
import SoftTypography from 'components/SoftTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import TokensApi from '../../../API/TokensApi';
const index = () => {
    let navigate = useNavigate();
    const[CreateName,setCreateName] =useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);
    const [TableDataRows, setTableDataRows] = useState([])
const[Name,setName]=useState("")
    const[ResponseData,setResponseData]=useState();
 
    const searchCompanyTypes = async () => {
        let req = new IdReq();
        req.Name = Name;
        let res = await CompaniesApi.GetCompany(req);
        if (res.status.success) {
            setResponseData(res.data);
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }
 

    useEffect(() => {
        if (!IsLoaded) {
            searchCompanyTypes();
        }
        else{
            RefreshTable();
        }
    }, [IsLoaded]);

    useEffect(() => {
        if(ResponseData){
            setIsLoaded(true);
            RefreshTable();
        }
    }, [ResponseData]);
    let columns= [
        { name: "ID", align: "center" },
        { name: "Name", align: "left" },
        { name: "Delete", align: "center" },
    ];
    const RefreshTable = () => {
        let rows = [];
        ResponseData?.forEach((user) => {
            rows.push(
                MakeTableRow(user)
            );
        });
        setTableDataRows(rows);
    }
    const CreateNewCompanyType = async()=>{
        Swal.fire({
            icon: 'info',
            text: "Creating new token type",
            didOpen: () => {
                Swal.showLoading();
            }
        });
        let req = new IdReq();
        req.Name = CreateName;
        let res = await CompaniesApi.CreateCompanyType(req);
        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
            });

            setIsLoaded(false);
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }
    const DeleteCompanyType = async (id) => {
        Swal.fire({
            icon: 'info',
            text: "Deleting company type",
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new IdReq(id);
        let res = await CompaniesApi.DeleteCompanyType(req);
        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
            });
                
            setIsLoaded(false);
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }
    const MakeTableRow = (item) => {
        return (
            {
                ID: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {item.id}  
                    </SoftTypography>
                ),
                Name: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {item.name}
                    </SoftTypography>
                ),
                Delete: (
                    <SoftButton
                        variant="contained" color="dark" 
                        onClick={() => {
                            DeleteCompanyType(item.id);
                        }
                    }>

                        <AiFillDelete />

                    </SoftButton>
                ),

            }
        );
    }
  return (
    <DashboardLayout>
 <DashboardNavbar />
 {/* start Create */}
 <Card sx={{ width: "100%", height: "100%", padding: "1rem", marginTop:"1em" }}>
 <SoftTypography variant="h5" color="text" fontWeight="medium">
                    Company Types
                </SoftTypography>
                <div  className='CreateTokenTypeDiv'>
                <SoftTypography variant="h6" color="text" fontWeight="medium">
                        Create New Company Type
                    </SoftTypography>
                <SoftInput onChange={(e) => setCreateName(e.target.value)}  placeholder="Name"/>
                 <SoftButton
                            variant="contained" color="info"
                            // onClick={() => {
                            //     CreateNewTokenType();
                            // } }
                            onClick={()=>{CreateNewCompanyType()}}
                        >
                            Create
                        </SoftButton>
                </div>
                {IsLoaded ? <><Table columns={columns} rows={TableDataRows} />
                <div className='text-right mx-3 my-4' style={{ marginTop:"0.5em", marginBottom: "0.5em" }}>
                </div> </>: <LoaderSmall />} 
 </Card>
    </DashboardLayout>
  )
  }

export default index