import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container p-5">
      <h1 className="display-3 text-light">
        {currentUser
          ? `Welcome ${currentUser.email}`
          : "Hi, sign up or sign in"}
      </h1>
    </div>
  );
};

export default Home;
