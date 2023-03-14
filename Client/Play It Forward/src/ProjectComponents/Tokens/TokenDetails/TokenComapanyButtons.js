import React, { useEffect, useState } from 'react';
import SoftButton from 'components/SoftButton';
import CreateTokenTransactionReq from '../../../Requests/Tokens/CreateTokenTransactionReq';
import TokensApi from '../../../API/TokensApi';
import Swal from 'sweetalert2';
import ReloadTokenDialog from './ReloadTokenDialog';
import LoadTokenDialog from './LoadTokenDialog';
import IdReq from '../../../Requests/IdReq';
const TokenComapanyButtons = ({ Token, setIsLoaded }) => {
    
  const [loadTokenDialog, setLoadTokenDialog] = useState(false);
  const [reloadTokenDialog, setReloadTokenDialog] = useState(false);
    const TokenActivation = async (transactionType) => {
        Swal.fire({
            icon: 'info',
            text: 'Toggling Token Activation...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        let transaction = new CreateTokenTransactionReq();
        transaction.tokenId = Token.id;
        transaction.transactionType = transactionType;

        let res = await TokensApi.CreateTokenTransaction(transaction);

        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.status.message,
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            })


            setIsLoaded(false);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.status.message,
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            })
        }
    }

    const RedeemToken = async () => {
        Swal.fire({
            icon: 'info',
            text: 'Redeeming Token...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        let transaction = new CreateTokenTransactionReq();
        transaction.tokenId = Token.id;
        transaction.transactionType = "Redeem";

        let res = await TokensApi.CreateTokenTransaction(transaction);

        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.status.message,
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.status.message,
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            })
        }
    }

    const DeleteToken = async () => {
        Swal.fire({
            icon: 'info',
            text: 'Deleting Token...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        let req = new IdReq();
        req.id = Token.id;
        let res = await TokensApi.DeleteToken(req);

        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.status.message,
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            }).then(() => {
                window.location.href = "/tokens";
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.status.message,
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                didOpen: () => {
                    Swal.hideLoading();
                }
            })
        }
    }
    return (
        <div className='tokenDetailsButtons'>
            {
                Token.isActive ? (
                    <SoftButton variant="contained" color="error" size="lg" style={{ width: "100%" }}
                        onClick={() => TokenActivation("Deactivate")}>Deactivate</SoftButton>
                ) : (
                    <SoftButton variant="contained" color="success" size="lg" style={{ width: "100%" }}
                        onClick={() => TokenActivation("Activate")}> Activate</SoftButton>
                )
            }
            {
                Token.redeemed ? (
                    <SoftButton variant="contained" color="info" size="lg" style={{ width: "100%" }}>Reload</SoftButton>
                ) : (
                    <>
                        <SoftButton onClick={RedeemToken} variant="contained" color="primary" size="lg" style={{ width: "100%" }}>Redeem</SoftButton>
                        <SoftButton onClick={() => setLoadTokenDialog(true)} variant="contained" color="info" size="lg" style={{ width: "100%" }}>Load</SoftButton>
                    </>
                )
            }
            <SoftButton variant="contained" color="dark" size="lg" style={{ width: "100%" }} onClick={DeleteToken}>Delete</SoftButton>

            <LoadTokenDialog setEnabled={setLoadTokenDialog} Enabled={loadTokenDialog} setIsLoaded={setIsLoaded} Token={Token} />
            <ReloadTokenDialog setEnabled={setReloadTokenDialog} Enabled={reloadTokenDialog} setIsLoaded={setIsLoaded} Token={Token} />
        </div>
    )
}

export default TokenComapanyButtons