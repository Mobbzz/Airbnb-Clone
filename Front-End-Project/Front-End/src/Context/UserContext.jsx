import React, { createContext, useContext, useState, useEffect } from 'react';

// Default state for the user context
const defaultState = {
  token: null,
  user: null,
  reservations: [],
  setToken: (token) => {},
  makeReservation: (reservation) => {},
};

// Create UserContext using createContext
const UserContext = createContext(defaultState);

// UserProvider component to provide the user context to its children
const UserProvider = ({ children }) => {
  // State to manage user data
  const [userState, setUserState] = useState(defaultState);

  // Set token function
  const setToken = (token) => {
    setUserState((prevState) => ({ ...prevState, token }));
  };

  // Make reservation function
  const makeReservation = (reservation) => {
    setUserState((prevState) => ({
      ...prevState,
      reservations: [...prevState.reservations, reservation],
    }));
  };

  useEffect(() => {

    const token = localStorage.getItem("TOKEN")
    if (token !== null){
        setUserState((prevState) => ({
            ...prevState,
            token
          }));     
      
    }
  }, []); 


  // useEffect to simulate fetching user and reservations data from an API
  useEffect(() => {
    // Simulated API call to fetch user and reservations data
   
    // Call the fetchUserData function to simulate API call
   
    if (userState.token){ fetchUserData();}
  }, [userState.token]); // Effect will re-run whenever the token changes

  const fetchUserData = async () => {
    try {
      // Simulated API response with Authorization header
      const userData = await fetch('http://localhost:3030/api/users/me', {
        headers: {
          Authorization: `Bearer ${userState.token}`, // Add Bearer token here
        },
      });

      const reservationsData = await fetch('http://localhost:3030/api/reservations/user/me', {
        headers: {
          Authorization: `Bearer ${userState.token}`, // Add Bearer token here
        },
      });

      // Simulated JSON parsing
      const user = await userData.json();
      const reservations = await reservationsData.json();

      // Update user state with fetched data
      setUserState((prevState) => ({ ...prevState, user, reservations }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // Provide the user context value to its children components
  return (
    <UserContext.Provider value={{ ...userState, setToken, makeReservation }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context value
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
