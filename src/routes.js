// import
import React from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
/*
Import Icon
*/
import { HomeIcon } from "components/Icons/Icons";
import { CalendarIcon, HamburgerIcon, ViewIcon } from "@chakra-ui/icons";
import { AiOutlineTable } from "react-icons/ai";
import Examiner from "views/Dashboard/Examiner";
import TableRegister from "views/Examiner/TableRegister.js";
import MyCurrentExamSchedule from "views/Examiner/MyCurrentExamSchedule";
import ViewSchedule from "views/Student/ViewSchedule";
import ListExamSchedulerComponent from "views/Admin/listExamScheduler";
import DetailExamRoomComponent from "views/Admin/detailExamRoom";
import ViewAllScheduler from "views/Admin/listExamSlot";
import ListAccountComponent from "views/Admin/listAccount";

var dashRoutes = [
  /*
  Admin Route
  */
  // {
  //   path: "/dashboard",
  //   name: "Báo cáo",
  //   icon: <HomeIcon color="inherit" />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/listExamScheduler",
    name: "Danh sách ca thi",
    icon: <AiOutlineTable color="inherit" />,
    component: ListExamSchedulerComponent,
    layout: "/admin",
  },
  {
    path: "/detaiExamRoom/:id",
    component: DetailExamRoomComponent,
    layout: "/admin",
  },
  {
    path: "/examRoom",
    name: "Danh sách lịch thi",
    icon: <CalendarIcon color="inherit" />,
    component: ViewAllScheduler,
    layout: "/admin",
  },
  {
    path: "/listAccount",
    name: "Danh sách tài khoản",
    icon: <HamburgerIcon color="inherit" />,
    component: ListAccountComponent,
    layout: "/admin",
  },
  {
    path: "/examiner",
    name: "Danh sách giám thị",
    icon: <HamburgerIcon color="inherit" />,
    component: Examiner,
    layout: "/admin",
  },
  /*
 Route Examiner
  */
  {
    path: "/registerExamSlot",
    name: "Đăng kí lịch coi thi",
    icon: <CalendarIcon color="inherit" />,
    component: TableRegister,
    layout: "/lecturer",
  },

  {
    path: "/getViewExamSlot",
    name: "Danh sách ca thi",
    icon: <CalendarIcon color="inherit" />,
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
