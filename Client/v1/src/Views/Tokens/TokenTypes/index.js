import React, { useEffect, useState } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Swal from 'sweetalert2';
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import Table from "examples/Tables/Table";
import { Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TokensApi from '../../../API/TokensApi';
import IdReq from '../../../Requests/IdReq';
import SoftInput from 'components/SoftInput';
import { AiFillDelete } from "react-icons/ai";
const Index = () => {
    let navigate = useNavigate();
    const [ResponseData, setResponseData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);
    const [TableDataRows, setTableDataRows] = useState([])

    const [Name, setName] = useState("");
    const [CreateName, setCreateName] = useState("");
    const searchTokenTypes = async () => {
        let req = new IdReq();
        req.Name = Name;
        let res = await TokensApi.GetTokenTypes(req);
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
            searchTokenTypes();
        }
        else{
            RefreshTable();
        }
    }, [IsLoaded]);

    useEffect(() => {
        if(ResponseData){
            setIsLoaded(true);
           
        }else{
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

    const MakeTableRow = (tt) => {
        return (
            {
                ID: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {tt.id}  
                    </SoftTypography>
                ),
                Name: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {tt.name}
                    </SoftTypography>
                ),
                Delete: (
                    <SoftButton
                        variant="contained" color="dark" 
                        onClick={() => {
                            DeleteTokenType(tt.id);
                        }
                    }>

                        <AiFillDelete />

                    </SoftButton>
                ),

            }
        );
    }

    const CreateNewTokenType = async () => {

        Swal.fire({
            icon: 'info',
            text: "Creating new token type",
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new IdReq();
        req.Name = CreateName;
        let res = await TokensApi.CreateTokenType(req);
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

    const DeleteTokenType = async (id) => {
        Swal.fire({
            icon: 'info',
            text: "Deleting token type",
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new IdReq(id);
        let res = await TokensApi.DeleteTokenType(req);
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

        

    
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card sx={{ width: "100%", height: "100%", padding: "1rem", marginTop:"1em" }}>
                <SoftTypography variant="h5" color="text" fontWeight="medium">
                    Token Types
                </SoftTypography>
                <div  className='CreateTokenTypeDiv'>
                    <SoftTypography variant="h6" color="text" fontWeight="medium">
                        Create New Token Type
                    </SoftTypography>
                        <SoftInput onChange={(e) => setCreateName(e.target.value)} />
                        <SoftButton
                            variant="contained" color="info"
                            onClick={() => {
                                CreateNewTokenType();
                            }}
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

export default Index