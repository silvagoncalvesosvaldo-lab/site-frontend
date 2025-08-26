// src/pages/api/verificar-codigo.js
// Função chamada pela tela de verificação.
// Ela encaminha o código digitado para o BACKEND e repassa o resultado.

export default async function handler(req, res) {
  try {
    // 1) Pega os dados que vieram do front
    //    (se vier via fetch do próprio front usando body JSON)
    const body = req?.body || {};
    const { codigoDigitado, phone } = body; // "phone" é opcional; use se seu backend exigir

    if (!codigoDigitado) {
      return res
        .status(400)
        .json({ success: false, message: "Código não informado." });
    }

    // 2) Lê a URL do backend do .env (ex.: VITE_API_BASE=http://localhost:8080)
    const API_BASE = import.meta?.env?.VITE_API_BASE;
    if (!API_BASE) {
      return res.status(500).json({
        success: false,
        message:
          "VITE_API_BASE não está definida no .env. Configure e reinicie o dev server.",
      });
    }

    // 3) Chama o backend para VALIDAR o código
    //    -> Ajuste o caminho se o seu endpoint for diferente (ex.: /api/2fa/verify)
    const resp = await fetch(`${API_BASE}/2fa/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Envie o que seu backend espera. Exemplo comum:
      body: JSON.stringify({ code: codigoDigitado, phone }),
    });

    // 4) Interpreta a resposta do backend
    //    Aqui espero algo tipo: { ok: true/false, message: "..." }
    const data = await resp.json().catch(() => ({}));
    const ok = resp.ok && (data.ok ?? data.success ?? resp.status === 200);

    if (ok) {
      return res.status(200).json({
        success: true,
        message: data.message || "Código verificado com sucesso.",
        data,
      });
    }

    // Se o backend respondeu erro (401/400/etc.)
    return res.status(resp.status || 401).json({
      success: false,
      message: data.message || "Código incorreto ou expirado.",
      data,
    });
  } catch (error) {
    console.error("Erro ao verificar código:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor.",
    });
  }
}