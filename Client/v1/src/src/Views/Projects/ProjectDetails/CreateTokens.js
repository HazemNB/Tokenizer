import SoftButton from 'components/SoftButton';
import React from 'react'
import { useState } from 'react'
import CreateTokensReq from '../../../Requests/Tokens/CreateTokensReq';
import TokensApi from '../../../API/TokensApi';
import Swal from 'sweetalert2';

const CreateTokens = ({ Template }) => {
    const [Count, setCount] = useState(0);
    const [Url, setUrl] = useState('');
    const CreateTokens = async () => {
        Swal.fire({
            title: 'Creating Tokens',
            text: 'Please wait...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: async () => {
                Swal.showLoading();
            }
        })
        let req = new CreateTokensReq();
        req.quantity = Count;
        req.otherUrl = Url;
        req.templateId = Template.id;
        let res = await TokensApi.CreateTokens(req);
        if (res.status.success) {
            Swal.fire({
                title: 'Success',
                text: 'Tokens created successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
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
    return (
        <div className='CreateTokens'>
            <div className='CreateTokens-Header'>
                <span>{Template != null ? <>
                    Selected Template #{Template.id}
                </> :
                    <>
                        No Template Selected
                    </>}</span>
            </div>
                <div className='CreateTokens-Body'>
                    <div className='CreateTokens-Input'>
                        <label htmlFor="CreateTokens-Input-Count">QTY: </label>
                        <input type="number" name="CreateTokens-Input-Count" id="CreateTokens-Input-Count" onChange={(e) => { setCount(e.target.value) }} />
                    </div>
                    <div className='CreateTokens-Input'>
                        <label htmlFor="CreateTokens-Input-Count">Change URL: </label>
                        <input type="text" name="CreateTokens-Input-Count" id="CreateTokens-Input-Count"
                            placeholder={Template ? Template.qrCodeUrl : ''} onChange={(e) => { setUrl(e.target.value) }} />
                    </div>
                    <SoftButton variant="outlined" color="success" size="small" className="TemplateControlButton"
                        onClick={CreateTokens}>
                        Add Tokens
                    </SoftButton>
                </div>
        </div>
    )
}

export default CreateTokens