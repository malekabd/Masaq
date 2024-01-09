import WidgetBox from "../../components/WidgetBox";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import "./Home.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function countRole(role, employees) {
  // Ensure role is either 'trainee' or 'trainer'
  if (role !== "trainee" && role !== "trainer") {
    console.error('Invalid role provided. Please use "trainee" or "trainer".');
    return 0; // Return 0 if an invalid role is provided
  }

  // Filter employees based on the specified role
  const filteredEmployees = employees.filter(
    (employee) => employee[role] === "true"
  );

  // Return the count of employees with the specified role
  return filteredEmployees.length;
}
function getLengthByAttendanceType(data, typeToCheck) {
  const filteredArray = data.filter(
    (item) => item.attendanceType === typeToCheck
  );
  return filteredArray.length;
}
function getLengthByMonth(data, monthToCheck) {
  const filteredArray = data.filter((item) => {
    const monthFromCreatedAt = new Date(item.date).toLocaleString("en-US", {
      month: "short",
    });
    console.log(monthFromCreatedAt);
    return monthFromCreatedAt === monthToCheck;
  });
  return filteredArray.length;
}

export default function Home() {
  const [programs, setPrograms] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    const fetchProgramsList = async () => {
      try {
        const response = await fetch("/api/train/getAllImplementedProgram");
        const result = await response.json();
        setPrograms(result.data.implementedProgram);
        console.log(programs);
        console.log(getLengthByMonth(programs, "Dec"));
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    const fetchRoomsList = async () => {
      try {
        const response = await fetch("/api/train/getAllTrainingHall");
        const result = await response.json();
        setRooms(result.data);
        console.log(rooms.length);
        //console.log(result.data.implementedProgram);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    const fetchTrainersList = async () => {
      try {
        const response = await fetch("/api/train/getAllEmployee");
        const result = await response.json();

        setEmployees(result.data.employee);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProgramsList();
    fetchTrainersList();
    fetchRoomsList();
  }, []);

  return (
    <div>
      <h1 className="mb-5">Training Center Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Item>
              <WidgetBox
                title="Rooms"
                number={rooms.length}
                imgLink="https://cdn-icons-png.flaticon.com/128/13567/13567429.png"
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Item>
              <WidgetBox
                title="Trainees"
                number={countRole("trainee", employees)}
                imgLink="https://cdn-icons-png.flaticon.com/128/13567/13567426.png"
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Item>
              <WidgetBox
                title="Programs"
                number={programs.length}
                imgLink="https://cdn-icons-png.flaticon.com/128/13567/13567451.png"
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Item>
              <WidgetBox
                title="Trainers"
                number={countRole("trainer", employees)}
                imgLink="https://cdn-icons-png.flaticon.com/128/1436/1436664.png"
              />
            </Item>
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="stretch"
          spacing={1}
          sx={{}}
        >
          <Grid
            item
            /*   xs={12}
            md={isMediumScreen ? 11 : isSmallScreen ? 10 : 9}
            lg={7} */
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <Item justifyContent="center">
              <div className="chart-container">
                <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: ["Oct", "Nov", "Dec"],
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    {
                      data: [
                        getLengthByMonth(programs, "Oct"),
                        getLengthByMonth(programs, "Nov"),
                        getLengthByMonth(programs, "Dec"),
                      ],
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ marginTop: 5 }}>
            <Item>
              <div className="chart-container">
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: getLengthByAttendanceType(programs, "online"),
                          label: "Online ",
                        },
                        {
                          id: 1,
                          value: getLengthByAttendanceType(
                            programs,
                            "OnCampus"
                          ),
                          label: "On-campus ",
                        },
                        {
                          id: 2,
                          value: getLengthByAttendanceType(programs, "Hybrid"),
                          label: "Hybrid",
                        },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div>
        <h2>Programs taken in the last Quarter of 2023</h2>
      </div>
    </div>
  );
}
