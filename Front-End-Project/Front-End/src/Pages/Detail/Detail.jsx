import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAccommodations } from '../../Context/AccommodationContext';
import { useUser } from '../../Context/UserContext';

function DetailPage() {
  const userState = useUser();
  const navigate = useNavigate();
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
      const response = await fetch(`http://localhost:3030/api/reservations/accommodation/${accommodationId}`);
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
        console.error('Failed to fetch unavailable dates');
      }
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
    }
  }, []);

  const handleReservation = async () => {
    if (!userState.token) return navigate('/login');

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
          navigate('/reservations');
        } else if (response.status === 409) {
          setErrorMessage('The selected dates are already booked. Please choose different dates.');
        } else {
          console.error('Reservation failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Invalid reservation dates');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {detailAccommodation ? (
        <>
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{detailAccommodation?.title}</h1>
          <img src={mainImage} alt={detailAccommodation?.title} className="w-full h-96 object-cover rounded-lg shadow-md mb-6" />
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[detailAccommodation?.imageUrl, ...(detailAccommodation?.images || [])]
              .filter((image) => image)
              .map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${detailAccommodation?.title} ${index + 1}`}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg shadow-sm hover:shadow-lg"
                />
              ))}
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">Host:</span>
                <div className="text-gray-600 dark:text-gray-300">{detailAccommodation?.host}</div>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">Location:</span>
                <div className="text-gray-600 dark:text-gray-300">{detailAccommodation?.location}</div>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">Description:</span>
                <div className="text-gray-600 dark:text-gray-300">{detailAccommodation?.description}</div>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">Price:</span>
                <div className="text-gray-600 dark:text-gray-300">${detailAccommodation?.price} per night</div>
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Check-in:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  excludeDates={unavailableDates}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

              <button
                onClick={handleReservation}
                className="w-full bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                Reserve
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
