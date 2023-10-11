import React, { useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import "./Body.css";
import Sidebar from "../SideBar/SideBar";

export default function Body({ features, content, role }) {
  return (
    <Container className="container">
      <Grid container>
        {/* First Item */}
        <Grid item xs={12} md={2} className="sidebar-container">
          <Sidebar features={features} role={role} />
        </Grid>

        {/* Second Item */}
        <Grid item xs={12} md={10} className="content-container">
          {content}
        </Grid>
      </Grid>
    </Container>
  );
}
