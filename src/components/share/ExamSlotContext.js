import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

const ExamSlotContext = createContext();

export const ExamSlotProvider = ({ children }) => {
  const [examSlot, setExamSlot] = useState([]);
  const [loading, setLoading] = useState(true);
  const { flag, URL } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/examSlot`, {
          withCredentials: true,
        });
        // sort by date
        const dataSortExamSlot = response?.data?.result.sort(
          (a, b) => b.examBatchID - a.examBatchID
        );
        setExamSlot(dataSortExamSlot);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
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
    throw new Error(
      "useExamSlot must be used within an ExamSlotContextProvider"
    );
  }
  return context;
};
