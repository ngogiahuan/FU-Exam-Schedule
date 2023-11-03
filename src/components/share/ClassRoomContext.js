import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const ClassRoomContext = createContext();

export const ClassRoomProvider = ({ children }) => {
  const [classRoom, setClassRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const { flag } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://swp3191.onrender.com/classroom', {
          withCredentials: true, 
        });
        setClassRoom(response?.data?.result);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [flag]);

  return (
    <ClassRoomContext.Provider value={{ classRoom, loadingClassRoom: loading }}>
      {children}
    </ClassRoomContext.Provider>
  );
};

export const useClassRoom = () => {
  const context = useContext(ClassRoomContext);
  if (!context) {
    throw new Error('useClassRoom must be used within an ClassRoomContextProvider');
  }
  return context;
};
