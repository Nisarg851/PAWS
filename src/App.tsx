import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";
import BrowsePage from "./Pages/BrowsePage";
import ReportDetailPage from "./Pages/ReportDetailPage";
import CreateReportPage from "./Pages/CreateReportPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/report/:id" element={<ReportDetailPage />} />
      <Route path="/create" element={<CreateReportPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App

