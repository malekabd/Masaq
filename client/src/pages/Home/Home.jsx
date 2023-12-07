import * as React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [announcements, setAnnouncements] = React.useState([]);
  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // Perform the fetch operation
        const response = await fetch("/api/announcement/getAllAnnouncement");
        const result = await response.json();
        console.log(result.announcements);
        setAnnouncements(result.announcements);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnnouncements();
  }, []);
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
