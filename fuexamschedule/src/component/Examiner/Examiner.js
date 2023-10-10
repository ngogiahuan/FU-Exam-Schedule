import React from "react";

import "./Examiner.css";
import Sidebar from "../SideBar/SideBar";
import TableCalendar from "../Calander/TableCalendar";

const examinerFeatures = ["Regist Exam Slot", "Regist Exam Room"];


const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const month = 9;

export default function Examiner() {
  return <Sidebar features={examinerFeatures}  content={<TableCalendar />}/>;
}
