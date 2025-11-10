import react, { useDebugValue } from 'react';

export default function Navbar({ onLogout, adminName}) {
  return (
    <div className='flex items-center justify-between bg-white p-4 shadow rounded-xl'>
      <h1 className='text-xl font-bold'>Dashboard Overview</h1>
      <div className='flex items-center gap-4'>
        <input
         type="text"
         placeholder='Search...'
         className="px-3 py-2 rounded border shadow-sm focus-outline-none focus:ring focus:ring-blue-200" 
         />
         <div className='bg-gray-100 px-4 py-2 rounded text-sm font-semibold text-gray-700'>
          Admin: { adminName }
         </div>

         <button
         onClick={onLogout}
         className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'>
          Logout
         </button>
      </div>
    </div>
  )
  
}
