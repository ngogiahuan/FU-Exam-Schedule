import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import Welcome from "./component/Welcome/Welcome";
import Student from "./component/Student/Student";
import Footer from "./component/Footer/Footer";
import Examiner from "./component/Examiner/Examiner";
import Admin from "./component/Admin/Admin";
import ManageStudent from "./component/Admin/ManageStudent";
import ManageRoom from "./component/Admin/ManageRoom";
import ManageExaminer from "./component/Admin/ManageExaminer";
import ManageExam from "./component/Admin/ManageExam";

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div className="main-content">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/student/:feature" element={<Student />} />
        <Route path="/examiner" element={<Examiner />} />
        <Route path="/admin/:feature" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
