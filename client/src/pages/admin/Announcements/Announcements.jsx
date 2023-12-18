import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const SingleFieldForm = () => {
  const navigate = useNavigate();
  // State to hold form data
  const [inputValue, setInputValue] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    try {
      const res = await fetch("api/announcement/addAnnouncement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ announcement: inputValue }),
      });

      // Ensure the request was successful (status code 2xx)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Parse the JSON response
      const responseData = await res.json();
      navigate("/");

      // Perform additional actions with the received data
    } catch (error) {
      console.error("Error during POST request:", error.message);
    }
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
