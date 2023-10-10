import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import Welcome from "./component/Welcome/Welcome";
import Student from "./component/Student/Student";

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div className="main-content">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </div>
  );
}

export default App;
