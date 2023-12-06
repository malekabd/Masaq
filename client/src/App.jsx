import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import LayOut from "./pages/admin/LayOut";
import UserContext from "./pages/userContext";
import { Toaster } from "react-hot-toast";
import Reports from "./pages/admin/Reports/Reports";
import Programs from "./pages/admin/Program/Programs";
import Rooms from "./pages/admin/Rooms/Rooms";
import Employees from "./pages/admin/Employee/Employees";
import Schedule from "./pages/admin/Schedule/Schedule";
import TraineeLayOut from "./pages/trainee/TraineeLayOut";
import TraineeRecord from "./pages/trainee/TraineeRecord";
import Evaluations from "./pages/trainee/TraineeEvaluations";
import Announcements from "./pages/admin/Announcements/Announcements";
import RecordingAbsence from "./pages/admin/Absence/RecordingAbsence";
import NavBar from "./components/NavBar";
import MainLayOut from "./pages/MainLayOut";
export default function App() {
  let _user = localStorage.getItem("user");

  let admin = localStorage.getItem("admin");
  let trainer = localStorage.getItem("trainer");
  let trainee = localStorage.getItem("trainee");

  let isLoggedIn = false;
  let Role = "";
  if (_user) {
    isLoggedIn = true;
  }
  if (admin) {
    Role = "admin";
  } else if (trainer) {
    Role = "trainer";
  } else if (trainee) {
    Role = "trainee";
  }

  const [user, setUser] = useState({
    isAuthenticated: isLoggedIn,
  });
  const [userRole, setUserRole] = useState({
    role: Role,
  });
  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<MainLayOut />}>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route element={<LayOut />}>
            {userRole.role == "admin" ? (
              <>
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route
                  path="/Absence"
                  element={<RecordingAbsence />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/schedule"
                  element={<Navigate to="/forbidden" />}
                />
                <Route
                  path="/employees"
                  element={<Navigate to="/forbidden" />}
                />
                <Route path="/rooms" element={<Navigate to="/forbidden" />} />
                <Route
                  path="/programs"
                  element={<Navigate to="/forbidden" />}
                />
                <Route path="/reports" element={<Navigate to="/forbidden" />} />
              </>
            )}
          </Route>
          <Route element={<TraineeLayOut />}>
            {userRole.role == "trainee" ? (
              <>
                <Route path="/trainee" element={<TraineeRecord />} />
                <Route path="/evaluation" element={<Evaluations />} />
              </>
            ) : (
              <>
                <Route
                  path="/schedule"
                  element={<Navigate to="/forbidden" />}
                />
                <Route
                  path="/employees"
                  element={<Navigate to="/forbidden" />}
                />
                <Route path="/rooms" element={<Navigate to="/forbidden" />} />
                <Route
                  path="/programs"
                  element={<Navigate to="/forbidden" />}
                />
                <Route path="/reports" element={<Navigate to="/forbidden" />} />
              </>
            )}
          </Route>
          <Route path="/forbidden" element={<h1>UnAuthorized</h1>} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </UserContext.Provider>
  );
}
