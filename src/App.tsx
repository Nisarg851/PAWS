import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";
import BrowsePage from "./Pages/BrowsePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/browse" element={<BrowsePage />} />
    </Routes>
  )
}

export default App

