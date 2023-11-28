import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import About from "./pages/About";
import LayOut from "./pages/LayOut";
import UserContext from "./pages/userContext";
import { Toaster } from "react-hot-toast";
import Reports from "./pages/admin/Reports";
import Programs from "./pages/admin/Programs";
import Rooms from "./pages/admin/Rooms";
import Employees from "./pages/admin/Employees";
export default function App() {
  let _user = localStorage.getItem("user");
  let isLoggedIn = false;
  if (_user) {
    isLoggedIn = true;
  }
  const [user, setUser] = useState({
    isAuthenticated: isLoggedIn,

  });
  const [userRole, setUserRole] = useState({ role: "trainee" });
  console.log(user.isAuthenticated);
  console.log(userRole.role);
  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />

          <Route element={<LayOut />}>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
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
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </UserContext.Provider>
  );
}
