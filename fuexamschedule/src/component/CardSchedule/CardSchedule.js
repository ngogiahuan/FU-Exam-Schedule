import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListOfExamSlot from '../CardSchedule/ListOfExamSlot';
import './CardSchedule.css';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

export default function CardSelectExaminer({ date }) {
  // Function to get the day of the week from a date string
  const getDayOfWeek = (dateString) => {
    const options = { weekday: 'long' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Filter the ListOfExamSlot to get the slots that match the provided date
  const matchingSlots = ListOfExamSlot.filter(
    (slot) => slot.date === date.toISOString().split('T')[0].replace(/-/g, '/')
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
    const dateParts = dateString.split('/');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  };

  return (
    <div>
      {matchingSlots.map((slot, index) => (
        <Card
          className='card-schedule'
          key={index}
          onClick={() => handleOpenModal(slot)} // Open the modal when the card is clicked
        >
          <Typography className='card-schedule-text'>{slot.time}</Typography>
        </Card>
      ))}

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '1px solid #2268cb',
            boxShadow: 24,
            p: 3,
            borderRadius: '8px',
          }}
        >
          {selectedSlot && (
            <>
              {/* <Typography id='modal-title' variant='h4' component='h2' align='center' fontWeight='bold' mb='8px' color="#1565c0">
                Register Exam
              </Typography> */}
              <Typography id='modal-title' variant='h6' component='h2' align='center' mb='8px'>
                {getDayOfWeek(selectedSlot.date)}, {formatDate(selectedSlot.date)}
              </Typography>
              <Typography id='modal-title' variant='body1' component='h2'>
                Time <Chip label= {selectedSlot.time} />
              </Typography>
              <Typography id='modal-title' variant='body1' component='h2'>
                Slot remind: {selectedSlot.quantity}
              </Typography>

              <Divider sx={{marginTop: '8px', marginBottom: '8px'}} />
              <Button variant="contained" color="primary" sx={{marginTop: '8px'}} onClick={handleCloseModal}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
