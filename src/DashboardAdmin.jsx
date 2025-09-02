export default function DashboardAdmin() {
  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold text-red-600 mb-6'>
        Painel do Administrador
      </h1>
      <ul className='space-y-4'>
        <li>
          <a href='#' className='text-blue-500 hover:underline'>
            Gerenciar Clientes
          </a>
        </li>
        <li>
          <a href='#' className='text-blue-500 hover:underline'>
            Gerenciar Transportadores
          </a>
        </li>
        <li>
          <a href='#' className='text-blue-500 hover:underline'>
            Gerenciar Afiliados
          </a>
        </li>
        <li>
          <a href='#' className='text-blue-500 hover:underline'>
            Relatórios
          </a>
        </li>
      </ul>
    </div>
  );
}
