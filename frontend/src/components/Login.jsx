import React from 'react';
import { loginUser } from '@/authService';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Text, Input, Flex, Container, useToast } from '@chakra-ui/react';
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const toast = useToast(); // Initialize the toast hook
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser(form);
            onLogin(userData, userData.token); // Call the onLogin function passed from App
            toast({
                title: "Login successful.",
                description: "You have successfully logged in.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate('/loggedinhome');
        } catch (error) {
            toast({
                title: "An error occurred. Login failed.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Container>
    

            {/* Login Form */}
            <Box
                maxW={{ base: "90%", md: "md" }}
                mx="auto"
                mt={{ base: 10, md: 20 }}
                p={{ base: 4, md: 6 }}
                borderRadius="lg"
                boxShadow="2xl"
                position="relative"
                zIndex={1}
                bg="rgba(255, 255, 255, 0.8)" // Semi-transparent background
            >
                <Heading as="h2" size={{ base: "lg", md: "xl" }} color="#48D1CC" mb={2} textAlign="center">
                    Welcome Back!
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color="#48D1CC" mb={6} textAlign="center">
                    Login to continue
                </Text>
                <form onSubmit={handleLogin}>
                    <Box mt={4}>
                        <Input
                            placeholder="Email Address"
                            name="email"
                            type="email"
                            size="lg"
                            borderColor="teal.300"
                            mt={3}
                            _focus={{ borderColor: "teal.500" }}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            size="lg"
                            borderColor="teal.300"
                            mt={3}
                            _focus={{ borderColor: "teal.500" }}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Flex justifyContent="space-between" mt={4} fontSize="sm">
                        <Link color="teal.600" _hover={{ textDecoration: "underline" }}>
                            Forgot Password?
                        </Link>
                        <Link to="/signup" color="teal.600" _hover={{ textDecoration: "underline" }}>
                            Create an Account
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
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;