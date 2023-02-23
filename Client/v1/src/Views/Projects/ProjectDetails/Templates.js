import { useState } from 'react'
import { Card } from '@mui/material'
import SoftButton from 'components/SoftButton'
import React from 'react'
import CreateTokens from './CreateTokens'
import Template from './Template'
import UpdateAllTemplateTokens from './UpdateAllTemplateTokens'
import IdReq from '../../../Requests/IdReq'
import TokensApi from '../../../API/TokensApi'
import Swal from 'sweetalert2'
const Templates = ({ Templates, Project, handleEditTemplate }) => {
    const [SelectedTemplate, setSelectedTemplate] = useState()
    const [TemplateIndex, setTemplateIndex] = useState()

    const [UpdateAllTemplateTokensEnabled, setUpdateAllTemplateTokensEnabled] = useState(false)
    
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
    

    
    return (
        <Card className='ProjectTemplatesCard'>
            <div className='ProjectTemplates-Templates'>
                {Templates.map((template, index) => {
                    return (
                        <div className='ProjectTemplate' key={index}>
                            <div className='ProjectTemplate-Template'>
                                <Template Template={template} Project={Project} />
                            </div>
                            <div className='ProjectTemplateControls'>
                                <SoftButton onClick={() => { setSelectedTemplate(template)}}
                                 variant="outlined" color="primary" size="small" className="TemplateControlButton">
                                    #{template.id} Select
                                </SoftButton>
                                <SoftButton onClick={() => { setUpdateAllTemplateTokensEnabled(true); setSelectedTemplate(template); setTemplateIndex(index)}}
                                 variant="outlined" color="primary" size="small" className="TemplateControlButton">
                                    Update All Codes
                                </SoftButton>
                                <SoftButton variant="outlined" color="primary" size="small" className="TemplateControlButton" onClick={() => { handleEditTemplate(template) }}>
                                    Edit
                                </SoftButton>
                                <SoftButton variant="outlined" color="primary"
                                    onClick={() => { DeleteTemplate(template) }}
                                 size="small" className="TemplateControlButton">
                                    Delete
                                </SoftButton>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

            <div className='ProjectTemplates-CreateTokens'>
                <CreateTokens Template={SelectedTemplate} />
            </div>
            </div>
            <UpdateAllTemplateTokens Enabled={UpdateAllTemplateTokensEnabled} setEnabled={setUpdateAllTemplateTokensEnabled} Template={SelectedTemplate} />
        </Card>
    )
}

export default Templates