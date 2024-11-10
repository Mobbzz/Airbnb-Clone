import React from 'react';
import { Link } from 'react-router-dom';
import { useAccommodations } from '../../Context/AccommodationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
  const { accommodations } = useAccommodations();

  if (!accommodations.length) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div className="w-full p-6 bg-gray-100 dark:bg-gray-900 min-h-screen overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodations.map((accommodation) => (
          <div key={accommodation._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <Link to={`/Detail/${accommodation._id}`} className="block">
              <img
                src={accommodation.imageUrl}
                alt={accommodation.title}
                className="w-full h-48 object-cover hover:opacity-90 transition-opacity duration-300"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {accommodation.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  ${accommodation.price} / night
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon icon={faWifi} className="mr-2" /> Free Wifi
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
