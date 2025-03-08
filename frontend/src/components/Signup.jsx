import React, { useState } from "react";
import { Box, Button, Heading, Text, Input, Flex, Container, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '@/authService';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const toast = useToast(); // Initialize the toast hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      toast({
        title: "Account created.",
        description: "You have successfully created an account.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "An error occurred. Sign up failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Box
        maxW={{ base: "90%", md: "md" }}
        mx="auto"
        mt={{ base: 6, md: 10 }}
        p={{ base: 4, md: 6 }}
        borderRadius="lg"
        boxShadow="2xl"
        position="relative"
      >
        <Heading as="h2" size={{ base: "lg", md: "xl" }} color="#48D1CC" mb={2} textAlign="center">
          Create Account
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color="#48D1CC" mb={6} textAlign="center">
          Sign up to get started!
        </Text>

        <form onSubmit={handleSignUp}>
          <Box mt={4}>
            <Input
              placeholder="Username"
              type="text"
              size="lg"
              borderColor="#48D1CC"
              mt={3}
              name="name"
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Email Address"
              type="email"
              size="lg"
              borderColor="#48D1CC"
              mt={3}
              name="email"
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              size="lg"
              borderColor="#48D1CC"
              mt={3}
              name="password"
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              size="lg"
              borderColor="#48D1CC"
              mt={3}
              name="confirmPassword"
              onChange={handleChange}
              required
            />
          </Box>

          <Flex justifyContent="center" mt={4} fontSize="sm">
            <Text mr={1}>Already have an account?</Text>
            <Link to="/login" color="teal.600" _hover={{ textDecoration: "underline" }}>
              Login
            </Link>
          </Flex>

          <Button
            backgroundColor="teal.500"
            mt={6}
            size="lg"
            width="full"
            color="whiteAlpha.800"
            borderRadius="full"
            transition="0.3s"
            _hover={{ bg: "#48D1CC", transform: "scale(1.05)" }}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;