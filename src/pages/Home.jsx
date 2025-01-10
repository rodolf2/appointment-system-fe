import { Outlet } from "react-router-dom";
import Buttons from "../components/Buttons";

const Home = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Home;
