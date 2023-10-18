// import
import React, { Component } from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
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
    // component: Dashboard,
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
    path: "/billing",
    name: "Lịch thi",
    icon: <CalendarIcon color="inherit" />,
    // component: Billing,
    layout: "/admin",
  },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
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
