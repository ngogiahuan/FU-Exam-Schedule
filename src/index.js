import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { createContext, userContext } from "react";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js"; // Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./components/share/UserContext";
import { ExamScheduleProvider } from "./components/share/ExamScheduleContext";
import { CourseProvider } from "./components/share/CourseContext";
import { ExamRoomProvider } from "./components/share/ExamRoomContext";
import { ExamSlotProvider } from "./components/share/ExamSlotContext";
import { ClassRoomProvider } from "./components/share/ClassRoomContext";
import { ExaminerProvider } from "components/share/ExaminerContext";
import { AccountProvider } from "components/share/AccountContext";

// Custom Chakra theme
import theme from "theme/theme.js";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <UserProvider>
      <CourseProvider>
        <ExamRoomProvider>
          <ExamSlotProvider>
            <ExamScheduleProvider>
              <ClassRoomProvider>
                <ExaminerProvider>
                  <AccountProvider>
                    <HashRouter>
                      <Switch>
                        <Route path={`/auth`} component={AuthLayout} />
                        <Route path={`/admin`} component={AdminLayout} />
                        <Route path={`/rtl`} component={RTLLayout} />
                        <Redirect from={`/`} to="/admin/dashboard" />
                      </Switch>
                    </HashRouter>
                  </AccountProvider>
                </ExaminerProvider>
              </ClassRoomProvider>
            </ExamScheduleProvider>
          </ExamSlotProvider>
        </ExamRoomProvider>
      </CourseProvider>
    </UserProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
