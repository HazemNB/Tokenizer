import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { QrReader } from 'react-qr-reader';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "./ScanToken.scss"
const index = () => {
    const [ScanData, setScanData] = useState(null);
    const [TokenData, setTokenData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [PromtText, setPromtText] = useState("Scan Token QR Code");

    const handleScan = (data) => {
        console.log("scan data", data);
        if (data) {
            setScanData(data);
        }
    }

    const handleError = (err) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
            footer: '<a href>Why do I have this issue?</a>'
        })
    }

    const handleResult = (data) => {
    }





    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="ScanTokenMain">
                {
                    !isLoaded ?
                        <div className="Scanner">
                            <div className="ScanTokenVideo">
                                <QrReader delay={300} onError={handleError} onScan={handleScan} onResult={handleResult}
                                    videoId="ScanTokenVideoElement" />

                            </div>
                            <div className="PromtText">
                                <span>{PromtText}</span>
                            </div>
                        </div>
                        :
                        <div className="TokenData">
                            <span>Loaded</span>
                        </div>
                }

            </div>
        </DashboardLayout>
    )
}

export default index