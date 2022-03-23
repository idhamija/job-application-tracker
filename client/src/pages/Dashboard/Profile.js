import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow } from "../../components";
import { useAppContext } from "../../context/appContext";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      displayAlert();
      return;
    }
    updateUser({ name, email, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        <div className="form-center">
          {/* name */}
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />

          {/* email */}
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          {/* location */}
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          <div></div>
          <button
            className="btn btn-block"
            style={{ marginTop: "2rem" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
