import React from "react";
import Navbar from "../components/Navbar.jsx";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", background: "#fff" }}>{children}</div>
    </>
  );
}
