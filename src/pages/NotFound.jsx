import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">404</h1>
      <p className="text-gray-700 text-center mb-6 max-w-lg">
        Ops! A página que você tentou acessar não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
