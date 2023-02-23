import React, { useEffect, useState, useContext } from 'react'
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Swal from 'sweetalert2';
import { Dialog } from '@mui/material';
import { Icon } from '@mui/material';
import { UserContext } from 'App';
import CreateTokensReq from '../../../../Requests/Tokens/CreateTokensReq';
import TokensApi from '../../../../API/TokensApi';

const CreateTokensDialog = ({ setEnabled, Enabled, Template, setIsLoaded }) => {
    console.log(Template)
    const [Url, setUrl] = useState();
    const [Amount, setAmount] = useState();
    const [Quantity, setQuantity] = useState(0);
    let User = useContext(UserContext);

    useEffect(() => {
        if (Template) {
            setUrl(Template.qrCodeUrl);
            setAmount(Template.amount);
        }
    }, [Template])

    const createTokens = async () => {
        setEnabled(false);

        Swal.fire({
            icon: 'info',
            text: 'Creating tokens...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        if (!Amount) {
            Swal.fire({
                icon: 'error',
                title: 'Amount is required',
                text: 'Please enter amount',
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            }).then(() => {
                setEnabled(true);
            });

            return;
        }

        if (!Quantity) {
            Swal.fire({
                icon: 'error',
                title: 'Quantity is required',
                text: 'Please enter quantity',
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            }).then(() => {
                setEnabled(true);
            });

            return;
        }

        let req = new CreateTokensReq();

        req.amount = Amount;
        req.quantity = Quantity;
        req.otherUrl = Url;
        req.templateId = Template.id;

        let res = await TokensApi.CreateCompanyTokens(req);

        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.status.message,
                allowOutsideClick: true,
                allowEscapeKey: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            }).then(() => {
                setIsLoaded(false);
            });
            
            return;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.status.message,
                allowOutsideClick: true,
                allowEscapeKey: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            });
            return;
        }
    }


    if (!Template) return null;


    return (
        <Dialog open={Enabled} onClose={() => setEnabled(false)} PaperProps={{
            sx: {
                width: "100%",
                maxHeight: 450,
                height: "100%",
            }
        }}>
            <div>
                <div className='CreateTokensDialog__Header'>
                    <SoftTypography variant='h4' fontWeight='bold'>Create Tokens -- Template #{Template.id}</SoftTypography>
                    <Icon onClick={() => setEnabled(false)}>close</Icon>
                </div>
                <div className='CreateTokensDialog'>
                    <div className='CreateTokensDialog__Body'>
                        <div className='CreateTokensDialog__Body__Inputs'>
                            <div className='CreateTokensDialog__Body__Input'>
                                <SoftTypography variant='h6' fontWeight='bold'>Amount Loaded per Token $: </SoftTypography>
                                <input type='number' defaultValue={Template.amount} onChange={(e) => setAmount(e.target.value)} />
                            </div>

                            <div className='CreateTokensDialog__Body__Input'>
                                <SoftTypography variant='h6' fontWeight='bold'>Quantity: </SoftTypography>
                                <input type='number' onChange={(e) => setQuantity(e.target.value)} />
                            </div>

                            <div className='CreateTokensDialog__Body__Input'>
                                <SoftTypography variant='h6' fontWeight='bold'>Other Url: </SoftTypography>
                                <input type='text' defaultValue={Template.qrCodeUrl} onChange={(e) => setUrl(e.target.value)} />
                            </div>

                        </div>
                        <div className='CreateTokensDialog__Body__Buttons'>
                            <SoftButton variant='contained' color='primary' onClick={() => createTokens()}>Create Tokens</SoftButton>
                            {/* <SoftButton variant='contained' color='secondary' onClick={() => setEnabled(false)}>Cancel</SoftButton> */}
                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}

export default CreateTokensDialog