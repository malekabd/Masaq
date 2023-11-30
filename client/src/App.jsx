import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import LayOut from "./pages/LayOut";
import UserContext from "./pages/userContext";
import { Toaster } from "react-hot-toast";
import Reports from "./pages/admin/Reports";
import Programs from "./pages/admin/Programs";
import Rooms from "./pages/admin/Rooms";
import Employees from "./pages/admin/Employees";
import Schedule from "./pages/admin/Schedule";
export default function App() {
  let _user = localStorage.getItem("user");

  let admin = localStorage.getItem("admin");
  let trainer = localStorage.getItem("trainer");
  let trainee = localStorage.getItem("trainee");
  /*   console.log(trainer);
  console.log(trainee);
  console.log(admin); */
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
        <Routes>
          <Route path="/signin" element={<SignIn />} />

          <Route path="/" element={<Home />} />
          <Route element={<LayOut />}>
            {userRole.role == "admin" ? (
              <>
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/reports" element={<Reports />} />
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
