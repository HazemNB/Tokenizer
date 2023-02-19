import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async';
import Swal from 'sweetalert2';
import SoftTypography from 'components/SoftTypography';
import SearchProjectsReq from '../Requests/Projects/SearchProjectsReq';
import ProjectsApi from '../API/ProjectsApi';
const ProjectSelector = ({setProject}) => {
    const [ProjectsSearch, setProjectSearch] = useState()

    const GetProjects = async () => {
        let searchReq = new SearchProjectsReq();

        searchReq.name = ProjectsSearch;
        let res = await ProjectsApi.SearchProjects(searchReq)
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
                    loadOptions={GetProjects}
                    onInputChange={setProjectSearch}
                    onChange={(e) => {setProject(e.value)}}
                    placeholder="Search for project"
                />
            </SoftTypography>

        </div>
    )
}

export default ProjectSelector