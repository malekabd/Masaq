import React from "react";
import { Card, Button } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
export const AuthCard = () => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 1000, mt: 2 }}>
      <CardMedia
        component="img"
        height="194"
        image="https://i.pinimg.com/originals/33/42/e4/3342e4ba684ff017acff7382cad86c7f.jpg"
        alt="Unauthorized"
      />
    </Card>
  );
};
