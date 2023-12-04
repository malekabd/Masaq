import { useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios"; // For making HTTP requests
import jsPDF from "jspdf";
export default function Reports() {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [age, setAge] = useState("");

  const fetchTrainersList = useMemo(
    () => async () => {
      try {
        setEmployees([]);
        const e = await axios.get("/api/train/getAllEmployee"); // Replace with your API endpoint
        e.data.data.employee.forEach((item) => {
          //console.log(item);
          const { _id: t_id, jobNumber } = item;

          setEmployees((oldArray) => [...oldArray, item]);
        });
      } catch (error) {
        console.error("Error fetching trainer list:", error);
      }
    },
    []
  );

  // Fetch the product list on component mount
  useEffect(() => {
    fetchTrainersList();
  }, [fetchTrainersList]);

  const exportToPDF = (role) => {
    const pdf = new jsPDF();
    pdf.text(
      10,
      10,
      "------------------------------------------Employee-------------------------------------------------"
    );
    let i = 20;
    // Format and add data to the PDF
    employees.forEach((employee) => {
      i += 10;
      if (role == "admin") {
        pdf.text(
          10,
          i,
          `  Job Number:${employee.jobNumber}\t Name: ${employee.name}\t Phone Number: ${employee.phoneNumber}\nEmail:${employee.email}\t Description: ${employee.description} \nEmployer: ${employee.employer}\tTrainee:${employee.trainee}\t Trainer: ${employee.trainer}\t Admin: ${employee.admin}`
        );

        i += 20;
        pdf.text(
          10,
          i,
          "--------------------------------------------------------------------------------------------------------"
        );
      }
      if (role == "trainer") {
        if (employee.trainer == "true") {
          pdf.text(
            10,
            i,
            `  Job Number:${employee.jobNumber}\t Name: ${employee.name}\t Phone Number: ${employee.phoneNumber}\nEmail:${employee.email}\t Description: ${employee.description} \nEmployer: ${employee.employer}\tTrainee:${employee.trainee}\t Trainer: ${employee.trainer}\t Admin: ${employee.admin}`
          );

          i += 20;
          pdf.text(
            10,
            i,
            "--------------------------------------------------------------------------------------------------------"
          );
        }
      }
      if (role == "trainee") {
        if (employee.trainee == "true") {
          pdf.text(
            10,
            i,
            `  Job Number:${employee.jobNumber}\t Name: ${employee.name}\t Phone Number: ${employee.phoneNumber}\nEmail:${employee.email}\t Description: ${employee.description} \nEmployer: ${employee.employer}\tTrainee:${employee.trainee}\t Trainer: ${employee.trainer}\t Admin: ${employee.admin}`
          );

          i += 20;
          pdf.text(
            10,
            i,
            "--------------------------------------------------------------------------------------------------------"
          );
        }
      }
    });
    // Save the PDF or open it in a new tab
    pdf.save("exported-data.pdf");
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="flex sm:flex-row flex-col mt-20 justify-around ">
      <div className="flex flex-col justify-center items-center space-y-10 w-44 h-48 border-double border-4 border-sky-500 ">
        <button
          onClick={() => {
            console.log(employees);
            exportToPDF("trainer");
          }}
        >
          All Trainer List
        </button>
        <button
          onClick={() => {
            console.log(employees);
            exportToPDF("trainee");
          }}
        >
          All Trainee List
        </button>
        <button
          onClick={() => {
            console.log(employees);
            exportToPDF("admin");
          }}
        >
          All Employees List
        </button>
      </div>
      <div className="flex flex-col  justify-center items-center space-y-10 w-44 h-48 border-double border-4 border-sky-500 ">
        <a> Scheduled Programs</a>
        <a> Given Programs</a>
        <a> Available Programs</a>
      </div>
      <div className="flex flex-col justify-center items-center space-y-10 w-44 h-48 border-double border-4 border-sky-500 ">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <button>View Report</button>
      </div>
    </div>
  );
}
