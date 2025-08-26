import { useState } from "react";
import { apiPost, withAuthGet } from "../api/http";

export default function TesteLoginTransp() {
  const [email, setEmail] = useState("transp1@exemplo.com");
  const [senha, setSenha] = useState("123");
  const [resp, setResp] = useState(null);
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setResp(null);
    try {
      const r = await apiPost("/login-transp", { email, senha });
      // Salva o token no mesmo localStorage usado pelo withAuthGet
      localStorage.setItem("token", r.token);
      setResp({ etapa: "login", data: r });
    } catch (err) {
      setErro(err.message || String(err));
    }
  }

  async function testarProtegido() {
    setErro("");
    setResp(null);
    try {
      const r = await withAuthGet("/protegido-transp");
      setResp({ etapa: "protegido-transp", data: r });
    } catch (err) {
      setErro(err.message || String(err));
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Teste Login — Transportador</h1>

      <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="transp1@exemplo.com"
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="123"
          />
        </label>

        <button type="submit" style={{ padding: "10px 16px" }}>
          Entrar (Transportador)
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        <button onClick={testarProtegido} style={{ padding: "10px 16px" }}>
          Testar /protegido-transp
        </button>
      </div>

      {erro && (
        <pre style={{ background: "#fee", padding: 12, marginTop: 16, whiteSpace: "pre-wrap" }}>
          Erro: {erro}
        </pre>
      )}

      {resp && (
        <pre style={{ background: "#eef", padding: 12, marginTop: 16, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(resp, null, 2)}
        </pre>
      )}
    </div>
  );
}
