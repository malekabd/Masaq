import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import OAuth from "../components/OAuth";
export default function Login() {
  const { register, handleSubmit, formState, watch } = useForm(); //first step
  const { errors } = formState;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const [email, password] = watch(["email", "password"]);

  async function onSubmit() {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // it's a much secure way
      });
      const data = await res.json(); //this to see it in the console
      //console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/home");
    } catch (error) {
      toast.error("Wrong Credential!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
      setError(error.message);
    }
  }
  //third Step
  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Login To Your Account
        </div>
        <OAuth/>
        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">
              Or Login With Email
            </span>
          </div>
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input
                  //type="email"
                  name="email"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="E-Mail Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
              </div>
              {errors?.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Password:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    validate: {
                      length: (value) =>
                        value && /(?=.*[0-9])/.test(value) ? true : false,
                      hasLowerLetter: (value) =>
                        value && /(?=.*[a-z])/.test(value) ? true : false,
                      hasUpperLetter: (value) =>
                        value && /(?=.*[A-Z])/.test(value) ? true : false,
                      hasSpecialChar: (value) =>
                        value && /(?=.*[!@#\\$%\\^&\\*])/.test(value)
                          ? true
                          : false,
                    },
                  })}
                />
              </div>
              {errors?.password && errors.password.type === "length" && (
                <span className="text-danger">
                  Please fill at least 10 character{" "}
                </span>
              )}
              {errors?.password &&
                errors.password.type === "hasLowerLetter" && (
                  <span className="text-danger">
                    Password must have a lower alphabet{" "}
                  </span>
                )}
              {errors?.password &&
                errors.password.type === "hasUpperLetter" && (
                  <span className="text-danger">
                    Password must have an Upper alphabet{" "}
                  </span>
                )}
              {errors?.password &&
                errors.password.type === "hasSpecialChar" && (
                  <span className="text-danger">
                    Password must have a SpecialChart{" "}
                  </span>
                )}
            </div>

            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <a
                  href="#"
                  className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                >
                  Forgot Your Password?
                </a>
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Login</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <Link to="/signup">
          <div className="flex justify-center items-center mt-6">
            <div
              target="_blank"
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span className="ml-2">You do not have an account?</span>
            </div>
          </div>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}
