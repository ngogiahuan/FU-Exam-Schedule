import React from "react";
import { useParams } from "react-router-dom";
import "./Student.css";
import StuExamCard from "../StudentCard/StuExamCard";
import TableCalendar from "../Calander/TableCalendar";
import ListOfStuExam from "../StudentCard/ListOfStuExam";
import Body from "../Body/Body";

const studentFeatures  = [
  { name: "View Exam Schedule", path: "view-exam-schedule" },
];

const role = "student";

export default function Student() {
  const { feature } = useParams();

  let featureComponent;

  switch (feature) {
    case "view-exam-schedule":
      featureComponent = (<TableCalendar list={ListOfStuExam} content={StuExamCard} />);
      break;
    default:
      featureComponent = null;
  }

  return (
    <Body features={studentFeatures} content={featureComponent} role={role} />
  );
}
