import { Link } from "react-router-dom";
import logo from "/logo.jpg";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        The Manhole Matrix
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Accidents Everyday</Link>
        <Link to="/new-issue">Report Accident</Link>
        <Link to="/new-issue">Report Issue</Link>
        <Link to="/dashboard">Status of Problems</Link>
      </div>
      <div className="navbar-right">
        <Link to="/login">Login/Register</Link>
      </div>
    </div>
  );
}

export default Navbar;
