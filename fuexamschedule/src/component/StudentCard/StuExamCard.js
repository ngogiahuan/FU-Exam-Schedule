import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import StuExamCardModal from './StuExamCardModal';
import './StuExamCard.css';


const cardColors = ['#aee5ff', '#c6d7fb', '#ffb8d0', '#fee5e1', '#ffbfb3']; // Add more colors as needed

export default function StuExamCard({ list, date}) {

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
      <div className="stu-card-container">
        {matchingSlots.map((stuExam, index) => (
          <Card className='card'
            key={index}
            onClick={() => handleOpenModal(stuExam)}
            sx={{
              width: '100%',
              borderRadius: '8px',
              // background: cardColors[index % cardColors.length], // Use index to cycle through colors
              background: '#fff',
              border: '1px solid #e8e8e8',
            }}
          >
            <CardContent style={{padding: '10px'}}>
              <Typography variant="h5" component="div" sx={{fontWeight: '700', letterSpacing: '1px', textAlign: 'center', mb: '4px', color:'#1565c0' }}>
                {stuExam.subject}
              </Typography>
              
              <Chip label={`${stuExam.time}`} variant="outlined" sx={{fontSize:'14px', fontWeight: '500', width: '100%'}}/>
              {/* <Typography color="text.primary">
                <table className='stu-card-table' border="0" cellspacing="5">
                  <tr className="stu-card-row" >
                    <td >Room</td>
                    <td ><Chip className='stu-card-chip' label={`${stuExam.room}`} color='default'/></td>
                  </tr>
                  <tr  className="stu-card-row">
                    <td >Type</td>
                    <td ><Chip className='stu-card-chip' label={`${stuExam.type}`} color='default'/></td>
                  </tr>
                  <tr  className="stu-card-row">
                    <td >Note</td>
                    <td ><Chip className='stu-card-chip' label={`${stuExam.note}`} color='default'/></td>
                  </tr>
                </table>
              </Typography> */}
            </CardContent>
          </Card>

          
        ))}
      
      {/* Modal */}
      <StuExamCardModal
        open={modalOpen}
        selectedSlot={selectedSlot}
        handleCloseModal={handleCloseModal}
      />
    </div>
    );
}