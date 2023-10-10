import React from "react";
import Sidebar from "./SideBar";

const adminFeatures = [
  "Manage Student",
  "Manage Room",
  "Manage Examiner",
  "Manage Exam",
];

function AdminSidebar() {
  return <Sidebar features={adminFeatures} />;
}

export default AdminSidebar;
