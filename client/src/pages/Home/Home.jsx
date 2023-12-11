import * as React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [announcements, setAnnouncements] = React.useState([]);
  const promises = [];
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
    announcements?.map((data) => {
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
      });
    // console.log("promises" + promises);
    fetchAnnouncements();
  }, []);

  function isDateOlderThan5Days(previousDate, _id) {
    const currentDate = new Date();
    const timeDifference = currentDate - new Date(previousDate);
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    if (daysDifference > 3) {
      console.log("true");
      return deleteResource(_id);
    }
  }

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

  //console.log("Is any object's updatedAt older than 5 days:", filteredArray);
  return (
    <>
      <div className="box1 flex justify-center items-center">
        <div className="chat-notification box2">
          <Link to="/schedule" className="btn">
            Admin Role
          </Link>
          <Link to="/trainer" className="btn">
            Trainer Role
          </Link>
          <Link to="/trainee" className="btn">
            Trainee Role
          </Link>
        </div>

        <div className="chat-notification">
          <div className="chat-notification-content">
            {announcements.map((announcement, i) => {
              return (
                <div key={i}>
                  <h4 className="chat-notification-title">
                    Announcement {i + 1}
                  </h4>
                  <p className="chat-notification-message">
                    {announcement.announcement}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chat-notification">
          <div className="chat-notification-logo-wrapper">
            <h4 className="chat-notification-title">The Week Programs</h4>
            <table className="myTable">
              <tr>
                <td>Alfreds Futterkiste</td>
              </tr>
              <tr>
                <td>Sweden</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
              </tr>
              <tr>
                <td>Ernst Handel</td>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
              </tr>
              <tr>
                <td>Sweden</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
              </tr>
              <tr>
                <td>Ernst Handel</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
