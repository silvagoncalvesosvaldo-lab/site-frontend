import React, { useState } from "react";
import { account } from "../lib/appwrite";

function ResetSenha() {
  const [novaSenha, setNovaSenha] = useState("12345678");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const user = await account.updatePassword(novaSenha);
      console.log(user);
      alert("Senha resetada com sucesso! Agora tente logar novamente.");
    } catch (err) {
      console.error(err);
      alert("Erro ao resetar senha: " + err.message);
    }
  };

  return (
    <div>
      <h2>Resetar Senha do Admin</h2>
      <form onSubmit={handleReset}>
        <div>
          <label>Nova senha</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Resetar</button>
      </form>
    </div>
  );
}

export default ResetSenha;
