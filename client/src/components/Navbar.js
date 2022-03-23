import { FaAlignLeft } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Navbar";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user, logoutUser, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => toggleSidebar()}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">Hello, {user?.name}!</h3>
        </div>

        {user && (
          <div className="btn-container">
            <button className="btn" onClick={() => logoutUser()}>
              logout
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Navbar;
