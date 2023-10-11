import React from "react";
import "./Student.css";
import Sidebar from "../SideBar/SideBar";
import StuExamCard from "../StudentCard/StuExamCard";
import TableCalendar from "../Calander/TableCalendar";
import ListOfStuExam from "../StudentCard/ListOfStuExam";

const studentFeatures = ["View Exam Slot"];

export default function Student() {
  return (
    <>
      <Sidebar features={studentFeatures} content={<TableCalendar list={ListOfStuExam} content={StuExamCard}  />} />
    </>
  );
}
