import Dashboard from "layouts/dashboard"
import Shop from "examples/Icons/Shop";

const UserRoutes = [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
    },
]

export default UserRoutes; 