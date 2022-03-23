import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useAppContext } from "../context/appContext";
import links from "../utils/links";
import Logo from "./Logo";

export const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={"sidebar-container" + (showSidebar ? " show-sidebar" : "")}
      >
        <div className="content">
          <button className="close-btn" onClick={() => toggleSidebar()}>
            <FaTimes />
          </button>

          <header>
            <Logo />
          </header>

          <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link;

              return (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                  key={id}
                  onClick={() => toggleSidebar()}
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
