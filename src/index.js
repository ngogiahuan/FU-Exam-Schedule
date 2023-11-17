import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import { createContext, userContext } from "react";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js"; // Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./components/share/UserContext";
import { ExamScheduleProvider } from "./components/share/ExamScheduleContext";
import { CourseProvider } from "./components/share/CourseContext";
// Custom Chakra theme
import theme from "theme/theme.js";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <UserProvider>
      <CourseProvider>
        <ExamScheduleProvider>
          <BrowserRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Route path={`/rtl`} component={RTLLayout} />
              <Redirect
                from={`/`}
                to={
                  localStorage.getItem("isLogin") === true
                    ? "/admin/dashboard"
                    : "auth/signin"
                }
              />
            </Switch>
          </BrowserRouter>
        </ExamScheduleProvider>
      </CourseProvider>
    </UserProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
