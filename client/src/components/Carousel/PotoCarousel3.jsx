import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel3 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/masaqproject-74aaa.appspot.com/o/main.png?alt=media&token=d06a53ff-819e-493f-8d2e-bf308d8320ce"
          alt="homePage"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/masaqproject-74aaa.appspot.com/o/trainee.png?alt=media&token=58ef4676-8c07-44b3-ad4c-0bf7294e90e9"
          alt="traineePage"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/trainerPage.png?alt=media&token=1197738d-fbec-4dd1-9b4f-ce13ff4a2166"
          alt="trainerPage"
        />
      </Paper>
    </Carousel>
  </Card>
);

export default PotoCarousel3;
