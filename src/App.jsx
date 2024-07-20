import { Routes, Route } from 'react-router-dom';
import Header from "./components/custom/Header.jsx";
import Hero from "./components/custom/Hero";
import CreateTrip from "./create-trip/CreateTrip.jsx";
import ViewTrip from "./view-trip/[tripId]/ViewTrip.jsx";
import MyTrips from "./my-trips/MyTrips.jsx";
import { useDarkMode } from './DarkModeContext';

function App() {
  const { darkMode } = useDarkMode();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/view-trip/:tripId" element={<ViewTrip />} />
          <Route path="/my-trips" element={<MyTrips />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;