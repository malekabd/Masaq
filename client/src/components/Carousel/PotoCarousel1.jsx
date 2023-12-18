import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel1 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          // image="./homePage.png"
          alt="home Page"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          //  image="./loginpage.png"
          alt="loginpage"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          //   image="./unauthorized.png"
          alt="unauthorized"
        />
      </Paper>
    </Carousel>
  </Card>
);

export default PotoCarousel1;
