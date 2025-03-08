import React from "react";
import { Box, Heading, Text, Container, VStack } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Box bg="gray.50" minHeight="100vh" p={{ base: 4, md: 8 }}>
      <Container maxW="container.lg" centerContent>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} color="teal.500" textAlign="center">
            About Us
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" textAlign="center">
            Welcome to FinBridge, your trusted partner in personal finance management.
          </Text>

          <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="md">
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="teal.500" mb={4}>
              Our Mission
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
              At FinBridge, our mission is to empower individuals to take control of their finances. We provide tools and insights to help you budget, save, and invest wisely.
            </Text>
          </Box>

          <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="md">
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="teal.500" mb={4}>
              Our Team
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
              We are a team of passionate developers, designers, and financial experts dedicated to making personal finance simple and accessible for everyone.
            </Text>
          </Box>

          <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="md">
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="teal.500" mb={4}>
              Why Choose Us?
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
              - Easy-to-use interface<br />
              - Comprehensive financial tools<br />
              - Personalized insights and recommendations<br />
              - Secure and private
            </Text>
          </Box>

          <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="md">
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="teal.500" mb={4}>
              Contact Us
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
              Have questions or feedback? Reach out to us at <strong>support@finbridge.com</strong>.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutUs;