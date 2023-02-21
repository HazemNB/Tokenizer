import Dashboard from "Views/CompanyAdmin_Views/Dashboard"
import Shop from "examples/Icons/Shop";
import Login from "Views/Auth/Login";
import  CreateUseres from "Views/CompanyAdmin_Views/users/CreateUseres"
import ManageUseres from "Views/CompanyAdmin_Views/users/ManageUseres"
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
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Company Profile",
    key: "CompanyProfile",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  { type: "divider", title: "useres", key: "useres" },

    {
      type: "collapse",
      name: "Create Users",
      key: "createUser",
      route: "/createUsers",
      icon: <Shop size="12px" />,
      component: <CreateUseres />,
      noCollapse: true,
    },
   
    {
      type: "collapse",
      name: "Manage Users",
      key: "ManageUser",
      route: "/ManageUsers",
      icon: <Shop size="12px" />,
      component: <ManageUseres />,
      noCollapse: true,
    },
    { type: "divider", title: "Tokens", key: "Tokens" },
    {
      type: "collapse",
      name: "Create Templates",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create Tokens",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Manage Tokens",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    { type: "divider", title: "useres", key: "useres" },

    {
      type: "collapse",
      name: "Create Transactions",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Manage Transactions",
      key: "dashboard",
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