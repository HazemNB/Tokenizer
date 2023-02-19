import React from 'react'
import IdReq from '../../../Requests/IdReq';
import TokensApi from '../../../API/TokensApi';
import Swal from 'sweetalert2';
import ReDiv from './ReDiv';
// import ipfy from 'ipify';
import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import DeviceDetector from "device-detector-js";
import CreateScanReq from '../../../Requests/Tokens/CreateScanReq';

const index = () => {
    //get token id from url
    const getTokenId = () => {
        const url = window.location.href;
        const urlArray = url.split("/");
        const tokenId = urlArray[urlArray.length - 1];
        return tokenId;
    }
    const tokenId = getTokenId();
    console.log(tokenId);

    const [Token, setToken] = useState(null);
    //get token from api
    const getToken = async () => {
        let req = new IdReq(tokenId);
        let res = await TokensApi.GetTokenById(req);
        console.log(res);
        if (res.status.success) {
            setToken(res.data);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.status.message,
            })
        }
    }

    const getScanData = async () => {
//         $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
//   console.log(JSON.stringify(data, null, 2));
// }); implement without jquery
        const response = await fetch('https://api.ipify.org?format=json');
        const json = await response.json();

        console.log(json);
        const ScanData = {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            userAgent: navigator.userAgent,
            ipAddressV4: json.ip,
            device: new DeviceDetector().parse(navigator.userAgent)
        }
        console.log(ScanData);
        return ScanData;
    }

    const UploadScanData = async (ScanData) => {
        let req = new CreateScanReq();
        req.tokenId = Token.id;
        req.os = ScanData.device.os.name;
        req.browser = ScanData.device.client.name;
        req.ipAddress = ScanData.ipAddressV4;
        req.language = ScanData.language;
        req.country = ScanData.timeZone;
        req.device = ScanData.device.device.type;
        req.deviceType = ScanData.device.device.brand;
        console.log(req);
        let res = await TokensApi.CreateScan(req);
        console.log(res);
        if (res.status.success) {
            console.log("Scan data uploaded successfully");
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.status.message,
            })
        }
    }



    useEffect(() => {
        getToken();
    }, []);

    const HandleNavigation = async () => {
        let data = await getScanData();
        await UploadScanData(data);
        // check if token.url is valid url and starts with http or https if not add https://
        let url = Token.url;
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        window.location.href = url;
    }


    useEffect(() => {
        if (Token) {
            HandleNavigation();
        }       
    }, [Token]);


  return (
    <div className="loaderDiv">
        <h1>
            Tokenizer 
        </h1>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    </div>
  )
}

export default index