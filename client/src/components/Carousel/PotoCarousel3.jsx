import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel3 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/homePage.png?alt=media&token=4e5d4435-5167-4fb6-ab79-66f3a4c63bc0"
          alt="homePage"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/traineePage.png?alt=media&token=d75bb961-e5a3-4f19-8f64-26bb120a3409"
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
