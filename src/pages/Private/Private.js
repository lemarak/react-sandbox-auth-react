import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Private = () => {
  const { currentUser } = useContext(UserContext);
  console.log("PRIVATE", currentUser);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default Private;
