import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel1 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/homePage.png?alt=media&token=4e5d4435-5167-4fb6-ab79-66f3a4c63bc0"
          alt="home Page"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/loginpage.png?alt=media&token=9ca5d7c9-1601-430c-a02f-dd1f7f14fbf2"
          alt="loginpage"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/project1-8af56.appspot.com/o/unauthorized.png?alt=media&token=31c4a630-8516-4932-9e32-aaadcd3f3d3e"
          alt="unauthorized"
        />
      </Paper>
    </Carousel>
  </Card>
);

export default PotoCarousel1;
