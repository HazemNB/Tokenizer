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

import { FaAirbnb,FaHive,FaAccusoft,FaGuilded,FaGripfire ,FaBlogger} from "react-icons/fa";
import {GrAttachment ,GrBraille} from "react-icons/gr"
import CreateUser from "Views/Users/CreateUser";
import ManageUsers from "Views/Users/ManageUsers";
import CreateCompanies from "Views/Companies/CreateCompanies/CreateCompanies";
import ManageCompanies from "Views/Companies/ManageCompanies";
import CompanyTypes from "Views/Companies/CompanyTypes"
import { FcConferenceCall, FcApprove,FcManager, FcAddDatabase, FcGenealogy } from "react-icons/fc";
import {GiAbstract030} from "react-icons/gi";
import Login from "Views/Auth/Login";
import PrivateRoute from "ProjectComponents/Auth/PrivateRoute";
import AdminRoute from "ProjectComponents/Auth/AdminRoute";
import ManageProjects from "Views/Projects/ManageProjects";
import ProjectDetails from "Views/Projects/ProjectDetails";
import CompaniesDetails from "Views/Companies/CompaniesDetails/index";
import MyProjects from "Views/Projects/MyProjects";
import ManageTokens from "Views/Tokens/ManageTokens";
import ManageTemplates from "Views/Templates/ManageTemplates"
import TokenTypes from "Views/Tokens/TokenTypes";
import ExportTokens from "Views/Tokens/ExportTokens";
import TokenRedirect from "Views/Tokens/TokenRedirect";
import ReDiv from "Views/Tokens/TokenRedirect/ReDiv";
import Scans from "Views/Tokens/Scans";
import { FiFile,FiActivity,FiFastForward,FiFolderMinus } from "react-icons/fi";

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
    icon: <FaAccusoft />,
    component: <AdminRoute><CreateCompanies/></AdminRoute>,
    noCollapse: true,
    admin: true,

  },
  
  {
    type: "collapse",
    name: "Manage Companies",
    key: "manageCompanies",
    route: "/ManageCompanies",
    icon: <FiFastForward />,
    component: <AdminRoute><ManageCompanies/></AdminRoute>,
    noCollapse: true,
    admin: true,

  },
  {
    type: "collapse",
    name: "Company Types",
    key: "Company Types",
    route: "/Companies/CompanyTypes",
    icon: <FiActivity/>,
    component: <PrivateRoute><CompanyTypes/></PrivateRoute>,
    noCollapse: true,
    admin: true,
    
  },
  // {
  //   type: "collapse",
  //   name: "Company Details",
  //   key: "CompanyDetails",
  //   route: "/Companies/Details",
  //   icon: <FcGenealogy/>,
  //   component: <PrivateRoute><CompaniesDetails/></PrivateRoute>,
  //   noCollapse: true,
  //   hidden: true,
    
  // },
  {
    type: "collapse",
    name: "Companies Details",
    key: "CompaniesDetails",
    route: "/Companies/Details",
    icon: <FcGenealogy/>,
    component: <PrivateRoute><CompaniesDetails/></PrivateRoute>,
    noCollapse: true,
    hidden: true,
    
  },
  
  { type: "divider", title: "Projects", key: "Users" },
  { type: "title", title: "Projects", key: "Projects" },
  
  {
    type: "collapse",
    name: "Manage Projects",
    key: "manageProjects",
    route: "/ManageProjects",
    icon: <FiFolderMinus />,
    component: <AdminRoute><ManageProjects/></AdminRoute>,
    noCollapse: true,
    admin: true,

  },
 
  {
    type: "collapse",
    name: "My Projects",
    key: "myProjects",
    route: "/MyProjects",
    icon: <FiFile/>,
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
    name: "Manage Tokens",
    key: "manageTokens",
    route: "/ManageTokens",
    icon: <FaGripfire/>,
    component: <PrivateRoute><ManageTokens/></PrivateRoute>,
    noCollapse: true,
    admin: true,
  },
  {
    type: "collapse",
    name: "Manage Templates",
    key: "manageTemplates",
    route: "/ManageTemplates",
    icon: <FaHive/>,
    component: <PrivateRoute><ManageTemplates/></PrivateRoute>,
    noCollapse: true,
    admin: true,
  },
  {
    type: "collapse",
    name: "Token Types",
    key: "tokenTypes",
    route: "/TokenTypes",
    icon: <GiAbstract030/>,
    component: <PrivateRoute><TokenTypes/></PrivateRoute>,
    noCollapse: true,
    admin: true,
  },

  {
    route: "/Tokens/Export",
    name: "Export Tokens",
    icon: <FaAirbnb />,
    component: <PrivateRoute><ExportTokens/></PrivateRoute>,
    key: "ExportTokens",
    noCollapse: true,
    type: "collapse",
  },

  {
    route: "/Tokens/Scans",
    name: "Scans",
    icon: <FaBlogger />,
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
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
    hidden:true,
  },
   ];

export default routes;
