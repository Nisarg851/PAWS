import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";
import BrowsePage from "./Pages/BrowsePage";
import ReportDetailPage from "./Pages/ReportDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/report/:id" element={<ReportDetailPage />} />
    </Routes>
  )
}

export default App

