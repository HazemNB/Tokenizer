import Dashboard from "Views/CompanyAdmin_Views/Dashboard"
import Shop from "examples/Icons/Shop";
import Login from "Views/Auth/Login";


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
    {
      type: "collapse",
      name: "Profile",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Users",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Templates",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Tokens",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    
    {
      type: "collapse",
      name: "Transactions",
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