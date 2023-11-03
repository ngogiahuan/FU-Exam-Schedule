import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const ExamSlotContext = createContext();

export const ExamSlotProvider = ({ children }) => {
  const [examSlot, setExamSlot] = useState([]);
  const [loading, setLoading] = useState(true);
  const { flag } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://swp3191.onrender.com/examSlot', {
          withCredentials: true, 
        });
        setExamSlot(response?.data?.result);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [flag]);

  return (
    <ExamSlotContext.Provider value={{ examSlot, loadingExamSlot: loading }}>
      {children}
    </ExamSlotContext.Provider>
  );
};

export const useExamSlot = () => {
  const context = useContext(ExamSlotContext);
  if (!context) {
    throw new Error('useExamSlot must be used within an ExamSlotContextProvider');
  }
  return context;
};
