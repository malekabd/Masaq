import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn";
import LayOut from "./pages/admin/LayOut";
import UserContext from "./pages/userContext";
import { Toaster } from "react-hot-toast";
import Reports from "./pages/admin/Reports/Reports";
import Programs from "./pages/admin/Program/Programs";
import Rooms from "./pages/admin/Rooms/Rooms";
import Employees from "./pages/admin/Employee/Employees";
import Announcements from "./pages/admin/Announcements/Announcements";
import RecordingAbsence from "./pages/admin/Absence/RecordingAbsence";
import TraineeRecord from "./pages/trainee/TraineeRecord";
import Evaluations from "./pages/trainee/TraineeEvaluations";
import Schedule from "./pages/admin/Schedule/Schedule";
import MainLayOut from "./pages/MainLayOut";
import TrainerLayOut from "./pages/trainer/TrainerLayOut";
import TrainerRecord from "./pages/trainer/TrainerRecord";
import TraineeLayOut from "./pages/trainee/TraineeLayOut";
import CompanyPage from "./pages/CompanyPage/CompanyPage";
import About from "./pages/About/About";
import RootLayout from "./layouts/RootLayout";
import { AuthCard } from "./components/AuthCard";
export default function App() {
  let _user = localStorage.getItem("user");

  let isLoggedIn = false;

  if (_user) {
    isLoggedIn = true;
  }

  const [user, setUser] = useState({
    isAuthenticated: isLoggedIn,
  });
  const [userRole, setUserRole] = useState({
    admin: "",
    trainer: "",
    trainee: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route element={<MainLayOut />}>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/about" element={<About />} />
              <Route path="/companypage" element={<CompanyPage />} />
            </Route>

            <Route element={<LayOut />}>
              <Route path="schedule" element={<Schedule />} />
              <Route path="employees" element={<Employees />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="programs" element={<Programs />} />
              <Route path="reports" element={<Reports />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="Absence" element={<RecordingAbsence />} />
            </Route>

            <Route element={<TraineeLayOut />}>
              <Route path="trainee" element={<TraineeRecord />} />
              <Route path="evaluation" element={<Evaluations />} />
            </Route>

            <Route element={<TrainerLayOut />}>
              <Route path="trainer" element={<TrainerRecord />} />
            </Route>
            <Route path="/forbidden" element={<AuthCard />} />
          </Routes>
        </RootLayout>
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
