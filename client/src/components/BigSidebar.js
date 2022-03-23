import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "../components/Logo";
import { useAppContext } from "../context/appContext";
import links from "../utils/links";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={"sidebar-container" + (showSidebar ? "" : " show-sidebar")}
      >
        <div className="content">
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

export default BigSidebar;
