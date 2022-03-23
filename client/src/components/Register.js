import { useState, useEffect } from "react";
import { FormRow, Alert } from ".";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Register";

const Register = () => {
  const { isLoading, showAlert, displayAlert, registerUser, loginUser, user } =
    useAppContext();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <>
      <Wrapper className="page full-page">
        <form className="form" onSubmit={onSubmit}>
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert />}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Submit"}
          </button>

          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}

            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </Wrapper>
    </>
  );
};

export default Register;
