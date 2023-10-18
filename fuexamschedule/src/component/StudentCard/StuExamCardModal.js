import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";

export default function StuExamCardModal({
  open,
  selectedSlot,
  handleCloseModal,
}) {
  // Define getDayOfWeek and formatDate functions if needed
  const getDayOfWeek = (dateString) => {
    const options = { weekday: "long" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split("/");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #2268cb",
          boxShadow: 24,
          p: 3,
          borderRadius: "8px",
        }}
      >
        {selectedSlot && (
          <>
            <Typography
              id="modal-title"
              variant="h5"
              component="h2"
              align="center"
              mb="8px"
            >
              {getDayOfWeek(selectedSlot.date)}, {formatDate(selectedSlot.date)}
            </Typography>

            <Typography id="modal-title" variant="body1" component="h2">
                  Subject: {selectedSlot.subject}
                </Typography> 

                <Typography  id="modal-title" variant="body1" component="h2">
                  Time: {selectedSlot.time}
                </Typography>
            <Grid container sx={{gap: 4}} justifyContent="start">
              <Grid item >
                <Typography sx={{mt: '4px'}} id="modal-title" variant="body1" component="h2">
                <Chip sx={{mr: '8px'}} variant="outlined" color="primary" label={`Room ${selectedSlot.room}`}  /> 
                <Chip sx={{mr: '8px'}} variant="outlined" color="primary" label={`${selectedSlot.type}`}  /> 
                <Chip sx={{mr: '8px'}} variant="outlined" color="primary" label={`${selectedSlot.note}`}  />
                </Typography>  
                </Grid>
            </Grid>

            
            <Divider sx={{ marginTop: "8px", marginBottom: "8px" }} />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "8px" }}
              onClick={handleCloseModal}
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
