import { Card } from '@mui/material'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import SoftButton from 'components/SoftButton';
import React from 'react'

const CompanyInnerPageDetails = () => {
    let test = true;
  return (
    <DashboardLayout>
        <div className='CreateUsersDiv'>
        <Card id="CreateUserCard" style={{ padding: "10px 20px" }}>
        <SoftBox pt={3} px={2}>
            <SoftTypography variant="h6" fontWeight="medium">
              Companies Details
            </SoftTypography>
          </SoftBox>
          <SoftBox>
            <SoftBox py={2} style={{ borderBottom: "1px solid #ccc" }} px={2} display="flex" flexDirection={{ xs: "column", lg: "row" }}>


              <div className='name-phone'>
                <SoftBox
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ xs: "flex-start" }}
                  flexDirection={{ xs: "column" }}
                  mb={2}
                  className='CreateCompanyBox'
                >

                  <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                    Name
                  </SoftTypography>
                  <input type="text" className='CreateUserInput'  />

                </SoftBox>
                <SoftBox
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ xs: "flex-start" }}
                  flexDirection={{ xs: "column" }}
                  mb={2}
                  className='CreateCompanyBox'
                >

                  <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                    Phone
                  </SoftTypography>
                  <input type="text" className='CreateUserInput'   />

                </SoftBox>
              </div>




              <div className='email-logo'>
                <SoftBox
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ xs: "flex-start" }}
                  flexDirection={{ xs: "column" }}
                  mb={2}
                  className='CreateCompanyBox'
                >
                  <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                    Email
                  </SoftTypography>
                  <input type="text" className='CreateUserInput'   />
                </SoftBox>
                <SoftBox
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ xs: "flex-start" }}
                  flexDirection={{ xs: "column" }}
                  mb={2}
                  className='CreateCompanyBox'
                >
                  <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                    Logo
                  </SoftTypography>
                  <input id="LogoInput" type="file" className='CreateUserInput' />
                </SoftBox>
              </div>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Description
                </SoftTypography>
                <textarea rows={7}  />
              </SoftBox>
            </SoftBox>
            <SoftBox py={2} style={{ borderBottom: "1px solid #ccc" }} px={2} display="flex" flexDirection={{ xs: "column", lg: "row" }}>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >

                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Country
                </SoftTypography>
                <input type="text" className='CreateUserInput'   />

              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  City
                </SoftTypography>
                <input type="text" className='CreateUserInput'   />
              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Address
                </SoftTypography>
                <input type="text" className='CreateUserInput'   />
              </SoftBox>
            </SoftBox>
            <SoftBox py={2} style={{ borderBottom: "1px solid #ccc" }} px={2} display="flex" flexDirection={{ xs: "column", lg: "row" }}>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >

                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Zip
                </SoftTypography>
                <input type="text" className='CreateUserInput'   />

              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Website
                </SoftTypography>
                <input type="text" className='CreateUserInput'   />
              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Company TypeId
                </SoftTypography>
                <input type="text" className='CreateUserInput'  />
              </SoftBox>
            </SoftBox>
            <SoftBox py={2} style={{ borderBottom: "1px solid #ccc" }} px={2} display="flex" flexDirection={{ xs: "column", lg: "row" }}>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >

                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Use Limit
                </SoftTypography>
                <input type="number" className='CreateUserInput'  />

              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Token Limit
                </SoftTypography>
                <input type="number" className='CreateUserInput'   />
              </SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-around"
                alignItems={{ xs: "flex-start" }}
                flexDirection={{ xs: "column" }}
                mb={2}
                className='CreateCompanyBox'
              >
                <SoftTypography style={{ margin: " 5px" }} variant="button" fontWeight="medium" textTransform="capitalize">
                  Template Limit
                </SoftTypography>
                <input type="number" className='CreateUserInput'  />
              </SoftBox>

            </SoftBox>
            <SoftBox display="flex" justifyContent="space-around" alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }} mb={2} className='CreateCompanyBox' >
              <SoftButton variant="gradient" color="info" fullWidth  >
                Create Company
              </SoftButton>
            </SoftBox>
          </SoftBox>
            </Card>
        </div>
    </DashboardLayout>
  )
}

export default CompanyInnerPageDetails
