import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import React from "react";
import UserContext from "./userContext";
import toast from "react-hot-toast";
export default function Login() {
  const userContext = useContext(UserContext);
  const { register, handleSubmit, formState, watch } = useForm(); //first step

  const { errors } = formState;
  const navigate = useNavigate();
  const [jobNumber, password] = watch(["jobNumber", "password"]);

  async function onSubmit() {
    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobNumber, password }),
      });
      const data = await res.json();

      if (data.code === "404") {
        toast.error("Wrong credentials");
        return false;
      }

      if (data.status === "success") {
        const _user = {
          jobNumber: data.data.user.jobNumber,
          name: data.data.user.name,
          token: data.token,
          roleTokens: data.roleTokens,
        };
        localStorage.setItem("user", JSON.stringify(_user));
        userContext.setUser({ isAuthenticated: true });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <div className="min-h-screen flex  items-center justify-center">
      <div className="flex flex-col bg-gradient-to-r from-indigo-400 to-cyan-300  shadow-md px-2 sm:px-4 md:px-6 lg:px-8 py-3 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-white">
          LogIn To Your Account
        </div>
        <div className="mt-2">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col ">
              <label
                htmlFor="email"
                className="mb-2 text-xs sm:text-sm tracking-wide  text-white mt-2 "
              >
                Job Number:
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
                  name="jobNumber"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Job Number"
                  {...register("jobNumber", {
                    required: "Employee number is required",
                  })}
                />
              </div>
              {errors?.email && (
                <span className="text-red-500">{errors.jobNumber.message}</span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="password"
                className=" text-xs sm:text-sm tracking-wide text-white mt-2 mb-2"
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
                <span className="text-red-500">
                  Please fill at least 10 character{" "}
                </span>
              )}
              {errors?.password &&
                errors.password.type === "hasLowerLetter" && (
                  <span className="text-red-500">
                    Password must have a lower alphabet{" "}
                  </span>
                )}
              {errors?.password &&
                errors.password.type === "hasUpperLetter" && (
                  <span className="text-red-500">
                    Password must have an Upper alphabet{" "}
                  </span>
                )}
              {errors?.password &&
                errors.password.type === "hasSpecialChar" && (
                  <span className="text-red-500">
                    Password must have a SpecialChar{" "}
                  </span>
                )}
            </div>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                className="flex  justify-center focus:outline-none text-white text-sm sm:text-base bg-indigo-500 hover:bg-indigo-900 rounded-full py-2 w-40  transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Log IN</span>
                <span>
                  {/* <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg> */}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
