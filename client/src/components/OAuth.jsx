import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

import UserContext from "../pages/userContext";
import toast from "react-hot-toast";
export default function OAuth() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await res.json(); //this to see it in the console
      console.log(data);
      if (data.code === "409") toast.error(data.message);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      if (data.status === "success") {
        console.log("worked");
        const _user = {
          email: data.data.user.email,
          token: data.token,
        };
        localStorage.setItem("user", JSON.stringify(_user));

        userContext.setUser({ isAuthenticated: true });

        setLoading(false);
        setError(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={handleGoogleClick}
        className="relative mt-6 border rounded-full py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200"
      >
        <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"></span>

        <div className="flex items-center justify-center ml-5 font-bold">
          {" "}
          <span className="flex">Continue with Google</span>
          <FcGoogle className="flex h-10 w-10 ml-5" />
        </div>
      </button>
    </>
  );
}
