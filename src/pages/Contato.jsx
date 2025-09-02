export default function Contato() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800'>
      <h1 className='text-3xl font-bold text-blue-600 mb-4'>Contato</h1>
      <p className='max-w-xl text-center mb-4'>
        Entre em contato conosco pelo email:
        <a href='mailto:suporte@osmelhoresdotransporte.com' className='text-blue-500 underline ml-1'>
          suporte@osmelhoresdotransporte.com
        </a>
      </p>
    </div>
  );
}
