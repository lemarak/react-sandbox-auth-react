import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { auth } from "../firebase-config";

const Navbar = () => {
  const { toggleModals } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert(
        "For some reasons, we can't deconnect. Please check your internet connexion and retry"
      );
    }
  };

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
        <button onClick={logOut} className="btn btn-danger ms-3">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
