import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async';
import Swal from 'sweetalert2';
import SoftTypography from 'components/SoftTypography';
import IdReq from '../Requests/IdReq';
import TokensApi from '../API/TokensApi';
const TokenTypeSelector = ({setTokenType}) => {
    const [TokenTypeSearch, setTokenTypeSearch] = useState()

    const GetTokenTypes = async () => {
        let searchReq = new IdReq();

        searchReq.Name = TokenTypeSearch;
        let res = await TokensApi.GetTokenTypes(searchReq)
        if (res.status.success) {
            let optionsArr = [];
            res.data?.forEach((item) => {
                optionsArr.push({ value: item, label: item.name })
            })
            return optionsArr;
        }
        else {
            Swal.fire({
                title: 'Error',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }


    return (
        <div>
            <SoftTypography variant="button" fontWeight="regular" color="text">
             
                <AsyncSelect
                    loadOptions={GetTokenTypes}
                    onInputChange={setTokenTypeSearch}
                    onChange={(e) => {setTokenType(e.value)}}
                    placeholder="Search Token Types"
                />
            </SoftTypography>

        </div>
    )
}

export default TokenTypeSelector