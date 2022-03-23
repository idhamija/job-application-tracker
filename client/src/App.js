import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error, Landing } from "./pages";
import {
  AddJob,
  AllJobs,
  Overview,
  Profile,
  SharedLayout,
} from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Overview />} />
            <Route path="all-jobs" element={<AllJobs />}></Route>
            <Route path="add-job" element={<AddJob />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
