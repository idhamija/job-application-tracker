import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="page full-page">
      <div>
        <h1>404</h1>
        <h3>page not found </h3>
        <br />
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
