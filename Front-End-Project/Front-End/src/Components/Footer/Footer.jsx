import React from 'react';

function FooterComponent() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 border-t border-gray-300 dark:border-gray-700">
      <section className="py-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <h6 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Accommodations for fun
            </h6>
          </div>

          <div className="space-y-2">
            <h6 className="text-lg font-semibold text-red-600 dark:text-red-400">Join Us</h6>
            <p>
              <a href="/Login" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                Sign Up
              </a>
            </p>
            <p>
              <a href="/Register" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                Register
              </a>
            </p>
            <p>
              <a href="/About" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                About Us
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h6 className="text-lg font-semibold text-red-600 dark:text-red-400">Get Started</h6>
            <p>
              <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                Our Accommodations
              </a>
            </p>
            <p>
              <a href="/Reservations" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                My Reservations
              </a>
            </p>
            <p>
              <a href="/Support" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                Support
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h6 className="text-lg font-semibold text-red-600 dark:text-red-400">Contact</h6>
            <p>
              <span className="text-gray-600 dark:text-gray-300">New York, NY 10012, US</span>
            </p>
            <p>
              <span className="text-gray-600 dark:text-gray-300">info@thinair.com</span>
            </p>
            <p>
              <span className="text-gray-600 dark:text-gray-300">+ 01 234 567 88</span>
            </p>
          </div>
        </div>
      </section>

      <section className="pt-4 border-t border-gray-300 dark:border-gray-700">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2023 Copyright
        </div>
      </section>
    </footer>
  );
}

export default FooterComponent;