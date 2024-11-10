import React, { useState, useEffect } from 'react';
import { useUser } from '../../Context/UserContext';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const userState = useUser();

  useEffect(() => {
    if (userState.token) {
      fetch('http://localhost:3030/api/reservations/user/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userState.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setReservations(data);
        })
        .catch((error) => console.error('Error fetching reservations:', error));
    }
  }, [userState.token]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTotalPrice = (checkin, checkout, pricePerNight) => {
    const startDate = new Date(checkin);
    const endDate = new Date(checkout);
    const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return numberOfNights * pricePerNight;
  };

  const handleRemoveReservation = (reservationId) => {
    if (!userState.token) {
      alert('You need to be logged in to remove a reservation.');
      return;
    }

    fetch(`http://localhost:3030/api/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userState.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation._id !== reservationId)
          );
        } else {
          console.error('Failed to delete reservation');
        }
      })
      .catch((error) => console.error('Error deleting reservation:', error));
  };

  const handlePaymentSelection = () => {
    if (!userState.token) {
      alert('You need to be logged in to continue to payment.');
      return;
    }

    setIsPaymentSelected(true);
    setActiveModal('payment');
  };

  if (!userState.token) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-6">My Reservations</h1>
        <p className="text-lg">
          You need to <a href="/login" className="text-red-600 dark:text-red-400 hover:underline">log in</a> or{' '}
          <a href="/register" className="text-red-600 dark:text-red-400 hover:underline">register</a> to view your reservations.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative mb-4">
      <h1 className="text-4xl font-bold text-center text-red-600 dark:text-red-400 mb-6">My Reservations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {reservation.accommodation && (
              <>
                <img
                  src={reservation.accommodation.imageUrl}
                  alt="Accommodation"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {reservation.accommodation.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Period: {formatDate(reservation.checkin)} - {formatDate(reservation.checkout)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Total Price: ${calculateTotalPrice(reservation.checkin, reservation.checkout, reservation.accommodation.price)}
                  </p>
                  {!isPaymentSelected ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRemoveReservation(reservation._id)}
                        className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-800"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Remove
                      </button>
                      <button
                        onClick={handlePaymentSelection}
                        className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-800"
                      >
                        <FontAwesomeIcon icon={faArrowRight} /> Continue to Payment
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsPaymentSelected(false);
                        handleRemoveReservation(reservation._id);
                      }}
                      className="bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:focus:ring-gray-800"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {activeModal === 'payment' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Select Your Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setActiveModal('confirmation')}
                className="flex flex-col items-center justify-center p-6 bg-blue-100 dark:bg-blue-800 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition ease-in-out duration-300"
              >
                <img src="https://banner2.cleanpng.com/20180802/xri/5c06c331d802e115c4f41577cf477ba0.webp" alt="Mastercard" className="w-16 mb-4" />
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">Mastercard</span>
              </button>
              <button
                onClick={() => setActiveModal('confirmation')}
                className="flex flex-col items-center justify-center p-6 bg-yellow-100 dark:bg-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-700 transition ease-in-out duration-300"
              >
                <img src="https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_640.png" alt="PayPal" className="w-16 mb-4" />
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">PayPal</span>
              </button>
              <button
                onClick={() => setActiveModal('confirmation')}
                className="flex flex-col items-center justify-center p-6 bg-green-100 dark:bg-green-800 rounded-lg hover:bg-green-200 dark:hover:bg-green-700 transition ease-in-out duration-300"
              >
                <img src="https://redlight.se/wp-content/uploads/2015/12/produkt-swish.png" alt="Swish" className="w-16 mb-4" />
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">Swish</span>
              </button>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:focus:ring-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {activeModal === 'confirmation' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Payment Successful</h2>
            <p className="text-lg text-gray-700 dark:text-gray-100 mb-6">Your payment has been processed. We will send a confirmation email shortly.</p>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;