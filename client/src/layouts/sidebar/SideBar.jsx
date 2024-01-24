import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { FaPeoplePulling } from "react-icons/fa6";

import { MdEmojiPeople } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import UserContext from "../../pages/userContext";
import Cookies from "js-cookie";

const SideBar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const userContext = React.useContext(UserContext);
  let _user = localStorage.getItem("user");

  const sidebarRef = useRef();
  const { pathname } = useLocation();
  useEffect(() => {
    if (_user) {
      let user = JSON.parse(_user);
      setIsLoggedIn(true);
      setUserName(user.name);
    }
  });
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    {
      name: "Admin",
      icon: FaArrowsDownToPeople,
      menus: [
        "schedule",
        "employees",
        "rooms",
        "programs",
        "reports",
        "announcements",
        "Absence",
      ],
    },
    {
      name: "Trainer",
      icon: MdEmojiPeople,
      menus: ["trainer"],
    },
    {
      name: "Trainee",
      icon: FaPeoplePulling,
      menus: ["trainee", "evaluation"],
    },
  ];

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998]  bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white  text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden  md:relative fixed
         h-screen "
      >
        <div className="flex items-center    gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            className="rounded-full object-fit"
            src="https://i.postimg.cc/T1VYdTCM/logo2.png"
            width={45}
            alt=""
          />
          <span className="text-xl whitespace-pre">Over Seas</span>
        </div>

        <div className="flex flex-col  h-full ">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden  scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/about"} className="link">
                <BsPerson size={23} className="min-w-max" />
                About
              </NavLink>
            </li>
            <li>
              <NavLink to={"/companypage"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Company Page
              </NavLink>
            </li>

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Roles
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            {/* <li>
              <NavLink to={"/settings"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Settings
              </NavLink>
            </li> */}
          </ul>
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-20 flex flex-col gap-1  font-medium overflow-x-hidden overflow-y-hidden ">
            <li>
              {isLoggedIn ? (
                <>
                  <div className="flex flex-col items-center gap-2">
                    {open || isTabletMid ? (
                      <div>Hello {username.toUpperCase()}</div>
                    ) : (
                      ""
                    )}
                    <div className="flex gap-2 pb-32 items-center cursor-pointer ">
                      {open || isTabletMid ? <span>Log Out</span> : ""}
                      <FaSignOutAlt
                        onClick={() => {
                          userContext.setUser({ isAuthenticated: false });
                          userContext.setUserRole({ role: "" });
                          localStorage.clear();
                          Cookies.remove("access_token");
                          window.location.reload();
                          navigate("/");
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <NavLink to={"/signin"} className="link ">
                  <BsPerson size={23} className="min-w-max" />
                  Sign In
                </NavLink>
              )}
            </li>
          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: 0,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </>
  );
};

export default SideBar;
