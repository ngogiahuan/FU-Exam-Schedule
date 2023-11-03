// import
import React from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Calendar from "views/Dashboard/Calendar.js";
import CreateExamRoom from "views/Dashboard/CreateExamRoom.js";
import ExamSlot from "views/Dashboard/ExamSlot.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";


import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";
import { CalendarIcon } from "@chakra-ui/icons";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Báo cáo",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Quản lí tài khoản",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/examRoom",
    name: "Phòng thi",
    icon: <CalendarIcon color="inherit" />,
    component: CreateExamRoom,
    layout: "/admin",
  },
  {
    path: "/examSlot",
    name: "Ca thi",
    icon: <CalendarIcon color="inherit" />,
    component: ExamSlot,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Lịch thi",
    icon: <CalendarIcon color="inherit" />,
    component: Calendar,
    layout: "/admin",
  },
  {
    name: "Tài Khoản",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Thông tin tài khoản",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        // component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Đăng nhập",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Đăng kí",
        icon: <RocketIcon color="inherit" />,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
