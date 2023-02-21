import { useState, useEffect, useMemo, createContext } from "react";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "routes";
import CompanyRoutes from "CompanyRoutes";
import CompanyAdminRoutes from "CompanyAdminRoutes";
import UserRoutes from "UserRoutes";
import PublicRoutes from "PublicRoutes";
// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import UsersApi from "./API/UsersApi";
import "./App.scss";
import Loader from "ProjectComponents/Loader";
export const UserContext = createContext();

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [UserData, setUserData] = useState(null);
  const [RoutesState, setRoutesState] = useState(null);
  const [IsLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (UserData) {
      if (UserData.userType === "CompanyAdmin" || UserData.userType === "SuperAdmin") {
        setRoutesState(CompanyAdminRoutes);
      }
      else if (UserData.userType === "CompanyUser") {
        setRoutesState(CompanyRoutes);
      }
      else if (UserData.userType === "User") {
        setRoutesState(UserRoutes);
      }
      else {
        setRoutesState(PublicRoutes);
      }
    }
  }, [UserData]);

  useEffect(() => {
    async function fetchData() {
      let res = await UsersApi.GetCurrentUser();
      console.log(res.data);
      setUserData(res.data);
    }
    if (!UserData && user && !loading) {
      fetchData();
    }
    else if(!user && !loading){
      setUserData({});
    }
  }, [user, loading, UserData]);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };


  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
  });

  useEffect(() => {
    if (RoutesState && UserData) {
      setIsLoaded(true);
    }
    else{
      setIsLoaded(false);
    }
  }, [RoutesState, UserData]);

  if (!IsLoaded) {
    return <Loader />;
  }

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <UserContext.Provider value={UserData}>

          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={"dark"}
                brand={brand}
                brandName="Play It Forward"
                routes={RoutesState}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            {getRoutes(RoutesState)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </UserContext.Provider>

      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={UserData}>

        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={"dark"}
              brand={brand}
              brandName="Play It Forward"
              routes={RoutesState}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(RoutesState)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </UserContext.Provider>

    </ThemeProvider>
  );
}
