import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-indigo-600 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pulmo</span>
        </a>
        <button
          onClick={toggleMenu}
          id="menuToggle"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={isOpen ? "block w-full md:w-auto z-50" : "hidden w-full md:w-auto z-50"}  id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-indigo-600 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <a href="#" className="block py-2 px-3 text-violet-300 text-semibold bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 transition-300 " aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-violet-300 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-300">
                Inventory
              </a>
            </li>

            <li>
              <a href="#" className="block py-2 px-3 text-violet-300 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-violet-300 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-300">
                Daily Log
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
