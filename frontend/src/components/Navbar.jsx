import React from "react";
import {
  Flex,
  VStack,
  Image,
  Text,
  Button,
  IconButton,
  Box,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = ({ isLoggedIn, onLogout, children }) => {
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex>
      {/* Sidebar */}
      <Box
        as="nav"
        position="fixed"
        left="0"
        top="0"
        width={isOpen ? { base: "70%", md: "250px" } : "0"}
        height="100vh"
        bg="#00a8a8"
        color="white"
        zIndex="1100"
        transition="width 0.3s ease"
        boxShadow={isOpen ? "lg" : "none"}
        overflowX="hidden"
      >
        {/* Sidebar Header */}
        <Flex p={4} alignItems="center" justifyContent="space-between">
          {isOpen && (
            <Flex alignItems="center">
              <Image src="./Fynancea (4).png" alt="Logo" boxSize="50px" />
              <Text fontSize="lg" fontWeight="bold" ml={2}>FinBridge</Text>
            </Flex>
          )}
          {isOpen && (
            <IconButton
              icon={<CloseIcon />}
              size="md"
              colorScheme="whiteAlpha"
              onClick={onToggle}
            />
          )}
        </Flex>

        {/* Sidebar Content */}
        <VStack spacing={4} align="flex-start" p={4} flex="1" width="100%">
          {isLoggedIn ? (
            <>
              <NavItem to="/loggedinhome" label="Home" onToggle={onToggle} />
              <NavItem to="/transactions" label="Transactions" onToggle={onToggle} />
              <NavItem to="/investmentanalytics" label="Investment Analytics" onToggle={onToggle} />
              <NavItem to="/notification" label="Notifications" onToggle={onToggle} />
              <NavItem to="/financial-education" label="Financial Education" onToggle={onToggle} />
              <NavItem to="/settings" label="Settings" onToggle={onToggle} />
              <Button
                variant="ghost"
                width="100%"
                justifyContent="flex-start"
                color="white"
                _hover={isMobile ? {} : { bg: "whiteAlpha.300", transform: "scale(1.05)", transition: "0.2s" }}
                onClick={() => { onLogout(); onToggle(); }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavItem to="/guesthome" label="Home" onToggle={onToggle} />
              <NavItem to="/login" label="Login" onToggle={onToggle} />
              <NavItem to="/signup" label="Sign Up" onToggle={onToggle} />
              <NavItem to="/aboutus" label="About Us" onToggle={onToggle} />
            </>
          )}
        </VStack>
      </Box>

      {/* Sidebar Toggle Button (Always Visible) */}
      {!isOpen && (
        <IconButton
          icon={<HamburgerIcon />}
          size="md"
          colorScheme="teal"
          onClick={onToggle}
          position="fixed"
          top="1rem"
          left="1rem"
          zIndex="1200"
        />
      )}

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex="1000"
          onClick={onToggle}
        />
      )}

      {/* Main Content */}
      <Box
        as="main"
        flex="1"
        ml={{ base: "0", md: isOpen ? "250px" : "0" }}
        transition="margin-left 0.3s ease"
        p="20px"
        width="100%"
      >
        {children}
      </Box>
    </Flex>
  );
};

// Reusable Navbar Item Component
const NavItem = ({ to, label, onToggle }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Link to={to} onClick={onToggle}>
      <Button
        variant="ghost"
        color="white"
        width="100%"
        justifyContent="flex-start"
        _hover={isMobile ? {} : { bg: "whiteAlpha.300", transform: "scale(1.05)", transition: "0.2s" }}
      >
        {label}
      </Button>
    </Link>
  );
};

export default Navbar;
