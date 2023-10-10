import React from "react";
import Login from "../Login/Login";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar style={{ paddingLeft: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "0px 16px",
            }}
          >
            <img src="./logo/logo-no-text-nobg.png" alt="logo" height="50px" />
            <img src="./logo/logo-text.png" alt="logo text" height="30px" />
          </Box>
        </Box>
        <Box className="navbar-element">
          <Login />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
