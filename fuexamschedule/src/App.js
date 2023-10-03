import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Welcome from './component/Welcome/Welcome';
import Student from './component/Student/Student';
import StuExamCard from './component/TestComponent/StuExamCard';

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/student' element={<Student />} />
      </Routes>
      <StuExamCard />
    </>
  );
}

export default App;