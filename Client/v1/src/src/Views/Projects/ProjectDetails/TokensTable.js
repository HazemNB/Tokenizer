import { Card } from '@mui/material'
import TokensApi from '../../../API/TokensApi';
import SearchTokensReq from '../../../Requests/Tokens/SearchTokensReq';
import SoftButton from 'components/SoftButton'
import React from 'react'
import SoftTypography from 'components/SoftTypography';
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import LoaderSmall from 'ProjectComponents/LoaderSmall';
import Table from "examples/Tables/Table";
import Pagination from '@mui/material/Pagination';
import Token from './Token';
import BatchReq from '../../../Requests/Tokens/BatchReq';
import { useNavigate } from 'react-router-dom';
const TokensTable = ({ Project }) => {

    let navigate = useNavigate();

    const [ResponseData, setResponseData] = useState(null);
    const [IsLoaded, setIsLoaded] = useState(false);

    const [TableDataRows, setTableDataRows] = useState([])
    const [Page, setPage] = useState(1);
    const [TotalPages, setTotalPages] = useState(0);

    const [TemplateId, setTemplateId] = useState(null);
    const [URL, setURL] = useState(null);
    let baseReq = new SearchTokensReq();
    baseReq.ProjectId = Project.Id;
    baseReq.pagingParams.pageNumber = 1;
    baseReq.pagingParams.pageSize = 10;
    const [SearchReq, setSearchReq] = useState(baseReq);

    const [BatchIdFrom, setBatchIdFrom] = useState(null);
    const [BatchIdTo, setBatchIdTo] = useState(null);
    const [BatchUrl, setBatchUrl] = useState(null);


    const searchTokens = async () => {
        SearchReq.pagingParams.pageNumber = Page;
        SearchReq.ProjectId = Project.id;

        let res = await TokensApi.SearchTokens(SearchReq);
        if (res.status.success) {
            setResponseData(res.data);
            setTotalPages(res.data.totalPages);

        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }
    const onSearchClick = () => {
        //copy base req
        let req = Object.assign({}, baseReq);
        req.ProjectId = Project.id;
        req.Url = URL;
        req.pagingParams.pageNumber = 1;
        req.pagingParams.pageSize = 10;
        if (TemplateId) {
            req.TemplateId = TemplateId;
        }
        if (URL) {
            req.URL = URL;
        }
        setSearchReq(req);
    }

    let columns = [
        { name: "ID", align: "center" },
        { name: "TemplateId", align: "left" },
        //token type and number
        { name: "Type", align: "left" },
        { name: "Number", align: "left" },
        { name: "URL", align: "left" },
        { name: "Token", align: "center" },
    ];

    useEffect(() => {
        searchTokens();
    }, [Page, SearchReq])

    useEffect(() => {
        if (!IsLoaded) {
            searchTokens();
        }
        else {
            RefreshTable();
        }
    }, [IsLoaded]);

    useEffect(() => {
        if (ResponseData) {
            setIsLoaded(true);
            RefreshTable();
        }
    }, [ResponseData]);
    const RefreshTable = () => {
        let rows = [];
        ResponseData.list?.forEach((token) => {
            rows.push(
                MakeTableRow(token)
            );
        });
        setTableDataRows(rows);
    }

    const MakeTableRow = (token) => {
        return (
            {
                ID: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {token.id}
                    </SoftTypography>
                ),
                TemplateId: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {token.templateId}
                    </SoftTypography>
                ),
                Type: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {token.tokenType.name}
                    </SoftTypography>
                ),
                Number: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">

                        {token.number}
                    </SoftTypography>
                ),

                URL: (
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                        {token.url}
                    </SoftTypography>
                ),

                Token: (
                    <div className='TokenDivTable'>
                        <Token Token={token} />
                    </div>
                ),
               

            }
        );
    }


    const BatchUpdateUrls = async () => {
        Swal.fire({
            icon: 'info',
            text: 'Updating...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new BatchReq();
        req.projectId = Project.id;
        req.idFrom = BatchIdFrom;
        req.idTo = BatchIdTo;
        req.newUrl = BatchUrl;
        let res = await TokensApi.EditTokenBatch(req);
        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.message,
            });
            searchTokens();
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }

    const BatchDelete = async () => {
        Swal.fire({
            icon: 'info',
            text: 'Deleting...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let req = new BatchReq();
        req.projectId = Project.id;
        req.idFrom = BatchIdFrom;
        req.idTo = BatchIdTo;
        let res = await TokensApi.DeleteTokenBatch(req);
        console.log(res);
        if (res.status.success) {
            Swal.fire({
                icon: 'success',
                text: res.message,
            });
            searchTokens();
        }
        else {
            Swal.fire({
                icon: 'error',
                text: res.status.message,
            });
        }
    }




    return (
        <Card className='ProjectTokensCard'>

            <div className='ProjectTokens-Search'>
                <div className='ProjectTokens-Search-Input'>
                    <label>Template Id</label>
                    <input type='number' onChange={(e) => setTemplateId(e.target.value)} />
                </div>
                <div className='ProjectTokens-Search-Input'>
                    <label>URL</label>
                    <input type='text' onChange={(e) => setURL(e.target.value)} />
                </div>
                <SoftButton variant='outlined' color='primary' size='small' className='ProjectTokens-Search-Button'
                    onClick={onSearchClick}
                >
                    Search
                </SoftButton>
            </div>
            <div className='BatchOperations'>
                <div className='BatchOperations-Header'>
                    <SoftTypography variant='h6' color='text' fontWeight='medium'>
                        Batch Operations
                    </SoftTypography>
                </div>
                <div className='BatchOperations-Inputs'>
                    <div className='BatchOperations-Inputs-Input'>
                        <label>Id From </label>
                        <input type='number' onChange={(e) => setBatchIdFrom(e.target.value)} />
                    </div>
                    <div className='BatchOperations-Inputs-Input'>
                        <label>Id To </label>
                        <input type='number' onChange={(e) => setBatchIdTo(e.target.value)} />
                    </div>
                    <div className='BatchOperations-Inputs-Input'>
                        <label>New Url </label>
                        <input type='text' onChange={(e) => setBatchUrl(e.target.value)} />
                    </div>
                </div>
                <div className='BatchOperations-Buttons'>
                    <SoftButton onClick={BatchUpdateUrls}
                     variant='outlined' color='info' size='small' className='BatchOperations-Buttons-Button'>
                        Update Url
                    </SoftButton>
                    <SoftButton onClick={() =>{
                        navigate(`/Tokens/Scans`, { state: { project: Project, idFrom: BatchIdFrom, idTo: BatchIdTo } })
                    }}
                     variant='outlined' color='success' size='small' className='BatchOperations-Buttons-Button'>
                        Scans
                    </SoftButton>
                    <SoftButton onClick={() =>{
                        navigate(`/tokens/export`, { state: { project: Project, idFrom: BatchIdFrom, idTo: BatchIdTo } })
                    }}
                     variant='outlined' color='success' size='small' className='BatchOperations-Buttons-Button'>
                        Export
                    </SoftButton>
                    <SoftButton onClick={BatchDelete}
                     variant='outlined' color='error' size='small' className='BatchOperations-Buttons-Button'>
                        Delete
                    </SoftButton>
                </div>
            </div>
            <div className='ProjectTokens-Table'>
                {IsLoaded ? <><Table columns={columns} rows={TableDataRows} />
                    <div className='text-right mx-3 my-4' style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        <Pagination count={TotalPages} onChange={(e, num) => setPage(num)} color="primary" className='float-right' />
                    </div> </> : <LoaderSmall />}
            </div>

        </Card>
    )
}

export default TokensTable