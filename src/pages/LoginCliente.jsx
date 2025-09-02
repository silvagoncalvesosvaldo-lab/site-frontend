import React, { useState } from 'react';

const LoginCliente = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Cliente:', { email, senha });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Login Cliente</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCliente;
