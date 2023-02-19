import React, { useEffect, useState } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from 'react-router-dom';
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import TokensApi from '../../../API/TokensApi';
import BatchReq from '../../../Requests/Tokens/BatchReq';
import Swal from 'sweetalert2';
import SoftButton from 'components/SoftButton';
import ScanResults from './ScanResults';

const index = () => {
    const { state } = useLocation();
    const [IsLoaded, setIsLoaded] = useState(false);
    const [From, setFrom] = useState(state?.idFrom ? state.idFrom : null);
    const [To, setTo] = useState(state?.idTo ? state.idTo : null);
    const [ResponseData, setResponseData] = useState(null);

    useEffect(() => {
        if (From && To) {
            GetScans();
        }
    }, []);

    useEffect(() => {
        if (ResponseData) {
            setIsLoaded(true);
        }
    }, [ResponseData]);

    const GetScans = async () => {
        setIsLoaded(false);
        let req = new BatchReq();
        req.idFrom = From;
        req.idTo = To;

        let res = await TokensApi.GetBatchScans(req);
        console.log(res);
        if (res.status.success) {
            setResponseData(res.data);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.status.message,
            })
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="Scans">
                <h3>Scan Stats</h3>
                <div className="ExportTokens-Search">
                    <div className="ExportTokens-Search-Input">
                        <label htmlFor="idFrom">From</label>
                        <input type="number" name="idFrom" id="idFrom" value={From} onChange={(e) => setFrom(e.target.value)} />
                    </div>
                    <div className="ExportTokens-Search-Input">
                        <label htmlFor="idTo">To</label>
                        <input type="number" name="idTo" id="idTo" value={To} onChange={(e) => setTo(e.target.value)} />
                    </div>
                    <SoftButton onClick={GetScans} variant="outlined" color="primary" >
                        Search
                    </SoftButton>
                </div>
                {
                    IsLoaded ?
                    <ScanResults Scans={ResponseData} />
                    :
                    <LoaderSmall />
                }
                
            </div>
        </DashboardLayout>
    )
}

export default index
