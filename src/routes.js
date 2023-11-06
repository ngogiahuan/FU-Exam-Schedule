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
import { CalendarIcon, HamburgerIcon } from "@chakra-ui/icons";
import Examiner from "views/Dashboard/Examiner";
var dashRoutes = [
  {
    name: "Dashboard",
    category: "account",
    state: "pageCollapse",
    views: [
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
        component: Examiner,
        layout: "/examiner",
      },
    ],
  },

  // TYPE Danh sách
  {
    name: "Danh Sách",
    category: "account",
    state: "pageCollapse",
    views: [
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
    ],
  },

  {
    name: "Tài Khoản",
    category: "account",
    state: "pageCollapse",
    views: [
      // {
      //   path: "/profile",
      //   name: "Thông tin cá nhân",
      //   icon: <PersonIcon color="inherit" />,
      //   secondaryNavbar: true,
      //   component: Profile,
      //   layout: "/admin",
      // },
      {
        path: "/signin",
        // name: "Đăng nhập",
        // icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        // name: "Đăng kí",
        // icon: <RocketIcon color="inherit" />,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
