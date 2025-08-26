// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import AdminLoginPage from "./pages/AdminLoginPage";
import VerificarCodigoPage from "./pages/VerificarCodigoPage.jsx";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redireciona / para /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/verificar-codigo" element={<VerificarCodigoPage />} />

        {/* Fallback 404 → página personalizada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
