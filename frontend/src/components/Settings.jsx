import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  Switch,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Divider,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  // Function to validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  // Function to handle saving changes
  const handleSaveChanges = () => {
    if (!username || !email) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Simulate saving changes (you can replace this with an API call)
    toast({
      title: "Changes Saved",
      description: "Your profile has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setUsername("");
    setEmail("");
  };

  return (
    <Box position="relative" minH="100vh">
      {/* Settings Content */}
      <Box
        p={{ base: 4, md: 6 }}
        maxW={{ base: "100%", md: "900px" }}
        mx="auto"
        mt={{ base: 6, md: 10 }}
        borderRadius="lg"
        boxShadow="2xl"
        _dark={{ bg: "gray.800" }}
        zIndex={1}
        position="relative"
      >
        <Heading size={{ base: "lg", md: "xl" }} mb={4} textAlign="center" color="#00a8a8">
          Settings
        </Heading>

        {/* Dark Mode Toggle */}
        <FormControl display="flex" alignItems="center" mb={4}>
          <FormLabel>Dark Mode</FormLabel>
          <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        </FormControl>

        <Divider my={4} />

        {/* Edit Profile Section */}
        <Heading size={{ base: "md", md: "lg" }} mb={3}>
          Edit Profile
        </Heading>

        <FormControl mb={3}>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>

        <Button
          colorScheme="teal"
          mt={2}
          width={{ base: "100%", md: "auto" }}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>

        <Divider my={6} />

        {/* FAQ Section */}
        <Heading size={{ base: "md", md: "lg" }} mb={3}>
          FAQs & Guidelines
        </Heading>

        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">About Us?</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              Click on the link to know more about FinBridge{" "}
              <Link to="/aboutus">
                <Text color="teal">About Us</Text>
              </Link>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">How do I reset my password?</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              You can reset your password from the login page using the "Forgot Password" option.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Settings;