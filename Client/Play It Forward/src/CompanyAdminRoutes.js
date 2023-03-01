import Dashboard from "Views/CompanyAdmin_Views/Dashboard"
import Shop from "examples/Icons/Shop";
import Login from "Views/Auth/Login";
import  CreateUseres from "Views/CompanyAdmin_Views/users/CreateUseres"
import ManageUseres from "Views/CompanyAdmin_Views/users/ManageUseres"
import MyAccount from "Views/Shared/MyAccount"
import CreateTemplates from "Views/CompanyAdmin_Views/Templates/CreateTemplates"
import CreateTokens from "Views/CompanyAdmin_Views/Tokens/CreateTokens";
import CompanyProfile from "Views/CompanyAdmin_Views/CompanyProfile";
import EditTemplate from "Views/CompanyAdmin_Views/Templates/EditTemplate";
import ManageTokens from "Views/CompanyAdmin_Views/Tokens/ManageTokens";
import TokensDetails from "Views/CompanyAdmin_Views/Tokens/TokensDetails"
import CreateTokenTransaction from "Views/CompanyAdmin_Views/TokenTransactions/CreateTokenTransaction"
const CompanyAdminRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  { type: "divider", title: "profile", key: "profile" },
  {
    type: "collapse",
    name: "My Account",
    key: "MyAccount",
    route: "/MyAccount",
    icon: <Shop size="12px" />,
    component: <MyAccount />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Company Profile",
    key: "companyProfile",
    route: "/CompanyProfile",
    icon: <Shop size="12px" />,
    component: <CompanyProfile />,
    noCollapse: true,
  },
  { type: "divider", title: "useres", key: "useres" },

    {
      type: "collapse",
      name: "Create Users",
      key: "createUsers",
      route: "/createUsers",
      icon: <Shop size="12px" />,
      component: <CreateUseres />,
      noCollapse: true,
    },
   
    {
      type: "collapse",
      name: "Manage Users",
      key: "ManageUsers",
      route: "/ManageUsers",
      icon: <Shop size="12px" />,
      component: <ManageUseres />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit Template",
      key: "EditTemplate",
      route: "/Template/Details",
      icon: <Shop size="12px" />,
      component: <EditTemplate />,
      noCollapse: true,
      hidden: true,
    },
    {
      type: "collapse",
      name: "Tokens Details",
      key: "TokensDetails",
      route: "Tokens/Details",
      icon: <Shop size="12px" />,
      component: <TokensDetails />,
      noCollapse: true,
      hidden: true,
    },
 
    { type: "divider", title: "Tokens", key: "Tokens" },
    {
      type: "collapse",
      name: "Create Templates",
      key: "createTemplates",
      route: "/createTemplates",
      icon: <Shop size="12px" />,
      component: <CreateTemplates />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create Tokens",
      key: "CreateTokens",
      route: "/CreateTokens",
      icon: <Shop size="12px" />,
      component: <CreateTokens />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Manage Tokens",
      key: "manageTokens",
      route: "/ManageTokens",
      icon: <Shop size="12px" />,
      component: <ManageTokens />,
      noCollapse: true,
    },
    { type: "divider", title: "useres", key: "useres" },

    {
      type: "collapse",
      name: "Create Transactions",
      key: "createTransaction",
      route: "/CreateTokenTransaction",
      icon: <Shop size="12px" />,
      component: <CreateTokenTransaction/>,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Manage Transactions",
      key: "manageTransactions",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Login",
      key: "login",
      route: "/login",
      icon: <Shop size="12px" />,
      component: <Login />,
      noCollapse: true,
      hidden: true,
    }
]

export default CompanyAdminRoutes; 