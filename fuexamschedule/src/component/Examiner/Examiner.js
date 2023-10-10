import React from "react";

import "./Examiner.css";
import Sidebar from "../SideBar/SideBar";

const examinerFeatures = ["Regist Exam Slot", "Regist Exam Room"];

export default function Examiner() {
  return <Sidebar features={examinerFeatures} />;
}
