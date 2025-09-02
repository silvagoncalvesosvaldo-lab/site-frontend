import React, { useState } from 'react';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Admin:', { email, senha });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center text-red-600">Login Admin</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
