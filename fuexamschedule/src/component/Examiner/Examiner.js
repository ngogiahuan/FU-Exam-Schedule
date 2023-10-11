import React from "react";
import { useParams } from "react-router-dom";
import "./Examiner.css";
import TableCalendar from "../Calander/TableCalendar";
import ListOfExamSlot from "../CardSchedule/ListOfExamSlot";
import CardSchedule from "../CardSchedule/CardSchedule";
import Body from "../Body/Body";

const examinerFeatures = [
  { name: "Regiter Exam Slot", path: "register-exam-slot" },
  { name: "View Exam Schedule", path: "view-exam-schedule" },
];

const role = "examiner";

export default function Examiner() {
  const { feature } = useParams();

  let featureComponent;

  switch (feature) {
    case "register-exam-slot":
      featureComponent = null;
      break;
    case "view-exam-schedule":
      featureComponent = (
        <TableCalendar list={ListOfExamSlot} content={CardSchedule} />
      );
      break;
    default:
      featureComponent = null;
  }

  // Assuming ListOfExamSlot is an array of data, pass it as a prop to TableCalendar
  return (
    <Body features={examinerFeatures} content={featureComponent} role={role} />
  );
}
