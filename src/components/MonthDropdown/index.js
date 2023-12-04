import React, { useState } from "react";
import { Select } from "@chakra-ui/react";

const MonthDropdown = ({ onSelect }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState("");

  const handleChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    onSelect(selectedMonth); // Call the onSelect callback with the selected month
  };

  return (
    <Select
      style={{ width: "20%", marginLeft: "80%" }}
      placeholder="Select Month"
      value={selectedMonth}
      onChange={handleChange}
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </Select>
  );
};

export default MonthDropdown;
