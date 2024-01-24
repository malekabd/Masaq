import * as React from "react";
import { Paper, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PotoCarousel2 = () => (
  <Card sx={{ maxWidth: 500, margin: "auto" }}>
    <Carousel>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/masaqproject-74aaa.appspot.com/o/schedual.png?alt=media&token=15b4df46-8cb1-44a7-979b-25275d4bc91f"
          alt="admin Page"
        />
      </Paper>

      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/masaqproject-74aaa.appspot.com/o/xreate.png?alt=media&token=780854db-e967-4431-bd32-d80af7e80593"
          alt="create Form"
        />
      </Paper>
      <Paper>
        <CardMedia
          component="img"
          image="https://firebasestorage.googleapis.com/v0/b/masaqproject-74aaa.appspot.com/o/report.png?alt=media&token=48792148-d8a7-4aae-aad7-e0564f393c89"
          alt="reports Page"
        />
      </Paper>
    </Carousel>
  </Card>
);

export default PotoCarousel2;
