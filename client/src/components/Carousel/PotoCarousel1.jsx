import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel1 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/masaqproject-74aaa.appspot.com/o/main.png?alt=media&token=d06a53ff-819e-493f-8d2e-bf308d8320ce"
          alt="home Page"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/masaqproject-74aaa.appspot.com/o/signin.png?alt=media&token=e5867c46-bede-49fd-8002-4787be95fe60"
          alt="loginpage"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/masaqproject-74aaa.appspot.com/o/UnAuth.png?alt=media&token=64c2d7dc-97fc-46c3-9cda-5579dbc976bf"
          alt="unauthorized"
        />
      </Paper>
    </Carousel>
  </Card>
);

export default PotoCarousel1;
