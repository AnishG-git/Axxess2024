import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-indigo-600 shadow-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M17.5 2a4.5 4.5 0 0 1 2.951 7.897c.355.967.549 2.013.549 3.103A9 9 0 1 1 3.55 9.897a4.5 4.5 0 1 1 6.791-5.744 9.05 9.05 0 0 1 3.32 0A4.494 4.494 0 0 1 17.5 2zM10 13H8a4 4 0 0 0 7.995.2L16 13h-2a2 2 0 0 1-3.995.15L10 13z" />
            </g>
          </svg>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Pulmo</span>
        </a>
        <button
          onClick={toggleMenu}
          id="menuToggle"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:block lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={isOpen ? 'block w-full md:w-auto ' : 'hidden lg:block w-full md:w-auto '} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-indigo-600 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-violet-300 text-semibold bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 transition-300 "
                aria-current="page"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/dashboard"
                className="block py-2 px-3 text-violet-300 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-300"
                >
                  Dashboard
                </a>
            </li>

            <li>
              <a
                href="/inventory"
                className="block py-2 px-3 text-violet-300 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-300"
              >
                Inventory
              </a>
            </li>

            <li>
              <a
                href="#"
                // className="block py-2 px-3 text-violet-300 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-300"
                className="block py-2 px-3 text-violet-300 rounded font-semiboldmd:border-0 md:p-0 transition-300" 
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/form"
                className="block py-2 px-3 text-violet-300 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-300"
              >
                Daily Log
              </a>
            </li>
            <li>
              <a
                href="/form"
                className="block py-2 px-3 text-violet-300 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-300"
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
