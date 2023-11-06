import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const { flag, URL } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/auth/get-account`, {
          withCredentials: true, 
        });
        setAccount(response?.data?.result);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [flag]);

  return (
    <AccountContext.Provider value={{ account, loadingAccount: loading }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountContextProvider');
  }
  return context;
};
