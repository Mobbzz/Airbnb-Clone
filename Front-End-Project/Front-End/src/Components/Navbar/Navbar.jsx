import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import { useTheme } from '../../Context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars, faSun, faMoon, faTimes } from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = () => {
  const user = useUser();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    user.setToken(null);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu((prevShowUserMenu) => !prevShowUserMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prevShowMobileMenu) => !prevShowMobileMenu);
  };

  return (
    <nav className="navbar p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Hidden on Small Screens */}
        <div className={`navbar-logo ${showMobileMenu ? 'hidden' : 'block'} lg:block`}>
          <h1 className="text-3xl font-extrabold">
            <Link to="/" className="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
              ThinAirbnb
            </Link>
          </h1>
        </div>
        {/* Hamburger menu for small screens */}
        {!showMobileMenu && (
          <button
            className="lg:hidden block text-gray-800 dark:text-white focus:outline-none"
            aria-controls="navbar-menu"
            aria-expanded={showMobileMenu ? "true" : "false"}
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        )}
        {/* Close icon for mobile menu */}
        {showMobileMenu && (
          <button
            className="lg:hidden block text-gray-800 dark:text-white focus:outline-none absolute top-4 right-4"
            aria-controls="navbar-menu"
            aria-expanded={showMobileMenu ? "true" : "false"}
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        )}
        {/* Menu for large screens and mobile */}
        <div
          className={`${
            showMobileMenu ? 'flex' : 'hidden'
          } lg:flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 items-center mt-4 lg:mt-0 transition-all duration-500 ease-in-out transform ${showMobileMenu ? 'translate-y-0 opacity-100 justify-center w-full text-center' : '-translate-y-4 opacity-0 lg:opacity-100 lg:translate-y-0'}`}
          id="navbar-menu"
        >
          {showMobileMenu && (
            <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400 mb-4 text-center w-full">
              ThinAirbnb
            </h1>
          )}
          <Link to="/" className="text-lg font-medium text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            Home
          </Link>
          <Link to="/about" className="text-lg font-medium text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            About
          </Link>
          <Link to="/reservations" className="text-lg font-medium text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            Reservations
          </Link>
          <Link to="/support" className="text-lg font-medium text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            Support
          </Link>
          <Link to="/add-accommodation" className="text-lg font-medium text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
            Add Accommodation
          </Link>
          {user.token ? (
            <button onClick={handleLogout} className="text-lg font-medium text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400">
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
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-2 rounded-lg shadow-lg transition ease-in-out duration-300 transform ${showUserMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}">
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
