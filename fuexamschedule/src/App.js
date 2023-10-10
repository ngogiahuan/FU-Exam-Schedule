import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Welcome from './component/Welcome/Welcome';
import Student from './component/Student/Student';
import Footer from './component/Footer/Footer';
import CalendarTest from './component/Calander/CalendarTest';

function App() {
  const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));
  
  
  const currentDate = new Date(); // You can customize this to display a specific month
  const year = currentDate.getFullYear();
  const month = 9;
    // Example notes object
    const notes = {
      '2023-10-08': 'Meeting at 3 PM',
      '2023-10-15': 'Buy groceries',
      // Add more notes as needed
    };
  return (
      <div className="main-content">
        <Navbar />
          {/* <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/student' element={<Student />} />
          </Routes> */}
          <CalendarTest year={year} month={month}/>
        <Footer />
      </div>  
  );
}

export default App;