import * as React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [announcements, setAnnouncements] = React.useState([]);
  const [programs, setPrograms] = React.useState([]);
  // const promises = [];
  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // Perform the fetch operation
        const response = await fetch("/api/announcement/getAllAnnouncement");
        const result = await response.json();

        setAnnouncements(result.announcements);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    /*   announcements?.map((data) => {
      // console.log(data._id);
      promises.push(isDateOlderThan5Days(data.updatedAt, data._id));
    });
    Promise.all(promises)
      .then((results) => {
        //console.log("All promises resolved:", results);
        // Continue with the results
      })
      .catch((error) => {
        console.error("At least one promise rejected:", error);
      }); */
    // console.log("promises" + promises);
    const fetchProgramsList = async () => {
      try {
        // Perform the fetch operation
        const response = await fetch("/api/train/getAllImplementedProgram");
        const result = await response.json();
        //console.log(result.data.implementedProgram);
        setPrograms(result.data.implementedProgram);
        // console.log(programs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProgramsList();
    fetchAnnouncements();
  }, []);

 /*  function isDateOlderThan5Days(previousDate, _id) {
    const currentDate = new Date();
    const timeDifference = currentDate - new Date(previousDate);
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    if (daysDifference > 3) {
      //console.log("true");
      return deleteResource(_id);
    }
  } */

  function isWithinNextSevenDays(dateString) {
    //  console.log(dateString);
    const currentDate = new Date();
    const comparedDate = new Date(dateString);
    const timeDifference = comparedDate - currentDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference >= 0 && daysDifference <= 7;
  }
/* 
  const deleteResource = async (_id) => {
    try {
      const response = await fetch("api/announcement/deleteAnnouncement", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // You may need to include additional headers, such as authorization headers
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
    }
  };
 */
  //console.log("programs", programs);
  return (
    <>
      <div className="box1 flex flex-col justify-center items-center p-4 sm:flex-row sm:justify-center sm:items-center sm:pt-10 flex-wrap">
        <div className="chat-notification box2 bg-gradient-to-r from-indigo-400 to-cyan-300 shadow-xl mb-4 sm:mb-0 sm:mr-4">
          <Link
            to="/schedule"
            className="btn bg-blue-300 rounded-full font-serif text-center font-bold  text-white  p-2 mt-2"
          >
            Admin Role
          </Link>
          <Link
            to="/trainer"
            className="btn bg-indigo-400 rounded-full font-serif text-center  text-white font-bold  p-2 mt-2"
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
        <div className="chat-notification bg-gradient-to-r from-indigo-400 to-cyan-300 rounded-md shadow-xl overflow-y-auto h-64 w-74 mb-4 sm:mb-0 sm:w-1/2 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-200">
          <div className="chat-notification-content">
            {announcements.map((announcement, i) => {
              return (
                <div key={i}>
                  <h4 className="chat-notification-title font-bold text-white  p-2 font-serif">
                    Announcement {i + 1}
                  </h4>
                  <p className="chat-notification-message font-semibold text-blue-700 p-1 text-lift">
                    {announcement.announcement}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chat-notification sm:mb-0">
          <div className="chat-notification-logo-wrapper text-blue-700 flex flex-col flex-shrink">
            <h4 className="chat-notification-title bg-gradient-to-r from-indigo-400 to-cyan-300 text-center font-bold    font-sans  text-white">
              The Week Programs
            </h4>
            <table className="myTable">
              {programs
                .filter((data) => isWithinNextSevenDays(data.date))
                .map((data) => {
                  return (
                    <tr>
                      <td>{data.programName}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
