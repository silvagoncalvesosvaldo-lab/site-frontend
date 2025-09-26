import React from "react";

export default function Topbar() {
  const wrap = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: "#1843A3",
    color: "#fff",
    height: 40,
    display: "flex",
    alignItems: "center",
  };

  const inner = {
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
    padding: "0 16px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const btn = {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
  };

  const btnHover = (e, enter) => {
    e.currentTarget.style.background = enter
      ? "rgba(255,255,255,0.25)"
      : "rgba(255,255,255,0.15)";
  };

  return (
    <div style={wrap}>
      <div style={inner}>
        <a
          href="#login"
          style={btn}
          onMouseEnter={(e) => btnHover(e, true)}
          onMouseLeave={(e) => btnHover(e, false)}
        >
          Para quem já é cadastrado Acessar/Login
        </a>
      </div>
    </div>
  );
}
