import "./about.css";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PotoCarousel1 from "../../components/Carousel/PotoCarousel1";
import PotoCarousel2 from "../../components/Carousel/PotoCarousel2";
import PotoCarousel3 from "../../components/Carousel/PotoCarousel3";
export default function About() {
  return (
    <>
      <Card position="absolute">
        <CardMedia
          sx={{ height: 350 }}
          image="https://blessedcloud.com/tadreeb/0.jfif"
          title="green iguana"
        >
          <Typography align="center">
            <h1 className="text-2xl font-bold">
              About the Training Center System
            </h1>
          </Typography>
        </CardMedia>
        <CardContent>
          <div>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>System Overview</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="justify">
                  This Website hosts the company training center database that
                  stores and retrives employees training data , where all
                  trainers and trainees are company employees working on
                  specific training programs helps raising the value of our
                  human resources. This system displays on its homepage list of
                  training courses taking place this week with highlighted past
                  days. It enables training managers as the system admin
                  choosing a course package to schedule a training course event,
                  select a trainer and candidate trainees with no conflict or
                  redundancy . During training course days admin can register
                  trainees who have attended the class. When the event is over,
                  the system opens evaluation forms for the trainees then
                  provides reports about the whole process. Trainers and
                  trainees can view their training records and download courses
                  handout pdfs and certifications. Admin can have statistics and
                  review about all.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Home Page and Login</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="justify">
                  First page displays to the website visitor is the home page,
                  it will show a list of training courses scheduled on this week
                  with highlighted on training past days. System users can log
                  in to the system as admin, trainer or trainee from the
                  dropdown menu on avatar image. If the user try to click his
                  role without login unauthorized page will apear, so he has to
                  log in with job number and password
                </Typography>
                <PotoCarousel1 />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Admin Page</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="justify">
                  Admin Page handle the main transactions in this system. He can
                  navigate through and display the system contents by click
                  buttons on the left that lead to add,edit or delete Programs,
                  employees, schedule new or reschedule a training course
                  programs and view Reports
                </Typography>
                <PotoCarousel2 />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Trainer and Trainee Pages</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="justify">
                  Company employees usually can be either trainer or trainee in
                  the training center system. When they log in to the system by
                  job number and a password, they could view list of programs
                  that has been given or scheduled to be given by the employee
                  as a trainer or taken or to be take as a trainee list of
                  programs that by the trainer. Also they can download programs
                  package and certification of the programs. Trainee can add
                  programs evaluation, and trainer can view it.
                </Typography>
                <PotoCarousel3 />
              </AccordionDetails>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
