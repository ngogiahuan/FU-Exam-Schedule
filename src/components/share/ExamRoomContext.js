import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const ExamRoomContext = createContext();

export const ExamRoomProvider = ({ children }) => {
  const [examRoom, setExamRoom] = useState([]);
  const [subjectID, setSubjectID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [examSlotID, setExamSlotID] = useState("");
  const [loading, setLoading] = useState(true);
  const { flag, URL } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/examRoom`, {
          withCredentials: true, 
        });
        setExamRoom(response?.data?.result);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [flag]);

  return (
    <ExamRoomContext.Provider value={{ examRoom, loadingExamRoom: loading, subjectID, setSubjectID, subjectName, setSubjectName, examSlotID, setExamSlotID }}>
      {children}
    </ExamRoomContext.Provider>
  );
};

export const useExamRoom = () => {
  const context = useContext(ExamRoomContext);
  if (!context) {
    throw new Error('useExamRoom must be used within an ExamRoomContextProvider');
  }
  return context;
};
