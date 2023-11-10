// ExamScheduleContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const ExamScheduleContext = createContext();

export const ExamScheduleProvider = ({ children }) => {
  const [examSchedule, setExamSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const { flag, URL } = useUser();

  useEffect(() => {
    const fetchExamScheduleData = async () => {
      try {
        const response = await axios.get(`${URL}/exam-schedule`, {
          withCredentials: true,
        });
        setExamSchedule(response?.data?.result);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    console.log("Flag: ", flag);
    fetchExamScheduleData();
  }, [flag]);

  return (
    <ExamScheduleContext.Provider value={{ examSchedule, loading }}>
      {children}
    </ExamScheduleContext.Provider>
  );
};

export const useExamSchedule = () => {
  const context = useContext(ExamScheduleContext);
  if (!context) {
    throw new Error('useExamSchedule must be used within an ExamScheduleProvider');
  }
  return context;
};
