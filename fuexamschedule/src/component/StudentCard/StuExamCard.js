import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './StuExamCard.css';

import { ListOfStuExam } from './ListOfStuExam';

const cardColors = ['#aee5ff', '#c6d7fb', '#ffb8d0', '#fee5e1', '#ffbfb3']; // Add more colors as needed

export default function StuExamCard() {
  if (ListOfStuExam.length === 0) {
    return (
      <div className="container" style={{ marginTop: '180px' }}  >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2866cd'}}>
          You do not have any exams
        </Typography>
      </div>
    )
    
  } else { 

    return (
      <div className="container">
        {ListOfStuExam.map((stuExam, index) => (
          <Card className='card'
            key={index}
            sx={{
              width: '29%',
              padding: 1,
              borderRadius: 8,
              background: cardColors[index % cardColors.length], // Use index to cycle through colors
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {stuExam.day}
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stuExam.subject}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.primary">
                <table border="0" cellspacing="5">
                  <tr>
                    <td className='td-title'>Room</td>
                    <td className='td-data'><span>:</span>{stuExam.room}</td>
                  </tr>
                  <tr>
                    <td className='td-title'>Time</td>
                    <td className='td-data'><span>:</span>{stuExam.time}</td>
                  </tr>
                  <tr>
                    <td className='td-title'>Type</td>
                    <td className='td-data'><span>:</span>{stuExam.type}</td>
                  </tr>
                  <tr style={{ fontWeight: 'bold'}}>
                    <td className='td-title'>Note</td>
                    <td className='td-data'><span>:</span>{stuExam.note}</td>
                  </tr>
                </table>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}