import React, { useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import "./SideBar.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Student from "../Student/Student";
import TableCalendar from "../Calander/Calendar";

export default function Sidebar({ features }) {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const handleFeatureClick = (index) => {
    setSelectedFeature(index);
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const month = 9;

  return (
    <Container className="container">
      <Grid container>
        {/* First Item */}
        <Grid item xs={12} md={2} className="sidebar-container">
          <Grid container direction="column" className="sidebar-grid">
            <List component="nav" className="sidbar-list">
              {features.map((feature, index) => (
                <ListItem
                  key={index}
                  button
                  selected={selectedFeature === index}
                  onClick={() => handleFeatureClick(index)}
                  className=""
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <ListItemText primary={feature} />
                    </Grid>
                    <Grid item>
                      <ArrowRightIcon style={{ color: "rgba(0, 0, 0, 0.5)" }} />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        {/* Second Item */}
        <Grid item xs={12} md={10} className="content-container">
          {/* Content based on the selectedFeature */}
          <TableCalendar year={currentYear} month={month} />
          {/* Add your content here */}
        </Grid>
      </Grid>
    </Container>
  );
}
