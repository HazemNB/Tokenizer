import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import typography from "assets/theme/base/typography";

import { useContext } from "react";
import { UserContext } from "App";
function Dashboard() {
  const user  = useContext(UserContext);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
        <h1>
          Hello {user?.name}! And welcome to your PIF Dashboard!
        </h1>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
