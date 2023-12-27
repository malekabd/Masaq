import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcement/getAllAnnouncement");
        const result = await response.json();
        setAnnouncements(result.announcements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    const fetchProgramsList = async () => {
      try {
        const response = await fetch("/api/train/getAllImplementedProgram");
        const result = await response.json();
        setPrograms(result.data.implementedProgram);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchProgramsList();
    fetchAnnouncements();
  }, []);

  function isWithinNextSevenDays(dateString) {
    const currentDate = new Date();
    const comparedDate = new Date(dateString);
    const timeDifference = comparedDate - currentDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference >= 0 && daysDifference <= 7;
  }

  return (
    <div className="flex flex-col items-center p-4 sm:flex-row sm:justify-center sm:items-center sm:pt-10 flex-wrap">
      <div className="box2 bg-gradient-to-r from-indigo-400 to-cyan-300 shadow-xl mb-2 sm:mb-0 sm:mr-4">
        <Link
          to="/schedule"
          className="btn bg-blue-300 rounded-full font-serif text-center font-bold text-white p-2 "
        >
          Admin Role
        </Link>
        <Link
          to="/trainer"
          className="btn bg-indigo-400 rounded-full font-serif text-center text-white font-bold p-2 mt-2"
        >
          Trainer Role
        </Link>
        <Link
          to="/trainee"
          className="btn bg-cyan-300 rounded-full font-serif text-center font-bold p-2 mt-2 text-white"
        >
          Trainee Role
        </Link>
      </div>

      <div className="bg-gradient-to-r from-indigo-400 to-cyan-300 rounded-lg shadow-md overflow-y-auto h-48 w-64 mb-4 sm:mb-0 sm:w-1/2 p-4">
        {announcements.map((announcement, i) => (
          <div key={i} className="border-b border-indigo-500 mb-4">
            <p className="chat-notification-message font-semibold text-white p-3">
              {announcement.announcement}
            </p>
          </div>
        ))}
      </div>

      <div className="chat-notification sm:mb-0">
        <div className="chat-notification-logo-wrapper text-blue-700 flex flex-col flex-shrink">
          <h4 className="chat-notification-title bg-gradient-to-r from-indigo-400 to-cyan-300 text-center font-bold font-sans text-white">
            The Week Programs
          </h4>
          <table className="myTable">
            {programs
              .filter((data) => isWithinNextSevenDays(data.date))
              .map((data, index) => (
                <tr key={index}>
                  <td>{data.programName}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}
