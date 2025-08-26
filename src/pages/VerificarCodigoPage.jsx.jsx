import React from 'react';

function VerificarCodigo() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0a0a23',
      color: 'white',
      fontFamily: 'Arial'
    }}>
      <h1>Código enviado via WhatsApp</h1>
      <p>Insira o código recebido para continuar:</p>
      <input
        type="text"
        placeholder="Digite o código"
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          marginTop: '10px',
          textAlign: 'center',
        }}
      />
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          backgroundColor: '#1e90ff',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Verificar
      </button>
    </div>
  );
}

export default VerificarCodigo;
