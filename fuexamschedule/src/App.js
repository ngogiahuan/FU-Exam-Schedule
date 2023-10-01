import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Welcome from './component/Welcome/Welcome';
import Student from './component/Student/Student';


function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<Welcome />} />
        {user ? (
          <Route path='/student' element={<Student />} />
        ) : (
          <Route path='/' element={<Welcome />} />
        )}
      </Routes>
    </>
  );
}

export default App;
