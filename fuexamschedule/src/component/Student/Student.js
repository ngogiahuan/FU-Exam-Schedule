// import React from "react";
// import "./Student.css";
// import Sidebar from "../SideBar/SideBar";
// import StuExamCard from "../StudentCard/StuExamCard";
// import TableCalendar from "../Calander/TableCalendar";
// import ListOfStuExam from "../StudentCard/ListOfStuExam";

// const studentFeatures = ["View Exam Slot"];

// export default function Student() {
//   return (
//     <>
//       <Sidebar features={studentFeatures} content={<TableCalendar list={ListOfStuExam} content={StuExamCard}  />} />
//     </>
//   );
// }

import React from "react";
import Body from "../Body/Body";
import { useParams } from "react-router-dom";
import TableCalendar from "../Calander/TableCalendar";
import ListOfStuExam from "../StudentCard/ListOfStuExam";
import StuExamCard from "../StudentCard/StuExamCard";

const studentFeatures = [{ name: "View Exam Slot", path: "view-exam-slot" }];

const role = "student";

function Student() {
  const { feature } = useParams();

  let featureComponent;

  switch (feature) {
    case "view-exam-slot":
      featureComponent = (
        <TableCalendar list={ListOfStuExam} content={StuExamCard} />
      );
      break;
    default:
      featureComponent = null;
  }

  console.log(featureComponent);

  return (
    <Body features={studentFeatures} content={featureComponent} role={role} />
  );
}

export default Student;
