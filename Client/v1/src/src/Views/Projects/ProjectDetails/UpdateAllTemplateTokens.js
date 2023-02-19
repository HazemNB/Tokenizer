import { Dialog } from '@mui/material'
import React from 'react'
import {Icon} from '@mui/material'
import SoftButton from 'components/SoftButton'
import IdReq from '../../../Requests/IdReq'
import TokensApi from '../../../API/TokensApi'
import Swal from 'sweetalert2'
import { useState } from 'react'

const UpdateAllTemplateTokens = ({ Enabled, setEnabled, setIsLoaded, Template }) => {
    
    const [QrCodeUrl, setQrCodeUrl] = useState(Template?.qrCodeUrl);

    const updateAllTemplateTokens = async () => {
        setEnabled(false);
        Swal.fire({
            icon: 'info',
            text: 'Updating all tokens...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new IdReq(Template.id);
        req.Name = QrCodeUrl;

        let res = await TokensApi.UpdateAllTemplateTokens(req);

        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
                didOpen: () => {
                    Swal.hideLoading();
                }
            });
            setIsLoaded(false);
        }
        else {
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
        <Dialog open={Enabled} maxWidth={"md"} fullWidth onClose={() => setEnabled(false)}
            PaperProps={{
                sx: {
                    width: "100%",
                    maxHeight: 300,
                    height: "100%",
                }
            }}>
           <div>

            <div style={{ display: 'flex', flexDirection: "row-reverse", justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <Icon onClick={() => setEnabled(false)}>close</Icon>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between',
                borderBottom: '1px solid #ccc', marginBottom: '10px', 
            }}>
                    <h3>
                        Template Id: { Template?.id } 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         Old Url: { Template?.qrCodeUrl }
                    </h3>
                </div>
                    
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between',
                    border: '1px solid #ccc', marginBottom: '10px', padding: '10px', borderRadius: '5px'
             }}>
                    <label style={{ marginRight: '10px' }}
                    >New Url:</label>
                    <input type="text" defaultValue={Template?.qrCodeUrl} onChange={(e) => { setQrCodeUrl(e.target.value) }} />
                    </div>
                    <SoftButton variant="outlined" color="primary" size="small" onClick={() => { updateAllTemplateTokens() }}>
                        Update
                    </SoftButton>
            </div>

           </div>
        </Dialog>
    )
}

export default UpdateAllTemplateTokens