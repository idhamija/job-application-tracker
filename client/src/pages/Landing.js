import { Navigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo, Register } from "../components";
import { useAppContext } from "../context/appContext";

const Home = () => {
  const { user } = useAppContext();

  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              job
              <span> application </span>
              tracker
            </h1>

            <p>
              We keep track of the job application process, so that you can
              focus your mind on things that really matter.
            </p>
          </div>

          <Register />
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
