// import
import React from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Calendar from "views/Dashboard/Calendar.js";
import CreateExamRoom from "views/Dashboard/CreateExamRoom.js";
import ExamSlot from "views/Dashboard/ExamSlot.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import { HomeIcon, StatsIcon, PersonIcon } from "components/Icons/Icons";
import { CalendarIcon, HamburgerIcon, ViewIcon } from "@chakra-ui/icons";
import Examiner from "views/Dashboard/Examiner";
import TableRegister from "views/Examiner/TableRegister.js";
import MyCurrentExamSchedule from "views/Examiner/MyCurrentExamSchedule";
import ViewSchedule from "views/Student/ViewSchedule";
import ViewDashboard from "views/TestingStaff/ViewDashBoard";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Báo cáo",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  // Route Examiner
  {
    path: "/registerExamSlot",
    name: "Đăng kí lịch coi thi",
    icon: <CalendarIcon color="inherit" />,
    component: TableRegister,
    layout: "/lecturer",
  },
  {
    path: "/calendar",
    name: "Danh sách lịch thi",
    icon: <CalendarIcon color="inherit" />,
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/examSlot",
    name: "Danh sách Ca thi",
    icon: <CalendarIcon color="inherit" />,
    component: ExamSlot,
    layout: "/admin",
  },
  {
    path: "/examRoom",
    name: "Danh sách phòng thi",
    icon: <CalendarIcon color="inherit" />,
    component: CreateExamRoom,
    layout: "/admin",
  },
  {
    path: "/examiner",
    name: "Danh sách giám thị",
    icon: <HamburgerIcon color="inherit" />,
    component: Examiner,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Danh sách tài khoản",
    icon: <HamburgerIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/getSalary",
    name: "Bảng lương cá nhân",
    icon: <ViewIcon color="inherit" />,
    component: MyCurrentExamSchedule,
    layout: "/lecturer",
  },

  {
    path: "/signin",
    name: "Đăng nhập",
    // icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
  },
  {
    path: "/signup",
    name: "Đăng kí",
    // icon: <RocketIcon color="inherit" />,
    component: SignUp,
    layout: "/auth",
  },

  // Student Route
  {
    path: "/viewSchedule",
    name: "Xem lịch thi",
    icon: <ViewIcon color="inherit" />,
    component: ViewSchedule,
    layout: "/student",
  },
  // Testing Staff
  {
    path: "/dashboard",
    name: "Xem báo cáo",
    icon: <HomeIcon color="inherit" />,
    component: ViewSchedule,
    layout: "/testingStaff",
  },
];
export default dashRoutes;
