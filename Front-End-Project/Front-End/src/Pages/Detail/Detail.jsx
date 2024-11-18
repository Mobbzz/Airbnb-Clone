import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAccommodations } from '../../Context/AccommodationContext';
import { useUser } from '../../Context/UserContext';
import Swal from 'sweetalert2';

function DetailPage() {
  const userState = useUser();
  const { id } = useParams();
  const accommodations = useAccommodations();
  const { detailAccommodation, getDetailAccommodation } = accommodations;

  const [mainImage, setMainImage] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchAccommodation = useCallback(async () => {
    if (id && !hasFetched) {
      try {
        setLoading(true);
        await getDetailAccommodation(id);
        setHasFetched(true);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accommodation details:', error);
        setLoading(false);
      }
    }
  }, [id, getDetailAccommodation, hasFetched]);

  useEffect(() => {
    fetchAccommodation();
  }, [fetchAccommodation]);
  
  useEffect(() => {
    if (detailAccommodation) {
      setMainImage(detailAccommodation.imageUrl);
      fetchUnavailableDates(detailAccommodation._id);
    }
  }, [detailAccommodation]);
  
  const fetchUnavailableDates = useCallback(async (accommodationId) => {
    if (!accommodationId) return;
    try {
      const response = await fetch(`http://localhost:3030/api/reservations/accommodation/${accommodationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const reservations = await response.json();
        const dates = [];
        reservations.forEach((reservation) => {
          const checkin = new Date(reservation.checkin);
          const checkout = new Date(reservation.checkout);

          for (let d = new Date(checkin); d <= checkout; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
          }
        });
        setUnavailableDates(dates);
      } else {
        console.error('Failed to fetch unavailable dates', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
    }
  }, []);
  
  const handleReservation = async () => {
    if (!userState.token) {
      Swal.fire({
        title: 'Login Required',
        text: 'You need to log in or register to make a reservation.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      return;
    }

    if (startDate && endDate) {
      const reservationData = {
        accommodation: detailAccommodation._id,
        checkin: startDate,
        checkout: endDate,
      };

      try {
        const response = await fetch('http://localhost:3030/api/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userState.token}`,
          },
          body: JSON.stringify(reservationData),
        });

        if (response.ok) {
          Swal.fire({
            title: 'Success!',
            text: 'Your reservation has been made.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } else {
          const errorData = await response.json();
          Swal.fire({
            title: 'Error!',
            text: `Failed to make reservation: ${errorData.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while making the reservation.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div className="w-full p-4 md:p-6 bg-white dark:bg-gray-900 min-h-screen overflow-x-hidden">
      {detailAccommodation ? (
        <>
          <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">{detailAccommodation?.title}</h1>
          <div className="relative w-full h-96 mb-8">
            <img src={mainImage} alt={detailAccommodation?.title} className="w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[detailAccommodation?.imageUrl, ...(detailAccommodation?.images || [])]
              .filter((image) => image)
              .map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${detailAccommodation?.title} ${index + 1}`}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer w-32 h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
                />
              ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{detailAccommodation?.description}</p>
              </div>
              <div className="flex flex-col gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <span className="font-semibold text-lg text-gray-800 dark:text-gray-300">Host:</span>
                  <div className="text-gray-600 dark:text-gray-300">{detailAccommodation?.host}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <span className="font-semibold text-lg text-gray-800 dark:text-gray-300">Location:</span>
                  <div className="text-gray-600 dark:text-gray-300">{detailAccommodation?.location}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <span className="font-semibold text-lg text-gray-800 dark:text-gray-300">Price:</span>
                  <div className="text-gray-600 dark:text-gray-300">${detailAccommodation?.price} per night</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Reserve Your Stay</h2>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Check-in:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  excludeDates={unavailableDates}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-red-600 dark:focus:border-red-400 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Check-out:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  excludeDates={unavailableDates}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-red-600 dark:focus:border-red-400 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
              </div>

              {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

              <button
                onClick={handleReservation}
                className="w-full bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition transform hover:scale-105"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-300">Accommodation not found</div>
      )}
    </div>
  );
}

export default DetailPage;
