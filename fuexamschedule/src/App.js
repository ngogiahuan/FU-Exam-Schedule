import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import Welcome from "./component/Welcome/Welcome";
import Student from "./component/Student/Student";
import Footer from "./component/Footer/Footer";

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div className="main-content">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/student" element={<Student />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
