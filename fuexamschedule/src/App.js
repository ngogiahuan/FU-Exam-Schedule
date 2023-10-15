import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import Welcome from "./component/Welcome/Welcome";
import Student from "./component/Student/Student";
import Examiner from "./component/Examiner/Examiner";
import Admin from "./component/Admin/Admin";

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div className="main-content">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/student/:feature" element={<Student />} />
        <Route path="/examiner/:feature" element={<Examiner />} />
        <Route path="/admin/:feature" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
