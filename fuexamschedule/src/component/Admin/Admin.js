import React from "react";
import Body from "../Body/Body";
import ManageStudent from "./ManageStudent";
import ManageRoom from "./ManageRoom";
import ManageExaminer from "./ManageExaminer";
import ManageExam from "./ManageExam";
import { useParams } from "react-router-dom";

const adminFeatures = [
  { name: "Manage Student", path: "manage-student" },
  { name: "Manage Room", path: "manage-room" },
  { name: "Manage Examiner", path: "manage-examiner" },
  { name: "Manage Exam", path: "manage-exam" },
];

const role = "admin";

function Admin() {
  const { feature } = useParams();

  let featureComponent;

  switch (feature) {
    case "manage-student":
      featureComponent = <ManageStudent />;
      break;
    case "manage-room":
      featureComponent = <ManageRoom />;
      break;
    case "manage-examiner":
      featureComponent = <ManageExaminer />;
      break;
    case "manage-exam":
      featureComponent = <ManageExam />;
      break;
    default:
      featureComponent = null;
  }

  return (
    <Body features={adminFeatures} content={featureComponent} role={role} />
  );
}

export default Admin;
