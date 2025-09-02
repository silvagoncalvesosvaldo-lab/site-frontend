import React from "react";

function CadastroCliente() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastro de Cliente</h1>
      <form>
        <div>
          <label>Nome: </label>
          <input type="text" placeholder="Digite seu nome" />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" placeholder="Digite seu email" />
        </div>
        <div>
          <label>Senha: </label>
          <input type="password" placeholder="Digite sua senha" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroCliente;
