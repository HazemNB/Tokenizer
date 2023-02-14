import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

import CreateUser from "Views/Users/CreateUser";
import ManageUsers from "Views/Users/ManageUsers";
import CreateCompanies from "Views/Companies/CreateCompanies"
import ManageCompanies from "Views/Companies/ManageCompanies"
import { FcConferenceCall, FcApprove, FcAddDatabase, FcGenealogy } from "react-icons/fc";
import Login from "Views/Auth/Login";
import PrivateRoute from "ProjectComponents/Auth/PrivateRoute";
import AdminRoute from "ProjectComponents/Auth/AdminRoute";
import ManageProjects from "Views/Projects/ManageProjects";
import ProjectDetails from "Views/Projects/ProjectDetails";
import MyProjects from "Views/Projects/MyProjects";
import TokenTypes from "Views/Tokens/TokenTypes";
import ExportTokens from "Views/Tokens/ExportTokens";
import TokenRedirect from "Views/Tokens/TokenRedirect";
import ReDiv from "Views/Tokens/TokenRedirect/ReDiv";
import Scans from "Views/Tokens/Scans";
const routes = [
  
  { type: "title", title: "Users", key: "Users", admin:true },
  {
    type: "collapse",
    name: "Create User",
    key: "createUser",
    route: "/CreateUser",
    icon: <FcApprove />,
    component: <AdminRoute><CreateUser/></AdminRoute>,
    // component: <CreateUser/>,
    noCollapse: true,
    admin: true,

  },
  {
    type: "collapse",
    name: "Manage Users",
    key: "manageUsers",
    route: "/ManageUsers",
    icon: <FcConferenceCall />,
    component: <AdminRoute><ManageUsers/></AdminRoute>,
    noCollapse: true,
    admin: true,
    
  },
  { type: "divider", title: "Companies", key: "Companies" },
  { type: "title", title: "Companies", key: "Companies" },
  {
    type: "collapse",
    name: "Create Companies",
    key: "createCompanies",
    route: "/CreateCompanies",
    icon: <FcAddDatabase />,
    component: <AdminRoute><CreateCompanies/></AdminRoute>,
    noCollapse: true,
    admin: true,

  },
  {
    type: "collapse",
    name: "Manage Companies",
    key: "manageCompanies",
    route: "/ManageCompanies",
    icon: <FcAddDatabase />,
    component: <AdminRoute><ManageCompanies/></AdminRoute>,
    noCollapse: true,
    admin: true,

  },
  {
    type: "collapse",
    name: "Manage Companies",
    key: "manageCompanies",
    route: "/ManageCompanies",
    icon: <FcAddDatabase />,
    component: <AdminRoute><ManageCompanies/></AdminRoute>,
    noCollapse: true,
    admin: true,

  },
  { type: "divider", title: "Projects", key: "Users" },
  { type: "title", title: "Projects", key: "Projects" },
  
  {
    type: "collapse",
    name: "Manage Projects",
    key: "manageProjects",
    route: "/ManageProjects",
    icon: <FcAddDatabase />,
    component: <AdminRoute><ManageProjects/></AdminRoute>,
    noCollapse: true,
    admin: true,

  },
 
  {
    type: "collapse",
    name: "My Projects",
    key: "myProjects",
    route: "/MyProjects",
    icon: <FcGenealogy/>,
    component: <PrivateRoute><MyProjects/></PrivateRoute>,
    noCollapse: true,

  },
  {
    type: "collapse",
    name: "Project Details",
    key: "projectDetails",
    route: "/Projects/Details",
    icon: <FcGenealogy/>,
    component: <PrivateRoute><ProjectDetails/></PrivateRoute>,
    noCollapse: true,
    hidden: true,
    
  },
  { type: "divider", title: "Projects", key: "Projects" },
  { type: "title", title: "Tokens", key: "Tokens" },

  {
    type: "collapse",
    name: "Token Types",
    key: "tokenTypes",
    route: "/TokenTypes",
    icon: <FcGenealogy/>,
    component: <PrivateRoute><TokenTypes/></PrivateRoute>,
    noCollapse: true,
    admin: true,
  },
  {
    route: "/Tokens/Export",
    name: "Export Tokens",
    icon: <FcGenealogy />,
    component: <PrivateRoute><ExportTokens/></PrivateRoute>,
    key: "ExportTokens",
    noCollapse: true,
    type: "collapse",
  },

  {
    route: "/Tokens/Scans",
    name: "Scans",
    icon: <FcGenealogy />,
    component: <PrivateRoute><Scans/></PrivateRoute>,
    key: "Scans",
    noCollapse: true,
    type: "collapse",
  },



  { type: "divider", title: "Tokens", key: "Tokens" },

  {
    route: "/tr/*",
    name: "Token Redirect",
    icon: <FcGenealogy />,
    component: <TokenRedirect/>,
    key: "TokenRedirect",
    noCollapse: true,
    type: "collapse",
    hidden: true
  },

  {
    route: "/rediv",
    name: "Rediv Redirect",
    icon: <FcGenealogy />,
    component: <ReDiv/>,
    key: "rediv",
    noCollapse: true,
    type: "collapse",
    hidden: true
  },

  {
    type: "collapse",
    name: "login",
    key: "login",
    route: "/login",
    component: <Login/>,
    noCollapse: true,
    hidden: true

  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <PrivateRoute><Dashboard /></PrivateRoute>,
    noCollapse: true,
    hidden: true,
  },
   ];

export default routes;
