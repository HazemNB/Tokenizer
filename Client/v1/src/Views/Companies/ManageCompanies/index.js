
import Table from "examples/Tables/Table";
import Card from "@mui/material/Card";
import Pagination from '@mui/material/Pagination';
import Swal from 'sweetalert2';
import IdReq from '../../../Requests/IdReq';
import CompaniesApi from '../../../API/CompaniesApi';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import SoftButton from "components/SoftButton";
import { Icon } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchCompaniesReq from '../../../Requests/Companies/SearchCompaniesReq';
import SearchCompanies from './SearchCompanies';
import { useNavigate } from 'react-router-dom';
const index = () => {
    let navigate = useNavigate();
    const [SearchReq, setSearchReq] = useState(new SearchCompaniesReq());
    const [ResponseData, setResponseData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);
    const [TableDataRows, setTableDataRows] = useState([]);
    const [Page, setPage] = useState(1);
    const [TotalPages, setTotalPages] = useState(0);
    const [SelectedUser, setSelectedUser] = useState(null);
    const [AddProjectEnabled, setAddProjectEnabled] = useState(false);
    const searchCompanies = async () => {
        SearchReq.pagingParams.pageNumber = Page;
        SearchReq.pagingParams.pageSize = 10;
        let res = await CompaniesApi.SearchCompanies(SearchReq);
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
        useEffect(() => {
            searchCompanies();
        }, [Page, SearchReq])
        useEffect(() => {
            if (!IsLoaded) {
                searchCompanies();
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
            { name: "Email", align: "left" },
            { name: "Phone", align: "left" },
            { name: "Activation", align: "center" },
            { name: "Country", align: "center" },
            { name: "Details", align: "center" },
        ];
        const RefreshTable = () => {
            let rows = [];
            ResponseData.list?.forEach((company) => {
                rows.push(
                    MakeTableRow(company)
                );
            });
            setTableDataRows(rows);
        }
        const MakeTableRow = (company) => {
            return (
                {
                    ID: (
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                            ({company.id})
                        </SoftTypography>
                    ),
                    Name: (
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                            {company.name}
                        </SoftTypography>
                    ),
                    Email: (
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                            {company.email}
                        </SoftTypography>
                    ),
                    Phone: (
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                            {company.phone}
                        </SoftTypography>
                    ),
                    Activation: (
                       <span style={{color:company.isActive ? "green" : "red"}}>
                            {company.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                    ),
                 
                    Country: (
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                            {company.country}
                        </SoftTypography>
                    ),
                    Details: (
                        <SoftButton
                            variant="contained" color="dark" size="small"
                            onClick={() => {
                                navigate(
                                    '/Companies/Details',
                                    {
                                        state: {
                                          company: company
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
        const ToggleUserActivation = async (id) => {
            Swal.fire({
                icon: 'info',
                title: 'Toggling User Activation',
                text: 'Please wait...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
    
            let req = new IdReq(id);
            let res = await CompaniesApi.ToggleUserActivation(req);
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
        const ToggleUserDetails = async (id) => {
            Swal.fire({
                icon: 'info',
                title: 'Toggling Company Details',
                text: 'Please wait...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
    
            let req = new IdReq(id);
            let res = await CompaniesApi.ToggleUserDetails(req);
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
   <SearchCompanies SearchReq={SearchReq} setSearchReq={setSearchReq} />
    {
                   IsLoaded ? (
                       <Card style={{ marginTop: "1em" }}>
                           <Table columns={columns} rows={TableDataRows} />
                           <div className='text-right mx-3 my-4' style={{ marginTop:"0.5em", marginBottom: "0.5em" }}>
                               <Pagination count={TotalPages} onChange={(e, num) => setPage(num)} color="primary" className='float-right' />
                           </div>
                       </Card>
                   ) : (
                       <LoaderSmall/>
                   )
               }
               
       </DashboardLayout>
  )
}

export default index
