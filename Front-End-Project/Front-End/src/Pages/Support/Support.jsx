import React, { useState } from 'react';
import axios from 'axios';

function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3030/api/support', formData);
      console.log('Response:', response.data);
      setMessage('Your request has been sent.');
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error('Error posting support request:', error);
      setMessage('An error occurred while sending your request.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Support</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
          >
            Send Support Request
          </button>
          {message && <div className="text-center text-blue-500 dark:text-blue-300 mt-4">{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default SupportPage;
