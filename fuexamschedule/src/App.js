import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Welcome from './component/Welcome/Welcome';
import Student from './component/Student/Student';
import CalendarTest from './component/TestComponent/CalendarTest';

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

  return (
    <>
      <Navbar />
      {/* <Routes>
        <Route path='/' element={userProfile ? <Student /> : <Welcome />} />
      </Routes> */}
    </>
  );
}

export default App;