import Dashboard from "layouts/dashboard"
import Shop from "examples/Icons/Shop";
import MyAccount from "Views/Shared/MyAccount"
import Companies from "Views/UserViews/Companies"

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
  { type: "divider", title: "profile", key: "profile" },
  {
    type: "collapse",
    name: "Companies",
    key: "Companies",
    route: "/Companies",
    icon: <Shop size="12px" />,
    component: <Companies />,
    noCollapse: true,
  },
]

export default UserRoutes; 