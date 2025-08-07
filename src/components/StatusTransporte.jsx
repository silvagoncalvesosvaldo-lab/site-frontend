import React from 'react';

const StatusTransporte = ({ status }) => {
  if (status === 'em_andamento') {
    return (
      <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-600 rounded">
        <p className="text-yellow-800 font-semibold">
          📢 Transporte em andamento
        </p>
      </div>
    );
  }

  if (status === 'finalizado') {
    return null;
  }

  return null;
};

export default StatusTransporte;