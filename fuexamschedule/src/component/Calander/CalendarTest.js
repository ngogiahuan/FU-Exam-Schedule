import React, { useState, useEffect } from 'react';
import CardSelectExaminer from '../CardSchedule/CardSchedule';
import ListOfExamSlot from '../CardSchedule/ListOfExamSlot';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import './CalendarTest.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const TableCalendar = ({ year, month }) => {
  const [notes, setNotes] = useState({});
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(0);

  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const totalWeeks = Math.ceil((totalDays + startingDay) / 7);

  // Use an effect to update the currentWeek when the selectedWeek changes
  useEffect(() => {
    setCurrentWeek(selectedWeek);
  }, [selectedWeek]);

  const startDay = currentWeek * 7 - startingDay + 1;
  const endDay = startDay + 6;


  const handleNoteChange = (date, newNote) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [date.toISOString().split('T')[0]]: newNote,
    }));
  };

  // Create an array of week options
  const weekOptions = Array.from({ length: totalWeeks }, (_, weekIndex) => `Week ${weekIndex + 1}`);

  return (
    <div style={{ margin: '100px auto', width: '70%' }}>
      <div className='calendar-btn-pre-next' >
        <Button
          onClick={() => setSelectedWeek(selectedWeek - 1)}
          disabled={selectedWeek === 0}
          variant="contained"
        >
          <ChevronLeftIcon />
        </Button>
        <Select
          value={selectedWeek}
          onChange={(event) => setSelectedWeek(event.target.value)}
        >
          {weekOptions.map((weekOption, index) => (
            <MenuItem key={index} value={index}>{weekOption}</MenuItem>
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
        <Table className='calendar-table'>
          <TableHead className='calendar-table-head'>
            <TableRow className='calendar-table-row'>
              <TableCell>Sun</TableCell>
              <TableCell>Mon</TableCell>
              <TableCell>Tue</TableCell>
              <TableCell>Wed</TableCell>
              <TableCell>Thu</TableCell>
              <TableCell>Fri</TableCell>
              <TableCell>Sat</TableCell>
            </TableRow>
            <TableRow className='calendar-table-row'>
              {Array.from({ length: 7 }, (_, dayIndex) => (
                <TableCell key={dayIndex}>
                {startDay + dayIndex > 0 && startDay + dayIndex <= totalDays
                  ? (startDay + dayIndex).toString().padStart(2, '0')
                  : ''}
              </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{verticalAlign: 'top'}} className='calendar-table-row'>
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dayNumber = startDay + dayIndex;
                const date = new Date(year, month, dayNumber + 1);
                const note = notes[date.toISOString().split('T')[0]];

                const matchingSlot = ListOfExamSlot.find(
                  (slot) => slot.date === date.toISOString().split('T')[0].replace(/-/g, '/')
                );

                return (
                  <TableCell key={dayIndex}>
                      {dayNumber > 0 && dayNumber <= totalDays && matchingSlot && (
                        <CardSelectExaminer date={date} />
                      )}
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
