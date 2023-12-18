import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
export const AuthCard = () => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 1000 }}>
      
        <CardMedia
          component="img"
          height="194"
          image="https://media.istockphoto.com/id/517346408/photo/stop-sign-with-blue-sky-background-and-copy-space.jpg?s=612x612&w=is&k=20&c=4f6ZAAeBh_gaF7TesNLyDKgok-gtxYhtInSXsUA_2N0="
          alt="Unauthorized"
        />
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="outlined"
          size="medium"
          color="error"
        >
          {" "}
          Home
        </Button>
      
    </Card>
  );
};
