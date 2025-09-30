import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DistrictColleges from "./pages/DistrictColleges";
import TamilnaduCollegeMap from "./pages/TamilnaduCollegeMap"; // or ./components/TamilnaduCollegeMap
import Login from "./dashboard_main/src/pages/login";
import Signup from "./dashboard_main/src/pages/signup";
import Dashboard from "./dashboard_main/src/pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/district-colleges" element={<DistrictColleges />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/map"
        element={
          <div>
            <h1>Tamil Nadu Engineering Colleges</h1>
            <TamilnaduCollegeMap />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
