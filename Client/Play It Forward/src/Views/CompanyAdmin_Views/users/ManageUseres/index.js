import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useState } from 'react'
import SearchUsersReq from '../../../../Requests/Users/SearchUsersReq'
import SearchUsers from './SearchUsers'

const index = () => {
    const [SearchReq, setSearchReq] = useState(new SearchUsersReq());
      return (
    <DashboardLayout>
    <DashboardNavbar />
<SearchUsers SearchReq={SearchReq} setSearchReq={setSearchReq}/>
    </DashboardLayout>
  )
}

export default index
