import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const { flag, URL } = useUser();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${URL}/course`, {
          withCredentials: true,
        });
        setCourse(response?.data?.result);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [flag]);

  return (
    <CourseContext.Provider value={{ course, loadingCourse: loading }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within an CourseContextProvider");
  }
  return context;
};
