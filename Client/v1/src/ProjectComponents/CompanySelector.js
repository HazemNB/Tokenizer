import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async';
import Swal from 'sweetalert2';
import UsersApi from '../API/UsersApi';
import SearchUsersReq from '../Requests/Users/SearchUsersReq';
import SoftTypography from 'components/SoftTypography';
const CompanySelector = ({setCompany}) => {
    const [UsersSearch, setUserSearch] = useState()

    const GetUsers = async () => {
        let searchReq = new SearchUsersReq();
        searchReq.userType = "company"
        searchReq.name = UsersSearch;
        let res = await UsersApi.SearchUsers(searchReq)
        if (res.status.success) {
            let optionsArr = [];
            res.data.list.forEach((item) => {
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
                    loadOptions={GetUsers}
                    onInputChange={setUserSearch}
                    onChange={(e) => {setCompany(e.value)}}
                    placeholder="Search for Company"
                />
            </SoftTypography>

        </div>
    )
}

export default CompanySelector