import React, { useState } from "react";

export default function Navbar() {
  const [imgOk, setImgOk] = useState(true);

  const outer = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,.1)",
  };

  const container = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 16px",
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  };

  const logoImg = { height: 32, width: "auto", display: "block" };
  const logoFallback = { fontWeight: 800, color: "#0EA5E9", fontSize: 20, marginLeft: 6 };

  const loginBtn = {
    background: "#1843A3",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    fontWeight: 600,
    textDecoration: "none",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <nav id="topbar" className="fixed top-0 left-0 w-full z-50 overflow-hidden mb-0" style={outer}>
        <div style={container}>
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            {imgOk ? (
              <img src="/logo.png" alt="Logo OMT" style={logoImg} onError={() => setImgOk(false)} />
            ) : (
              <span style={logoFallback}>OMT</span>
            )}
          </a>

          <a href="#login" style={loginBtn}>Para quem já é cadastrado Acessar/Login</a>
        </div>
      </nav>

      <div style={{ height: 56 }} aria-hidden />
    </>
  );
}
