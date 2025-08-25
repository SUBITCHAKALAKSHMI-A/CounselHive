import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DistrictColleges from "./pages/DistrictColleges";
import TamilnaduCollegeMap from "./pages/TamilnaduCollegeMap"; // or ./components/TamilnaduCollegeMap

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/district-colleges" element={<DistrictColleges />} />
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
