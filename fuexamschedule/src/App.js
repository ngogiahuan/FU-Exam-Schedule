import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import Welcome from "./component/Welcome/Welcome";
import Student from "./component/Student/Student";
import Footer from "./component/Footer/Footer";
import Examiner from "./component/Examiner/Examiner";

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div className="main-content">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/student" element={<Student />} />
        <Route path="/examiner" element={<Examiner />} />
      </Routes>
    </div>
  );
}

export default App;
