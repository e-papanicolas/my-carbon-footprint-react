import "../styles/NavBar.css";
import { NavLink } from "react-router-dom";
import React from "react";
//import logo from "../../images/treeLogo.png";

function NavBar({ handleLogOut }) {
  //Style for navbar links
  const linkStyle = {
    color: "white",
    backgrounColor: "black",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div className="navbar-container">
      <div className="user-info-container">
        <NavLink to="/">
          {/* <img src={logo} alt="logo" className="logo" /> */}
        </NavLink>
        <h1 id="name-of-app" style={{ color: "white" }}>
          My Carbon Footprint
        </h1>
      </div>

      <div className="nav-buttons">
        <ul>
          <li>
            <NavLink style={linkStyle} activestyle={{ color: "blue" }} to="/">
              Estimates
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={linkStyle}
              activestyle={{ color: "blue" }}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user"
              style={linkStyle}
              activestyle={{ color: "blue" }}
            >
              My Info
            </NavLink>
          </li>
          <li>
            <p
              onClick={handleLogOut}
              style={linkStyle}
              className="log-out-button"
            >
              Log Out
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
