import React, { useState } from "react";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import "./SideBar.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";

export default function Sidebar({ features, role }) {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const handleFeatureClick = (index) => {
    setSelectedFeature(index);
  };

  return (
    <Grid container direction="column" className="sidebar-grid">
      <List component="nav" className="sidebar-list">
        {features.map((feature, index) => (
          <Link
            to={`/${role}/${feature.path}`}
            key={index}
            className="link-button"
          >
            <ListItem
              button
              selected={selectedFeature === index}
              onClick={() => handleFeatureClick(index)}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <ListItemText primary={feature.name} />
                </Grid>
                <Grid item>
                  <ArrowRightIcon style={{ color: "rgba(0, 0, 0, 0.5)" }} />
                </Grid>
              </Grid>
            </ListItem>
          </Link>
        ))}
      </List>
    </Grid>
  );
}
