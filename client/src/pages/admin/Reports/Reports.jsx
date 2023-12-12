import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import jsPDF from "jspdf";
export default function Reports() {
  const [employees, setEmployees] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [includedPrograms, setIncludedPrograms] = useState([]);
  const [age, setAge] = useState("");
  // Fetch the product list on component mount
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Perform the fetch operation
        const response = await fetch("/api/train/getAllImplementedProgram");
        const result = await response.json();
        setPrograms(result.data.implementedProgram);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchTrainersList = async () => {
      try {
        // Perform the fetch operation
        const response = await fetch("/api/train/getAllEmployee");
        const result = await response.json();
        console.log(result.data.employee);
        // Update the state with the fetched data
        setEmployees(result.data.employee);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchIncludedList = async () => {
      try {
        // Perform the fetch operation
        const response = await fetch("/api/train/getAllIncludedProgram");
        const result = await response.json();
        console.log(result.data.includedProgram);
        // Update the state with the fetched data
        setIncludedPrograms(result.data.includedProgram);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSchedule();
    fetchIncludedList();
    fetchTrainersList();
  }, []);
  const exportToPDF = (role) => {
    const pdf = new jsPDF();
    // Format and add data to the PDF
    if (role == "admin") {
      pdf.text(
        10,
        10,
        "------------------------------------------Employee-------------------------------------------------"
      );
      let i = 20;
      employees.forEach((employee) => {
        i += 10;
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
      });
    }
    if (role == "trainer") {
      pdf.text(
        10,
        10,
        "------------------------------------------Trainer-------------------------------------------------"
      );
      let i = 20;
      employees.forEach((employee) => {
        if (employee.trainer == "true") {
          i += 10;
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
      });
    }
    if (role == "trainee") {
      pdf.text(
        10,
        10,
        "------------------------------------------Trainee-------------------------------------------------"
      );
      let i = 20;
      employees.forEach((employee) => {
        if (employee.trainee == "true") {
          i += 10;
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
      });
    }
    if (role == "scheduled") {
      console.log("programs", programs);
      pdf.text(
        10,
        10,
        "------------------------------------------Scheduled Program-------------------------------------------------"
      );
      let i = 20;
      programs.forEach((program) => {
        i += 15;
        pdf.text(
          10,
          i,
          `  Program Number:${program.programNumber}\t Included Program Number: ${program.includedProgramNumber.programNumber}\n Date: ${program.date}\hallNumber:${program.hallNumber.hallNumber}\t Attendance Type: ${program.attendanceType} \n Targeted Category: ${program.targetedCategory}\t Trainer Number:${program.trainerNumber.jobNumber}\t Days: ${program.days}\n Attendance Number: ${program.attendanceNumber}\t Trainee List: ${program.traineeList}`
        );
        i += 25;
        pdf.text(
          10,
          i + 10,
          "--------------------------------------------------------------------------------------------------------"
        );
      });
    }
    //}
    if (role == "given") {
      pdf.text(
        10,
        10,
        "------------------------------------------Given Programs-------------------------------------------------"
      );
      let i = 20;
      programs.forEach((program) => {
        i += 15;
        pdf.text(
          10,
          i,
          `  Program Number:${program.programNumber}\t Included Program Number: ${program.includedProgramNumber.programNumber}\n Date: ${program.date}\hallNumber:${program.hallNumber.hallNumber}\t Attendance Type: ${program.attendanceType} \n Targeted Category: ${program.targetedCategory}\t Trainer Number:${program.trainerNumber.jobNumber}\t Days: ${program.days}\n Attendance Number: ${program.attendanceNumber}\t Trainee List: ${program.traineeList}`
        );
        i += 25;
        pdf.text(
          10,
          i + 10,
          "--------------------------------------------------------------------------------------------------------"
        );
      });
    }
    if (role == "available") {
      pdf.text(
        10,
        10,
        "------------------------------------------Available Programs-------------------------------------------------"
      );
      let i = 20;
      includedPrograms.forEach((program) => {
        i += 10;
        pdf.text(
          10,
          i,
          `  Program Number:${program.programNumber}\t  Program Number: ${program.programNumber}\n type: ${program.type}\tImplementing Section :${program.implementingSection}\n Program Package: ${program.programPackage} \n`
        );
        i += 25;
        pdf.text(
          10,
          i,
          "--------------------------------------------------------------------------------------------------------"
        );
      });
    }
    // Save the PDF or open it in a new tab
    pdf.save("exported-data.pdf");
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="mt-40 ">
      <div className=" grid grid-cols-1 lg:grid-cols-3  gap-3 p-4">
        <button
          onClick={() => {
            exportToPDF("trainer");
          }}
          className="bg-blue-800 rounded-md text-center shadow-lg text-sky-100 p-3 hover:text-sky-400 "
        >
          All Trainer List
        </button>
        <button
          onClick={() => {
            exportToPDF("trainee");
          }}
          className="bg-blue-800 rounded-md text-center shadow-lg text-sky-100 hover:text-sky-400 p-3"
        >
          All Trainee List
        </button>
        <button
          onClick={() => {
            exportToPDF("admin");
          }}
          className="bg-blue-800 rounded-md text-center shadow-lg text-sky-100 hover:text-sky-400 p-3"
        >
          All Employees List
        </button>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3 pt-6 ">
        <button
          className="bg-purple-800 rounded-md text-center shadow-lg text-sky-100 p-3 hover:text-sky-400"
          onClick={() => {
            exportToPDF("scheduled");
          }}
        >
          Scheduled Programs
        </button>
        <button
          className="bg-purple-800 rounded-md text-center shadow-lg text-sky-100 p-3 hover:text-sky-400"
          onClick={() => {
            exportToPDF("given");
          }}
        >
          Given Programs
        </button>
        <button
          className="bg-purple-800 rounded-md text-center shadow-lg text-sky-100 p-3 hover:text-sky-400"
          onClick={() => {
            exportToPDF("available");
          }}
        >
          Available Programs
        </button>
      </div>
    </div>
  );
}
