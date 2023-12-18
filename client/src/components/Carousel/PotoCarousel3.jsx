import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel3 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          //  image="./homePage.png"
          alt="homePage"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          //   image="./traineePage.png"
          alt="traineePage"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          //   image="./trainerPage.png"
          alt="trainerPage"
        />
      </Paper>
    </Carousel>
  </Card>
);

export default PotoCarousel3;
