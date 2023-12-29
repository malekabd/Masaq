import * as React from "react";
import AppBar from "@mui/material/AppBar";
import WavesIcon from "@mui/icons-material/Waves";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const cards = [1, 2, 3];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CompanyPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 6,
          
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Overseas Company
            </Typography>
            <Typography
              variant="h5"
              align="justify"
              color="text.secondary"
              paragraph
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              volutpat nibh quis condimentum semper. Nulla hendrerit nisl et
              lectus aliquam dignissim tincidunt id mi. Mauris tincidunt, urna
              auctor sodales elementum, quam lacus ultrices metus, non viverra
              justo purus eu ex. Integer malesuada mollis enim, ac scelerisque
              massa placerat non. Duis
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras volutpat nibh quis condimentum semper.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
