import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import './StuExamCard.css';


const cardColors = ['#aee5ff', '#c6d7fb', '#ffb8d0', '#fee5e1', '#ffbfb3']; // Add more colors as needed

export default function StuExamCard({ list, date}) {

  const matchingSlots = list.filter(
    (slot) => slot.date === date.toISOString().split("T")[0].replace(/-/g, "/")
  );

    return (
      <div className="stu-card-container">
        {matchingSlots.map((stuExam, index) => (
          <Card className='card'
            key={index}
            sx={{
              width: '100%',
              borderRadius: '8px',
              // background: cardColors[index % cardColors.length], // Use index to cycle through colors
              background: '#fff',
              border: '1px solid #e0e0e0',
            }}
          >
            <CardContent style={{padding: '10px'}}>
              <Typography variant="h5" component="div" sx={{ fontWeight: '800', letterSpacing: '1px', textAlign: 'center', mb: '4px', color:'#1565c0' }}>
                {stuExam.subject}
              </Typography>
              
              <Chip label={`${stuExam.time}`} color='default' sx={{fontSize:'14px', fontWeight: '600', width: '100%'}}/>
              <Typography color="text.primary">
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
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    );
}