import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';

const AddAccommodation = () => {
  const [formData, setFormData] = useState({
    title: '',
    host: '',
    location: '',
    description: '',
    price: '',
    imageUrl: '',
    images: [],
  });
  const [additionalImage, setAdditionalImage] = useState('');
  const navigate = useNavigate();
  const user = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddImage = () => {
    if (additionalImage) {
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, additionalImage],
      }));
      setAdditionalImage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3030/api/accommodations', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 201) {
        console.log('Accommodation added successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding accommodation:', error);
    }
  };

  if (!user.token) {
    return (
      <div className="w-full p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-center text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">Add Accommodation</h1>
        <p className="text-lg">
          You need to <Link to="/login" className="text-red-600 dark:text-red-400 hover:underline">log in</Link> or{' '}
          <Link to="/register" className="text-red-600 dark:text-red-400 hover:underline">register</Link> to add accommodation.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gray-100 dark:bg-gray-900 min-h-screen overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">Add Accommodation</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-400 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100"
        />
        <input
          type="text"
          name="host"
          placeholder="Host"
          value={formData.host}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-400 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-400 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-400 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100"
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price per night"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-400 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Main Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-400 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100"
        />
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Additional Image URL"
            value={additionalImage}
            onChange={(e) => setAdditionalImage(e.target.value)}
            className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-400 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100"
          />
          <button type="button" onClick={handleAddImage} className="bg-red-600 dark:bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-500">
            Add Image
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {formData.images.map((image, index) => (
            <img key={index} src={image} alt={`Additional ${index + 1}`} className="w-32 h-32 object-cover rounded-lg shadow-md" />
          ))}
        </div>
        <button type="submit" className="w-full bg-red-600 dark:bg-red-400 text-white p-3 rounded-lg hover:bg-red-700 dark:hover:bg-red-500">
          Add Accommodation
        </button>
      </form>
    </div>
  );
};

export default AddAccommodation;