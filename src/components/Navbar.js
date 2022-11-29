import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const { toggleModals } = useContext(UserContext);

  return (
    <nav className="navbar navbar-ligth bg-light px-4">
      <Link to="/" className="navbar-brand">
        AuthJS
      </Link>
      <div>
        <button
          onClick={() => toggleModals("signUp")}
          className="btn btn-primary"
        >
          Sign Up
        </button>
        <button
          onClick={() => toggleModals("signIn")}
          className="btn btn-primary ms-3"
        >
          Sign In
        </button>
        <button className="btn btn-danger ms-3">Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
