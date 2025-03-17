import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App

