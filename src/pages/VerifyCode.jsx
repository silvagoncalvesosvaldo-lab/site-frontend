function VerifyCode() {
  return (
    <div>
      <h1>Verificação de Código</h1>
      <p>Digite o código que você recebeu para confirmar sua identidade.</p>
      <form>
        <input type="text" placeholder="Código de verificação" />
        <button type="submit">Verificar</button>
      </form>
    </div>
  );
}

export default VerifyCode;

