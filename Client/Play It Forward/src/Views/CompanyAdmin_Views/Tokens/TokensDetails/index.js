import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./TokensDetails.scss";
import Token from '../../../../ProjectComponents/Tokens/Token';
import SoftButton from 'components/SoftButton';
import CreateTokenTransactionReq from '../../../../Requests/Tokens/CreateTokenTransactionReq';
import TokensApi from '../../../../API/TokensApi';
import Swal from 'sweetalert2';
import IdReq from '../../../../Requests/IdReq';
import LoadTokenDialog from './LoadTokenDialog';
const index = () => {
  const { state } = useLocation();
  const [token, setToken] = useState(state.token);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadTokenDialog, setLoadTokenDialog] = useState(false);
  const [reloadTokenDialog, setReloadTokenDialog] = useState(false);
  useEffect(() => {
    if (!isLoaded) {
      GetToken();
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("token", token);
    if(token){
      setIsLoaded(true);
    }
  }, [token]);

  const GetToken = async () => {
    let req = new IdReq();
    req.id = state.token.id;
    let res = await TokensApi.GetTokenById(req);
    console.log(res);
    if (res.status.success) {
      setToken(res.data);
    }
  }

  const tokenActivation = async (transactionType) => {
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
    transaction.tokenId = token.id;
    transaction.transactionType = transactionType;

    let res = await TokensApi.CreateTokenTransaction(transaction);

    if(res.status.success){
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
    }else{
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
    transaction.tokenId = token.id;
    transaction.transactionType = "Redeem";
    
    let res = await TokensApi.CreateTokenTransaction(transaction);

    if(res.status.success){
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
    req.id = token.id;
    let res = await TokensApi.DeleteToken(req);
    
    if(res.status.success){
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
    <DashboardLayout>
      <DashboardNavbar />
      <div className="tokenDetails">
        <div className='tokenDetails_Token'>
          <Token Token={state.token} />
        </div>
        <div className='tokenDetails_Stats'>
          <div>
            <h5>{token.template.name} #{token.id}</h5>
            <h5 style={{color:"green"}}>${token.amount}</h5>
            {/* token.active ? */}
            <h5>
              {token.isActive ? ( <span style={{ color: "green" }}>ACTIVE</span>) : (<span style={{ color: "red" }}>INACTIVE</span>)}
            </h5>
            <h5>Played Forward {token.playedForwardCount == null ? "0" : token.playedForwardCount} Times</h5>
          </div>
          <div style={{ display: "flex", flexDirection:"column", marginLeft:"auto" }}>
            {token.claimed ? <span style={{ color: "green" }}>CLAIMED</span> : <span style={{ color: "grey" }}>UNCLAIMED</span>}
            {token.redeemed ? <span style={{ color: "green" }}>REDEEMED</span> : <span style={{ color: "grey" }}>UNREDEEMED</span>}
          </div>

          <div>
            <h5>Current Owner: </h5>
            {
              token.currentOwner ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{token.currentOwner.name}</span>
                  <span>{token.currentOwner.email}</span>
                </div>
              ) : (
                <span>None</span>
              )
            }
            <h5>Total Owners: {token.owners?.length == null ? "0" : token.owners?.length}</h5>
          </div>

          <div>
            <h5>Created At: {new Date(token.createdAt).toLocaleDateString()}</h5>
            <h5>Last Updated: {new Date(token.lastUpdated).toLocaleDateString()}</h5>
          </div>

        </div>
      </div>
      <div className='tokenDetailsButtons'>
        {
          token.isActive ? (
            <SoftButton variant="contained" color="error" size="lg" style={{ width: "100%" }} 
            onClick={()=>tokenActivation("Deactivate")}>Deactivate</SoftButton>
          ) : (
            <SoftButton variant="contained" color="success" size="lg" style={{ width: "100%" }}
            onClick={()=>tokenActivation("Activate")}> Activate</SoftButton>
          )
        }
        {
          token.redeemed ? (
            <SoftButton variant="contained" color="info" size="lg" style={{ width: "100%" }}>Reload</SoftButton>
          ) : (
            <>
            <SoftButton onClick={RedeemToken} variant="contained" color="primary" size="lg" style={{ width: "100%" }}>Redeem</SoftButton>
            <SoftButton onClick={()=>setLoadTokenDialog(true)} variant="contained" color="info" size="lg" style={{ width: "100%" }}>Load</SoftButton>
            </>
          )
        }
        <SoftButton variant="contained" color="dark" size="lg" style={{ width: "100%" }} onClick={DeleteToken}>Delete</SoftButton>
      </div>
      <LoadTokenDialog setEnabled = {setLoadTokenDialog} Enabled = {loadTokenDialog} setIsLoaded = {setIsLoaded} Token = {token} />
    </DashboardLayout>


  )
}

export default index