import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Transactions from './components/Transactions';
import InvestorAnalytics from './components/InvestorAnalytics';
import Notification from './components/Notification';
import Settings from './components/Settings';
import GuestHome from './components/GuestHome';
import LoggedInHome from './components/LoggedInHome';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import FinancialEducation from "./components/FinancialEducation";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // Check if user is logged in on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setIsLoading(false); // Set loading to false after checking
  }, []);

  // Handle login
  const handleLogin = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Show a loading spinner or placeholder while checking auth state
  if (isLoading) {
    return <Box textAlign="center" mt={10}>Loading...</Box>;
  }

  return (
    <Router>
      {/* Main Layout */}
      <Flex minH="100vh">
        {/* Navbar (Sidebar) */}
        <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />

        {/* Main Content */}
        <Box flex={1} overflowY="auto" p={{ base: 2, md: 4 }}>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/loggedinhome" /> : <Navigate to="/guesthome" />}
            />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/loggedinhome" /> : <Login onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/loggedinhome" /> : <Signup />}
            />
            <Route path="/transactions" element={isLoggedIn ? <Transactions /> : <Navigate to="/login" />} />
            <Route path="/investmentanalytics" element={isLoggedIn ? <InvestorAnalytics /> : <Navigate to="/login" />} />
            <Route path="/notification" element={isLoggedIn ? <Notification /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
            <Route
              path="/loggedinhome"
              element={isLoggedIn ? <LoggedInHome user={user} onLogout={handleLogout} /> : <Navigate to="/guesthome" />}
            />
            <Route path="/guesthome" element={<GuestHome />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/financial-education" element={<FinancialEducation />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
};

export default App;