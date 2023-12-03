import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Reports() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="flex sm:flex-row flex-col mt-20 justify-around ">
      <div className="flex flex-col justify-center items-center space-y-10 w-44 h-48 border-double border-4 border-sky-500 ">
        <a> Trainers List</a>
        <a> Trainees List</a>
        <a> All Employees List</a>
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
