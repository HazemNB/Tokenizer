import React, { useEffect, useState, useContext } from 'react'
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Swal from 'sweetalert2';
import { Dialog } from '@mui/material';
import { Icon } from '@mui/material';
import { UserContext } from 'App';
import TokensApi from '../../../../API/TokensApi';
import CreateTokenTransactionReq from '../../../../Requests/Tokens/CreateTokenTransactionReq';
import SoftInput from 'components/SoftInput';
const LoadTokenDialog = ({ setEnabled, Enabled, Token, setIsLoaded }) => {

    const [Amount, setAmount] = useState();

    const LoadToken = async () => {
        setEnabled(false);
        Swal.fire({
            icon: 'info',
            text: 'Loading token...',
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
        transaction.transactionType = "Load";
        transaction.amount = Amount;
        
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
        }
        else {
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
        <Dialog open={Enabled} onClose={() => setEnabled(false)}>
            <div className="dialog-container" style={{ width: "500px",
            display: "flex", flexDirection: "column", gap: "10px", padding: "10px",
            backgroundColor: "white", borderRadius: "10px",

        }}>
                <div className="dialog-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <SoftTypography variant="h6">Load Token ID: {Token.id}</SoftTypography>
                    <Icon className="dialog-close" onClick={() => setEnabled(false)}>close</Icon>
                </div>
                <div className="dialog-body" style={{ display: "flex", flexDirection: "column", gap: "10px",
                padding: "10px", width: "100%"
                }}>
                    <SoftTypography variant="h6">Amount $</SoftTypography>
                    <SoftInput type="number" value={Amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="dialog-footer" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    <SoftButton onClick={() => LoadToken()}>Load</SoftButton>
                </div>
            </div>
        </Dialog>
    )
}

export default LoadTokenDialog