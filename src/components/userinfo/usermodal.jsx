import React from 'react';

function Usermodal({ user, onClose }) {
  if (!user) return null; 

  return (
    <div className="flex flex-col items-center pb-10 bg-gray-800">
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg bg-slate-400"
        src="https://via.placeholder.com/150" 
        alt="Profile"
      />
      <h5 className="mb-1 text-xl font-medium text-white dark:text-white">{user.name}</h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">{user.position}</span>
      
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={user.email || ''}
          readOnly
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
      </div>

      <div className="flex mt-4 md:mt-6">
        <a
          href="#"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Approved
        </a>
        <a
          href="#"
          className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
         Disapproved
        </a>
      </div>
     
    </div>
  );
}

export default Usermodal;
