import React from "react";
import {
  Flex,
  VStack,
  Image,
  Text,
  Button,
  IconButton,
  useBreakpointValue,
  Box,
  Collapse,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { 
  HamburgerIcon, 
  CloseIcon
} from "@chakra-ui/icons";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen: isSidebarOpen, onToggle: toggleSidebar } = useDisclosure({ defaultIsOpen: true });
  const { isOpen: isMobileSidebarOpen, onToggle: toggleMobileSidebar } = useDisclosure();

  return (
    <Flex
      as="nav"
      direction="column"
      align="flex-start"
      justify="flex-start"
      width={{ base: "100%", md: isSidebarOpen ? "250px" : "60px" }}
      height="100vh"
      bg="#00a8a8"
      color="white"
      position="sticky"
      top="0"
      left="0"
      zIndex="1000"
      overflowY="auto"
      transition="width 0.3s ease"
    >
      <Box p={{ base: 4, md: "1.5rem" }} width="100%" display="flex" alignItems="center" justifyContent="space-between">
        {isSidebarOpen && (
          <Flex align="center">
            <Image src="./Fynancea (4).png" alt="Logo" boxSize={{ base: "50px", md: "60px" }} />
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" ml={2}>
              FinBridge
            </Text>
          </Flex>
        )}
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
          size="sm"
          colorScheme="whiteAlpha"
          onClick={toggleSidebar}
          display={{ base: "none", md: "block" }}
        />
      </Box>
      <Collapse in={isMobile ? isMobileSidebarOpen : isSidebarOpen} animateOpacity>
        <VStack spacing={4} align="flex-start" width="100%" p={{ base: 4, md: "1.5rem" }}>
          {isLoggedIn ? (
            <>
              <Link to="/loggedinhome"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">Home</Button></Link>
              <Link to="/transactions"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">Transactions</Button></Link>
              <Link to="/investmentanalytics"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">Investment Analytics</Button></Link>
              <Link to="/notification"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">Notifications</Button></Link>
              <Link to="/settings"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">Settings</Button></Link>
              <Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/guesthome"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">Home</Button></Link>
              <Link to="/login"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">Login</Button></Link>
              <Link to="/signup"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">Sign Up</Button></Link>
              <Link to="/aboutus"><Button variant="ghost" colorScheme="whiteAlpha.500" width="100%" justifyContent="flex-start">About Us</Button></Link>
            </>
          )}
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default Navbar;
