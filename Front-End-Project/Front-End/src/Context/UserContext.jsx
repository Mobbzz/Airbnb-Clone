import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultState = {
  token: null,
  user: null,
  reservations: [],
  setToken: (token) => {},
  makeReservation: (reservation) => {},
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(defaultState);

  const setToken = (token) => {
    setUserState((prevState) => ({ ...prevState, token }));
  };

  const makeReservation = (reservation) => {
    setUserState((prevState) => ({
      ...prevState,
      reservations: [...prevState.reservations, reservation],
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token !== null) {
      setUserState((prevState) => ({ ...prevState, token }));
    }
  }, []);

  useEffect(() => {
    if (userState.token) {
      fetchUserData();
    }
  }, [userState.token]);

  const fetchUserData = async () => {
    try {
      const userData = await fetch('http://localhost:3030/api/users/me', {
        headers: {
          Authorization: `Bearer ${userState.token}`,
        },
      });

      if (!userData.ok) {
        throw new Error(`API Error: ${userData.status} ${userData.statusText}`);
      }

      const reservationsData = await fetch('http://localhost:3030/api/reservations/user/me', {
        headers: {
          Authorization: `Bearer ${userState.token}`,
        },
      });

      if (!reservationsData.ok) {
        throw new Error(`API Error: ${reservationsData.status} ${reservationsData.statusText}`);
      }

      const user = await userData.json();
      const reservations = await reservationsData.json();

      setUserState((prevState) => ({ ...prevState, user, reservations }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ ...userState, setToken, makeReservation }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
