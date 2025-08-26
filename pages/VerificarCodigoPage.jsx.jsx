import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerificarCodigoPage = () => {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const handleVerificar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/verificar-codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Código inválido");
      }

      // Se o código for válido, redireciona para o painel admin
      navigate("/painel-admin");

    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Verificação 2FA</h2>
      <p>Digite o código enviado para o WhatsApp do administrador.</p>
      <form onSubmit={handleVerificar} style={styles.form}>
        <input
          type="text"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Verificando..." : "Verificar Código"}
        </button>
        {erro && <p style={styles.error}>{erro}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer" },
  error: { color: "red", marginTop: "10px" },
};

export default VerificarCodigoPage;
