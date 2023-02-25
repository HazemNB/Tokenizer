import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async';
import Swal from 'sweetalert2';
import SoftTypography from 'components/SoftTypography';
import IdReq from '../../Requests/IdReq';
import TokensApi from '../../API/TokensApi';
import CompaniesApi from '../../API/CompaniesApi';
const CompanyTypeSelector = ({setCompanyType}) => {
    const [CompanyTypeSearch, setCompanyTypeSearch] = useState()

    const GetCompanyTypes = async () => {
        let searchReq = new IdReq();

        searchReq.Name = CompanyTypeSearch;
        let res = await CompaniesApi.SearchCompanyType(searchReq);
        console.log(res)
        if (res.status.success) {
            let optionsArr = [];
            res.data?.list.forEach((item) => {
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
            <SoftTypography variant="button" fontWeight="regular" color="text" width="500px">
             
                <AsyncSelect  
                    loadOptions={GetCompanyTypes}
                    onInputChange={setCompanyTypeSearch}
                    onChange={(e) => {setCompanyType(e.value)}}
                    placeholder="Search Company Types"
                />
            </SoftTypography>

        </div>
    )
}

export default CompanyTypeSelector