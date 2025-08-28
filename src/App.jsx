import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import VerifyCode from "./pages/VerifyCode";
import UiTest from "./pages/UiTest";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verificar" element={<VerifyCode />} />
          <Route path="/uitest" element={<UiTest />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
