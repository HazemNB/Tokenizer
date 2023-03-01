import { Table } from '@mui/material';
import SoftTypography from 'components/SoftTypography';
import React, { useEffect, useState } from 'react'
import Token from './Token';
const TokensTable = () => {
  const [TableDataRows, setTableDataRows] = useState([]);
  const [ResponseData, setResponseData] = useState(null);
  const searchTokens = async () => {
    
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
    console.log("token " +token)
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
              <div style={{zoom:"0.2"}}>
                  <Token Token={token} />
              </div>
          ),
         

      }
  );
}
  return (
    <div className='ProjectTokens-Table'>
<Table columns={columns} rows={TableDataRows} />
      </div>
  )
}

export default TokensTable
