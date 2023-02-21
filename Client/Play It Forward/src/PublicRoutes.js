import Dashboard from "layouts/dashboard"
import Shop from "examples/Icons/Shop";
import Login from "Views/Auth/Login";

const UserRoutes = [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
      hidden: true,
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

export default UserRoutes; 