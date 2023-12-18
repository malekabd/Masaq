import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel2 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/adminPage.png?alt=media&token=53a3cd73-c679-4e13-a180-846978a418b4"
          alt="admin Page"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/announcementPage.png?alt=media&token=b38f5c51-d5b6-48a0-b72a-b6a77a4bbddf"
          alt="announcement Page"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/createForm.png?alt=media&token=10d83a5c-ee20-45c3-b0a8-6d0f7f6fcb79"
          alt="create Form"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/reportsPage.png?alt=media&token=688e34ef-ab72-4ff5-a35f-0081c83fb1da"
          alt="reports Page"
        />
      </Paper>
    </Carousel>
  </Card>
);

export default PotoCarousel2;
