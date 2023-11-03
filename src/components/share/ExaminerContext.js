import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const ExaminerContext = createContext();

export const ExaminerProvider = ({ children }) => {
  const [examiner, setExaminer] = useState([]);
  const [loading, setLoading] = useState(true);
  const { flag } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://swp3191.onrender.com/examiner', {
          withCredentials: true, 
        });
        setExaminer(response?.data?.result);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [flag]);

  return (
    <ExaminerContext.Provider value={{ examiner, loadingExaminer: loading }}>
      {children}
    </ExaminerContext.Provider>
  );
};

export const useExaminer = () => {
  const context = useContext(ExaminerContext);
  if (!context) {
    throw new Error('useExaminer must be used within an ExaminerContextProvider');
  }
  return context;
};
