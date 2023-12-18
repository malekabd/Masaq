import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel2 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          //  image="./adminPage.png"
          alt="admin Page"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          //   image="./announcementPage.png"
          alt="announcement Page"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          //  image="./createForm.png"
          alt="create Form"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          //   image="./reportsPage.png"
          alt="reports Page"
        />
      </Paper>
    </Carousel>
  </Card>
);

export default PotoCarousel2;
