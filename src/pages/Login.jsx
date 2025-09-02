function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Digite seu email" />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" placeholder="Digite sua senha" />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;

