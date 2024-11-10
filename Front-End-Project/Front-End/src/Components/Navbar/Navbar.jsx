import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import { useTheme } from '../../Context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faHamburger, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = () => {
  const user = useUser();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    user.setToken(null);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu((prevShowUserMenu) => !prevShowUserMenu);
  };

  return (
    <nav className="navbar p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="navbar-logo">
          <h1 className="text-3xl font-extrabold">
            <Link to="/" className="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
              ThinAirbnb
            </Link>
          </h1>
        </div>
        <button
          className="lg:hidden block text-gray-800 dark:text-white focus:outline-none"
          aria-controls="navbar-menu"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faHamburger} className="text-2xl" />
        </button>
        <div className="hidden lg:flex space-x-8 items-center" id="navbar-menu">
          <Link to="/" className="text-lg text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            Home
          </Link>
          <Link to="/about" className="text-lg text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            About
          </Link>
          <Link to="/reservations" className="text-lg text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            Reservations
          </Link>
          <Link to="/support" className="text-lg text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            Support
          </Link>
          <Link to="/add-accommodation" className="text-lg text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            Add Accommodation
          </Link>
          {user.token ? (
            <button onClick={handleLogout} className="text-lg text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
              Logout
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="text-gray-800 dark:text-white focus:outline-none"
              >
                <FontAwesomeIcon icon={faCircleUser} className="text-2xl" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-2 rounded-lg shadow-lg">
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Login
                  </Link>
                  <Link to="/register" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none transition ease-in-out duration-300"
          >
            <FontAwesomeIcon
              icon={theme === 'light' ? faMoon : faSun}
              className="text-2xl text-gray-800 dark:text-yellow-300 hover:text-yellow-500 dark:hover:text-yellow-400"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
