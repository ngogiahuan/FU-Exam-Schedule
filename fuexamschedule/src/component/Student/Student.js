import React from "react";
import "./Student.css";
import Sidebar from "../SideBar/SideBar";
import StuExamCard from "../StudentCard/StuExamCard";

const studentFeatures = ["View Exam Slot"];

export default function Student() {
  return (
    <>
      <Sidebar features={studentFeatures} content={<StuExamCard />} />
    </>
  );
}
