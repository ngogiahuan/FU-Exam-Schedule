/*
  Prime React
*/
import { MegaMenu } from "primereact/megamenu";
// Chakra imports
import {
  Portal,
  useDisclosure,
  Box,
  useColorMode,
  Button,
  useToast,
} from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
// Layout components
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
// Custom Chakra theme
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "assets/img/bg-sukien.png";
import logo from "../assets/img/logo/logo-no-text-nobg.png";
import { useUser } from "components/share/UserContext";

export default function Dashboard(props) {
  const toast = useToast();
  const { user, login, logout, flag, setFlag } = useUser();
  const { ...rest } = props;
  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/student/viewSchedule";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = null;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/student") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  /*  
    Custome Menu
  */
  const items = [
    {
      label: "Xem lịch thi",
    },
    {
      label: (
        <Button
          onClick={() => {
            logout();
            toast({
              status: "success",
              position: "top",
              duration: "5000",
              isClosable: true,
              title: "Đăng xuất",
              description: "Bạn đăng xuất thành công",
            });
            window.location.reload();
          }}
        >
          Đăng xuất
        </Button>
      ),
    },
  ];
  return (
    <Box w="100%" overflowX="hidden">
      <Box
        minH="100vh"
        w="100%"
        position="absolute"
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize="cover"
        top="0"
      />
      <Box d="flex" flexDirection="column" h="100vh" overflow="hidden">
        {/* Fixed Navbar */}
        <MegaMenu
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 1000, // Adjust the z-index as needed
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          model={items}
          orientation="horizontal"
          breakpoint="960px"
        />

        {/* Main Content */}
        <MainPanel
          w={{
            base: "100%",
            xl: "calc(100% - 100px)", // Adjust the width accounting for the fixed navbar
          }}
        >
          {getRoute() ? (
            <PanelContent>
              <PanelContainer>
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="/admin" to="/student/viewSchedule" />
                </Switch>
              </PanelContainer>
            </PanelContent>
          ) : (
            <Redirect from="/admin" to="/student/viewSchedule" />
          )}
          <Portal>
            <FixedPlugin
              secondary={getActiveNavbar(routes)}
              fixed={fixed}
              onOpen={onOpen}
            />
          </Portal>
          <Configurator
            secondary={getActiveNavbar(routes)}
            isOpen={isOpen}
            onClose={onClose}
            isChecked={fixed}
            onSwitch={(value) => {
              setFixed(value);
            }}
          />
        </MainPanel>
      </Box>
    </Box>
  );
}
