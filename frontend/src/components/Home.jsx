import React, { useState, useEffect } from 'react';
import { Box } from "@chakra-ui/react";
import LoggedInHome from './LoggedInHome';
import GuestHome from './GuestHome';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Box>
      {user ? <LoggedInHome user={user} /> : <GuestHome />}
    </Box>
  );
};

export default Home;
