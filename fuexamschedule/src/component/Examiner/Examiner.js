import React from "react";
import "./Examiner.css";
import Sidebar from "../SideBar/SideBar";
import TableCalendar from "../Calander/TableCalendar";
import ListOfExamSlot from "../CardSchedule/ListOfExamSlot";
import CardSchedule from "../CardSchedule/CardSchedule";

const examinerFeatures = ["Regist Exam Slot", "Regist Exam Room"];

export default function Examiner() {
  // Assuming ListOfExamSlot is an array of data, pass it as a prop to TableCalendar
  return (
    <Sidebar
      features={examinerFeatures}
      content={<TableCalendar list={ListOfExamSlot} content={CardSchedule} />}
    />
  );
}
