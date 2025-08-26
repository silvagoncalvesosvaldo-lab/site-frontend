// src/pages/teste-login.jsx
import { useState } from 'react';
import { apiPost, withAuthGet } from '../api/http';

export default function TesteLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Login
  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setMsg(''); setUser(null);
    try {
      const res = await apiPost('/login', { email, senha });
      if (res.ok && res.token) {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setMsg('Login realizado com sucesso!');
      } else {
        throw new Error(res.error || 'Falha no login');
      }
    } catch (err) {
      setError(err.message || 'Erro inesperado');
    }
  }

  // Rota protegida
  async function handleProtegido() {
    setError(''); setMsg(''); setUser(null);
    try {
      const res = await withAuthGet('/protegido');
      setMsg(res.message);
      setUser(res.user);
    } catch (err) {
      setError(err.message || 'Erro inesperado');
    }
  }

  // Sair (limpar token)
  function handleSair() {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setMsg('');
    setError('');
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Teste de Login</h1>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {msg && <p style={{ color: 'green' }}>{msg}</p>}

      {token && (
        <>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Token salvo:</strong></p>
            <textarea readOnly value={token} style={{ width: '100%', height: '80px' }} />
          </div>

          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleProtegido}>Chamar /protegido</button>
            <button onClick={handleSair}>Sair (limpar token)</button>
          </div>
        </>
      )}

      {!token && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleProtegido} disabled title="Faça login para habilitar">
            Chamar /protegido
          </button>
        </div>
      )}

      {user && (
        <pre style={{ background: '#f4f4f4', padding: '1rem', marginTop: '1rem' }}>
{JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
}
