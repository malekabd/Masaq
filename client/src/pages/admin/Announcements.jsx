import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
const SingleFieldForm = () => {
  // State to hold form data
  const [inputValue, setInputValue] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "",
        inputValue
      );

      console.log("Data received:", response.data);

      // Perform additional actions with the received data
    } catch (error) {
      console.error("Error during POST request:", error.message);
    }
    // Perform any action with the form data here
    console.log("Form submitted with value:", inputValue);
    // You can send the data to a server, perform validation, etc.
  };

  return (
    <div className="flex flex-col mt-10">
      <h2 className="flex justify-center mb-3">
        Enter Announcement to be Appear on Home Page
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex justify-center items-center">
          <textarea
            rows="4"
            cols="50"
            type="text"
            id="singleField"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        <Button type="submit" color="primary">
          Share
        </Button>
      </form>
    </div>
  );
};

export default SingleFieldForm;
