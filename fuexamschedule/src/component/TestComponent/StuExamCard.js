import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './StuExamCard.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function StuExamCard() {
  return (
    <Card sx={{ maxWidth: 300 , marginTop: 50, padding:1, borderRadius: 8, background: '#fff1f8'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          December 10, 2023
        </Typography>
        <Typography variant="h4" component="div" sx={{fontWeight: 'bold'}}>
          PRJ301
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
        <table border="0" cellspacing = "5" >
            <tr >
                <td>Room</td>
                <td style={{paddingLeft: 8}}>300</td>
            </tr>
            <tr>
                <td>Time</td>
                <td style={{paddingLeft: 8}}>12:00 - 13:00</td>
            </tr>
            <tr>
                <td>Type</td>
                <td style={{paddingLeft: 8}}>Final Exam (FE)</td>
            </tr>
            <tr style={{fontWeight: 'bold', color: 'red'}}>
                <td>Note</td>
                <td style={{paddingLeft: 8}}>EOS (Multiple Choice)</td>
            </tr>
        </table>
        </Typography>
      </CardContent>
    </Card>
  );
}