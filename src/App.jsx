import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ParkingLots from "./components/ParkingLots";
import ParkingSpaces from "./components/ParkingSpaces";
import ParkingReservations from "./components/ParkingReservations";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/parking-lots">Parking Lots</Link>
            </li>
            <li>
              <Link to="/parking-spaces">Parking Spaces</Link>
            </li>
            <li>
              <Link to="/parking-reservations">Parking Reservations</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/parking-lots" element={<ParkingLots />} />
          <Route path="/parking-spaces" element={<ParkingSpaces />} />
          <Route path="/parking-reservations" element={<ParkingReservations />} />
          <Route
            path="/"
            element={<h2>Welcome! Select an option from the navigation menu.</h2>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
