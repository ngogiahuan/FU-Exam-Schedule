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
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./components/share/UserContext";
import { ExamScheduleProvider } from "./components/share/ExamScheduleContext";
import { CourseProvider } from "./components/share/CourseContext";
import { ExamRoomProvider } from "./components/share/ExamRoomContext";
import { ExamSlotProvider } from "./components/share/ExamSlotContext";
import { ClassRoomProvider } from "./components/share/ClassRoomContext";
import { ExaminerProvider } from "components/share/ExaminerContext";
import { AccountProvider } from "components/share/AccountContext";
import ExaminerLayout from "layouts/Examiner.js";
import StudentLayout from "layouts/Student.js";
import TestingStaff from "layouts/TestingStaff.js";
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
                        <Route path={`/lecturer`} component={ExaminerLayout} />
                        <Route path={`/student`} component={StudentLayout} />
                        <Route
                          path={`/testingStaff`}
                          component={TestingStaff}
                        />

                        <Redirect
                          from={`/`}
                          to={
                            localStorage.getItem("isLogin") === true
                              ? "/admin/dashboard"
                              : "auth/signin"
                          }
                        />
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
