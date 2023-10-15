import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import "./CardSchedule.css";
import { Badge } from "@mui/material";
import CardScheduleModal from "./CardScheduleModal";

export default function CardSchedule({list, date }) {
  // Function to get the day of the week from a date string

  // Filter the ListOfExamSlot to get the slots that match the provided date
  const matchingSlots = list.filter(
    (slot) => slot.date === date.toISOString().split("T")[0].replace(/-/g, "/")
  );

  // State to manage the modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Function to handle opening the modal
  const handleOpenModal = (slot) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedSlot(null);
    setModalOpen(false);
  };

  // Function to format the date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const dateParts = dateString.split("/");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  };

  return (
    <div>
      {matchingSlots.map((slot, index) => (
        <Badge badgeContent={slot.quantity} color="primary">
          <Card
            className="card-schedule"
            key={index}
            onClick={() => handleOpenModal(slot)}
            sx={{
              border: "0.5px solid #e8e8e8",}}
          >
            <Typography className="card-schedule-text">{slot.time}</Typography>
          </Card>
        </Badge>
      ))}

      {/* Modal */}
      <CardScheduleModal
        open={modalOpen}
        selectedSlot={selectedSlot}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}
