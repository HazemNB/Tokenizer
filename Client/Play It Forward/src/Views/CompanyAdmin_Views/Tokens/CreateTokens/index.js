import React, { useEffect, useState } from 'react'
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Card } from '@mui/material'
import Swal from 'sweetalert2';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import TokensApi from '../../../../API/TokensApi';
import IdReq from '../../../../Requests/IdReq';

import Template from '../../../../ProjectComponents/Tokens/Template'
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from 'App';
import CreateTokensDialog from './CreateTokensDialog';
const index = () => {
    let navigate = useNavigate();
    let User = useContext(UserContext);
    const [TemplatesData, setTemplatesData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);
    const [CreateTokensDialogEnabled, setCreateTokensDialogEnabled] = useState(false);
    const [SelectedTemplate, setSelectedTemplate] = useState(null);

    const GetTemplates = async () => {
        let searchReq = new IdReq();
        searchReq.id = User.companyId;

        let res = await TokensApi.GetCompanyTemplates(searchReq);

        console.log(res);

        if (res.status.success) {
            setTemplatesData(res.data);
        }
        else {
            Swal.fire({
                title: 'Error',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    useEffect(() => {
        if (!IsLoaded) {
            GetTemplates();
        }
    }, [IsLoaded])

    useEffect(() => {
        if (TemplatesData) {
            setIsLoaded(true);
        }
    }, [TemplatesData])


    const handleCreateDialogOpen = (Template) => {
        setSelectedTemplate(Template);
        setCreateTokensDialogEnabled(true);
    }


    const DeleteTemplate = async (template) => {
        let confmation = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if (!confmation.isConfirmed) {
            return;
        }

        Swal.fire({
            title: 'Deleting...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
            
        })
        const req = new IdReq(template.id)
        
        const res = await TokensApi.DeleteTemplate(req)
        if (res.status.success) {
            Swal.fire({
                title: 'Deleted!',
                text: 'Template has been deleted.',
                icon: 'success',
                confirmButtonText: 'Ok',
                didOpen: () => {
                    Swal.hideLoading()
                }
            })
            window.location.reload()
        }
        else {
            Swal.fire({
                title: 'Error',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Ok',
                didOpen: () => {
                    Swal.hideLoading()
                }
            })
        }
        
    }
    

    if(!IsLoaded && !TemplatesData) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SoftTypography variant='h4' className='LoadingText'>Loading...</SoftTypography>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card className='CompanyTemplatesCard'>
                <div className='ProjectTemplates-Templates'>
                    {TemplatesData.map((td, index) => {
                        return (
                            <div className='ProjectTemplate' key={index}>
                                <div className='ProjectTemplate-Template'>
                                    <Template Template={td.Template}/>
                                    
                                </div>
                                <div className='ProjectTemplate-Info'>
                                        <SoftTypography variant='h6' className='ProjectTemplate-Name'>{td.Template.name}</SoftTypography>
                                        <SoftTypography variant='h6' className='ProjectTemplate-TokenCount'>{td.TokensCount} Tokens</SoftTypography>

                                </div>
                                <div className='ProjectTemplate-Info'>
                                    <span className='ProjectTemplate-Description'>{td.Template.description}</span>
                                </div>
                                <div className='ProjectTemplateControls' style={{display:"flex"}}>
                                    <SoftButton onClick={() => { handleCreateDialogOpen(td.Template) }}
                                        variant="gradient"  color="info" size="small" className="TemplateControlButton">
                                        Select
                                    </SoftButton>
                             
                                    <SoftButton variant="gradient" color="primary" size="small" className="TemplateControlButton" 
                                    onClick={() => { 
                                           navigate(
                                            '/Tokens/Details',
                                            {
                                                state: {
                                                  td: td
                                                }
                                              }
                                        )
                                      }}>
                                        Edit
                                    </SoftButton>
                                    <SoftButton variant="gradient" color="error"
                                        onClick={() => { DeleteTemplate(td.Template) }}
                                        size="small" className="TemplateControlButton">
                                        Delete
                                    </SoftButton>
                                </div>
                            </div>
                        )
                    })}
                </div>
            
            </Card>
            <CreateTokensDialog Template={SelectedTemplate} Enabled={CreateTokensDialogEnabled} 
            setEnabled={setCreateTokensDialogEnabled} setIsLoaded={setIsLoaded} />
        </DashboardLayout>
    )
}

export default index