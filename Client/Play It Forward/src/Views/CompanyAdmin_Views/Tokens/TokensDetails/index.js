import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TokensApi from '../../../../API/TokensApi';
import IdReq from '../../../../Requests/IdReq';
import TokenData from 'ProjectComponents/Tokens/TokenDetails/TokenData';
import TokenComapanyButtons from 'ProjectComponents/Tokens/TokenDetails/TokenComapanyButtons';
const index = () => {
  const { state } = useLocation();
  const [token, setToken] = useState(state.token);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!isLoaded) {
      GetToken();
    }
  }, [isLoaded]);

  useEffect(() => {
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

    

 
  return (
    <DashboardLayout>
      <DashboardNavbar />
      
        <TokenData Token={token} />
        <TokenComapanyButtons Token={token} setIsLoaded={setIsLoaded} />
      
    </DashboardLayout>


  )
}

export default index