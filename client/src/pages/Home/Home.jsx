import * as React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
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
            <h4 className="chat-notification-title">Anouncement</h4>
            <p className="chat-notification-message">You have a new message!</p>
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
