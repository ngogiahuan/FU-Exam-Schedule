import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Welcome from './component/Welcome/Welcome';
import Student from './component/Student/Student';

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={userProfile ? <Welcome /> : <Student />} />
      </Routes>
    </>
  );
}

export default App;