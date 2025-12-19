import React from 'react';
import { Box, Button, Heading, Text, Input } from '@chakra-ui/react';
import ParticlesBg from "particles-bg";

const Signup = () => {
  return (
    <Box maxW="md" mx="auto" mt={10}>
      {/* Background Animation */}
      <Box position="absolute" top={0} left={0} width="100%" height="100%" zIndex={0} pointerEvents="none">
        <ParticlesBg type="cobweb" bg={true} color={'#48D1CC'} />
      </Box>

      <Heading as="h2" size="xl" color="#48D1CC.500" mb={2} textAlign="center">
        Sign Up
      </Heading>
      <Text fontSize="md" color="#2a5f5e.500" mb={6} textAlign="center">
        Create your account and manage your finances easily.
      </Text>
      <Box mt={8}>
        <Input placeholder="Email Address" type="email" size="lg" borderColor="#48D1CC" mt={5} />
        <Input placeholder="Password" type="password" size="lg" borderColor="#48D1CC" mt={5} />
        <Input placeholder="Confirm Password" type="password" size="lg" borderColor="#48D1CC" mt={5} />
      </Box>

      <Button
        backgroundColor="#48D1CC"
        mt={5}
        size="lg"
        width="full"
        color="black"
        transition="0.3s"
        _hover={{ bg: "teal.500", transform: "scale(1.05)" }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
