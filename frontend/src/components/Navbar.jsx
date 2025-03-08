import React, { useState } from "react";
import { Flex, HStack, Image, Text, Button, IconButton, useBreakpointValue, Stack, Box } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = ({ isLoggedIn, user, onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={{ base: 4, md: "1.5rem" }}
      bg="#00a8a8"
      color="white"
    >
      {/* Logo and Title */}
      <HStack spacing={4}>
        <Image
          src=".\Fynancea (4).png" // Replace with the path to your logo
          alt="Logo"
          boxSize={{ base: "50px", md: "60px" }}
        />
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
          FinBridge
        </Text>
      </HStack>

      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <IconButton
          aria-label="Open Menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          size="md"
          colorScheme="whiteAlpha"
          onClick={toggleMenu}
        />
      )}

      {/* Navigation Links */}
      {(isMobile && isOpen) || !isMobile ? (
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
          mt={{ base: 4, md: 0 }}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 2, md: 4 }}
            align="center"
          >
            {isLoggedIn ? (
              <>
                <Link to="/loggedinhome">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Home
                  </Button>
                </Link>
                <Link to="/transactions">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Transactions
                  </Button>
                </Link>
                <Link to="/investmentanalytics">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Investment Analytics
                  </Button>
                </Link>
                <Link to="/notification">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Notifications
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Settings
                  </Button>
                </Link>
                <Link to="/financial-education">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Financial Education
                  </Button>
                </Link>
                <Button variant="ghost" colorScheme="whiteAlpha.500" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/guesthome">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Home
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/aboutus">
                  <Button variant="ghost" colorScheme="whiteAlpha.500">
                    About Us
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Flex>
  );
};

export default Navbar;