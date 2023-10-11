import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import "./TableCalendar.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const TableCalendar = ({list, content: ContentComponent }) => {
  const [notes, setNotes] = useState({});
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0); // Initialize with January
  const [selectedSemester, setSelectedSemester] = useState("SPRING"); // Initialize with SPRING

  const firstDay = new Date(new Date().getFullYear(), selectedMonth, 1);
  const startingDay = firstDay.getDay();
  const lastDay = new Date(new Date().getFullYear(), selectedMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const totalWeeks = Math.ceil((totalDays + startingDay) / 7);

  // Use an effect to update the currentWeek when the selectedWeek changes
  useEffect(() => {
    setCurrentWeek(selectedWeek);
  }, [selectedWeek]);

  // Use an effect to update the selectedMonth when the selectedSemester changes
  useEffect(() => {
    // Find the first month of the selected semester
    const monthsInSelectedSemester = semesters[selectedSemester];
    if (monthsInSelectedSemester) {
      setSelectedMonth(monthsInSelectedSemester[0]);
    }
  }, [selectedSemester]);

  const startDay = currentWeek * 7 - startingDay + 1;
  const endDay = startDay + 6;

  const handleNoteChange = (date, newNote) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [date.toISOString().split("T")[0]]: newNote,
    }));
  };

  // Create an array of week options
  const weekOptions = Array.from(
    { length: totalWeeks },
    (_, weekIndex) => `Week ${weekIndex + 1}`
  );

  // Function to handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Function to handle semester selection
  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  // Define semesters and their months
  const semesters = {
    SPRING: [0, 1, 2, 3], // January, February, March, April
    SUMMER: [4, 5, 6, 7], // May, June, July, August
    FALL: [8, 9, 10, 11], // September, October, November, December
  };

  // Function to determine the semester based on the selected month
  const getSemesterForMonth = (month) => {
    for (const [semester, months] of Object.entries(semesters)) {
      if (months.includes(month)) {
        return semester;
      }
    }
    return "Unknown Semester";
  };

  return (
    <div style={{ margin: "20px auto", padding: "0px 30px 0px 0px" }}>
      <Typography variant="h4" align="center" fontWeight='600' letterSpacing={'5px'}>
        {getSemesterForMonth(selectedMonth)} 23
      </Typography>

      <div className="calendar-btn-pre-next">
        <Button
          onClick={() => setSelectedWeek(selectedWeek - 1)}
          disabled={selectedWeek === 0}
          variant="contained"
        >
          <ChevronLeftIcon />
        </Button>
        <Select sx={{width: '120px', textAlign: 'center'}} value={selectedSemester} onChange={handleSemesterChange}>
          {Object.keys(semesters).map((semester) => (
            <MenuItem key={semester} value={semester}>
              {semester}
            </MenuItem>
          ))}
        </Select>
        <Select value={selectedMonth} onChange={handleMonthChange}>
          {semesters[selectedSemester].map((monthIndex) => (
            <MenuItem key={monthIndex} value={monthIndex}>
              Month: {monthIndex + 1}
            </MenuItem>
          ))}
        </Select>
        <Select
            value={selectedWeek}
            onChange={(event) => setSelectedWeek(event.target.value)}
          >
            {weekOptions.map((weekOption, index) => (
              <MenuItem key={index} value={index}>
                {weekOption}
              </MenuItem>
            ))}
          </Select>
        <Button
          onClick={() => setSelectedWeek(selectedWeek + 1)}
          disabled={selectedWeek === totalWeeks - 1}
          variant="contained"
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table className="calendar-table">
          <TableHead className="calendar-table-head">
            <TableRow className="calendar-table-row">
              <TableCell>Sun</TableCell>
              <TableCell>Mon</TableCell>
              <TableCell>Tue</TableCell>
              <TableCell>Wed</TableCell>
              <TableCell>Thu</TableCell>
              <TableCell>Fri</TableCell>
              <TableCell>Sat</TableCell>
            </TableRow>
            <TableRow className="calendar-table-row">
              {Array.from({ length: 7 }, (_, dayIndex) => (
                <TableCell key={dayIndex}>
                  <div className="calendar-table-row-day">
                    {startDay + dayIndex > 0 && startDay + dayIndex <= totalDays
                      ? (startDay + dayIndex).toString().padStart(2, "0")
                      : ""}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              style={{ verticalAlign: "top" }}
              className="calendar-table-row"
            >
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dayNumber = startDay + dayIndex;
                const date = new Date(2023, selectedMonth, dayNumber + 1);
                const note = notes[date.toISOString().split("T")[0]];

                const matchingSlot = list.find(
                  (slot) =>
                    slot.date ===
                    date.toISOString().split("T")[0].replace(/-/g, "/")
                );

                return (
                  <TableCell key={dayIndex}>
                    {dayNumber > 0 &&
                      dayNumber <= totalDays &&
                      matchingSlot && <ContentComponent list={list} date={date} />}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCalendar;
