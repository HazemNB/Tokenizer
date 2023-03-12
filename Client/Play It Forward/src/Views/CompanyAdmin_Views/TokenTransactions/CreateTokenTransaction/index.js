import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import QrReader from 'react-qr-reader';

const index = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
        </DashboardLayout>
    )
}

export default index