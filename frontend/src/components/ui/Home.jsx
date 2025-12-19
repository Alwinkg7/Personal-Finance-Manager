import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Stat, StatLabel, Progress } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import ParticlesBg from "particles-bg";

const Home = () => {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      {/* Background Animation */}
      <Box position="absolute" top={0} left={0} width="100%" height="100%" zIndex={0}>
        <ParticlesBg type="cobweb" bg={true} color={'#48D1CC'} />
      </Box>

      {/* Content */}
      <Box position="relative" zIndex={1} color="white">
        <Heading as="h1" size="4xl" mb={6} color={"#48D1CC"}>
          Welcome to Personal Finance Manager
        </Heading>
        <Heading as="h2" size="3xl" mb={6} color={"#48D1CC"}>
          Manage your expenses and income
        </Heading>
        
        <Text fontSize="md" size="1xl" color={"#48D1CC"}>
          Welcome! This app helps you track expenses, manage income, and plan budgets to achieve your financial goals.
          
        </Text>
      </Box>


      <VStack spacing={4} mt={10}>
        <Text fontSize="md" color={"#48D1CC"}>
          Sign up now and start tracking your expenses effortlessly.
        </Text>
        <Link to="/signup">
          <Button size="lg" backgroundColor={"#48D1CC"} transition="0.3s" _hover={{ bg: "teal.500", transform: "scale(1.05)" }}>
            Get Started
          </Button>
        </Link>
      </VStack>


      <Box bg="#2a5f5e" mt={15} p={6} borderRadius="lg" boxShadow="lg" maxW="lg" mx="auto">
        <HStack spacing={6} justify="center" mb={4}>
          <Box bg="#3b7f7e" p={4} borderRadius="md" boxShadow="md" textAlign="center" w="150px">
            <Text fontSize="lg" color="gray.200">Balance</Text>
            <Text fontSize="2xl" fontWeight="bold" color="yellow.300">$5,230</Text>
          </Box>

          <Box bg="#3b7f7e" p={4} borderRadius="md" boxShadow="md" textAlign="center" w="150px">
            <Text fontSize="lg" color="gray.200">Income</Text>
            <Text fontSize="2xl" fontWeight="bold" color="lime.300">$8,200</Text>
          </Box>

          <Box bg="#3b7f7e" p={4} borderRadius="md" boxShadow="md" textAlign="center" w="150px">
            <Text fontSize="lg" color="gray.200">Expenses</Text>
            <Text fontSize="2xl" fontWeight="bold" color="orange.300">$2,970</Text>
          </Box>
        </HStack>

          {/* Custom Progress Bar */}
          <Text color="gray.300" mb={2}>Monthly Spending</Text>
          <Box w="100%" bg="gray.500" h="10px" borderRadius="md" overflow="hidden">
            <Box w="60%" h="full" bg="#48D1CC" />
          </Box>
        </Box>
      </Box>
  );
};

export default Home;
