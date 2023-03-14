import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { QrReader } from 'react-qr-reader';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "./ScanToken.scss";
import IdReq from '../../../../Requests/IdReq';
import TokensApi from '../../../../API/TokensApi';
import ScanResult from './ScanResult';
const index = () => {
    const [ScanData, setScanData] = useState(null);
    const [TokenId, setTokenId] = useState(null);
    const [TokenData, setTokenData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ShowScan, setShowScan] = useState(true);
    const [PromtText, setPromtText] = useState("Scan Token QR Code");
    const [facingMode, setFacingMode] = useState("environment");
    const [isLoadedData, setIsLoadedData] = useState(false);

    const handleScan = (data) => {
        console.log("scan data", data);
        if (data) {
            setScanData(data);
        }
    }

    const ExtractTokenId = () => {
        let text = ScanData.text;
        //check if the text is a valid url and that the last part of the url is /tr/{tokenid}

        if (text.includes("/tr/")) {
            let parts = text.split("/");
            let tokenid = parts[parts.length - 1];
            setTokenId(tokenid);
            setPromtText("Token Id extracted, getting token data...");
        }
        else {
            setPromtText("Invalid QR Code, please scan again");
        }
    }

    useEffect(() => {
        if (ScanData) {
            setPromtText("Code Detected, extracting token id...");
            ExtractTokenId();
        }
    }, [ScanData])

    useEffect(() => {
        if (TokenId) {
            setPromtText("Token Id extracted, getting token data...");
            GetTokenData();
        }
    }, [TokenId, isLoaded])

    const GetTokenData = async () => {
        let req = new IdReq();
        req.id = TokenId;
        let res = await TokensApi.GetTokenById(req);
        console.log(res);
        if (res.status.success) {
            setTokenData(res.data);
        }
        else {
            setPromtText("Error getting token data. " + res.status.message);
        }

    }

    useEffect(() => {
        if (TokenData) {
            setPromtText("Token Data Loaded");
            setIsLoaded(true);
            setShowScan(false);
        }
    }, [TokenData])

    useEffect(() => {
        if (!isLoaded) {
            GetTokenData();
        }
    }, [isLoaded])




    const handleError = (err) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
            footer: 'sorryyyy'
        })
    }

    const handleResult = (data) => {
        console.log("result", data);

        if (data) {
            setScanData(data);
        }
    }





    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="ScanTokenMain">
                {
                    ShowScan ?
                        <div className="Scanner">
                            <div className="ScanTokenVideo">
                                <QrReader delay={300} onError={handleError} onScan={handleScan} onResult={handleResult}
                                    videoId="ScanTokenVideoElement" constraints={{ facingMode: { facingMode } }} />

                            </div>
                            <div className="PromtText">
                                <span>{PromtText}</span>
                            </div>
                        </div>
                        :
                        <ScanResult TokenData={TokenData} setIsLoaded={setIsLoaded} setShowScan={setShowScan} />
                }

            </div>
        </DashboardLayout>
    )
}

export default index