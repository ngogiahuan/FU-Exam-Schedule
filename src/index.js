import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// Interceptor
import withAuthProtection from "interceptor/isAuthenticated";
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
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import withAuthProtectionStudent from "interceptor/isAuthProtectionStudent";
import withAuthProtectionLecturer from "interceptor/isAuthProtectionLecturer";
const ProtectedComponent = withAuthProtection(AdminLayout);
const ProtectedLecturerComponent = withAuthProtectionLecturer(ExaminerLayout);
const ProtectedStudentComponent = withAuthProtectionStudent(StudentLayout);
ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <PrimeReactProvider>
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
                          <Route
                            path={`/admin`}
                            component={ProtectedComponent}
                          />
                          <Route
                            path={`/lecturer`}
                            component={ProtectedLecturerComponent}
                          />
                          <Route
                            path={`/student`}
                            component={ProtectedStudentComponent}
                          />
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
    </PrimeReactProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
