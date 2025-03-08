import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  Grid,
  Icon,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWallet, FaChartLine, FaSyncAlt, FaEnvelope, FaPhone, FaCopyright } from 'react-icons/fa';

const GuestHome = () => {
  // Responsive values
  const headingSize = useBreakpointValue({ base: '3xl', md: '6xl' });
  const textSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const featureGridColumns = useBreakpointValue({ base: '1fr', md: 'repeat(3, 1fr)' });
  const testimonialGridColumns = useBreakpointValue({ base: '1fr', md: 'repeat(2, 1fr)' });

  return (
    <Box bg="gray.100" minHeight="100vh">
      {/* Hero Section */}
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height={{ base: '50vh', md: '70vh' }}
        zIndex="1"
        maxWidth="1200px"
        width="100%"
        mx="auto"
        px={{ base: 4, md: 8 }}
      >
        <Heading as="h1" fontSize={headingSize} fontWeight="bold" mb={4} color="teal.500">
          FinBridge
        </Heading>
        <Text fontSize={textSize} color="gray.600" mb={6} maxW={{ base: '100%', md: '80%' }} textAlign="center">
          Take control of your finances with our easy-to-use personal finance manager. Track your expenses, set budgets, and achieve your financial goals.
        </Text>
        <Button
          as={RouterLink}
          to="/signup"
          colorScheme="teal"
          size={buttonSize}
          px={8}
          mb={4}
        >
          Get Started
        </Button>
        <Text color="gray.500">
          Already have an account?{' '}
          <ChakraLink as={RouterLink} to="/login" color="teal.500">
            Log in
          </ChakraLink>
        </Text>
      </Flex>

      {/* Features Section */}
      <Box bg="white" width="100%" py={{ base: 8, md: 16 }} zIndex="1">
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" mb={8} color="gray.800" textAlign="center">
          Why Choose Us?
        </Heading>
        <Grid
          templateColumns={featureGridColumns}
          gap={{ base: 4, md: 8 }}
          maxWidth="1200px"
          mx="auto"
          px={{ base: 4, md: 8 }}
        >
          {/* Feature 1: Expense Tracking */}
          <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center" boxShadow="md" _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}>
            <Icon as={FaWallet} boxSize={10} color="teal.500" mb={4} />
            <Heading as="h3" fontSize="xl" fontWeight="semibold" mb={2}>
              Expense Tracking
            </Heading>
            <Text color="gray.600">
              Easily track your daily expenses and categorize them for better insights.
            </Text>
          </Box>

          {/* Feature 2: Budget Planning */}
          <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center" boxShadow="md" _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}>
            <Icon as={FaChartLine} boxSize={10} color="teal.500" mb={4} />
            <Heading as="h3" fontSize="xl" fontWeight="semibold" mb={2}>
              Budget Planning
            </Heading>
            <Text color="gray.600">
              Set monthly budgets and get alerts when you're close to exceeding them.
            </Text>
          </Box>

          {/* Feature 3: Sync Across Devices */}
          <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center" boxShadow="md" _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}>
            <Icon as={FaSyncAlt} boxSize={10} color="teal.500" mb={4} />
            <Heading as="h3" fontSize="xl" fontWeight="semibold" mb={2}>
              Sync Across Devices
            </Heading>
            <Text color="gray.600">
              Access your financial data from anywhere, on any device.
            </Text>
          </Box>

          {/* Feature 4: AI Financial Advice */}
          <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center" boxShadow="md" _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}>
            <Icon as={FaChartLine} boxSize={10} color="teal.500" mb={4} />
            <Heading as="h3" fontSize="xl" fontWeight="semibold" mb={2}>
              AI Financial Advice
            </Heading>
            <Text color="gray.600">
              Get personalized financial tips and insights powered by AI.
            </Text>
          </Box>

          {/* Feature 5: Budget Challenges */}
          <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center" boxShadow="md" _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}>
            <Icon as={FaSyncAlt} boxSize={10} color="teal.500" mb={4} />
            <Heading as="h3" fontSize="xl" fontWeight="semibold" mb={2}>
              Budget Challenges
            </Heading>
            <Text color="gray.600">
              Participate in fun savings challenges to achieve your financial goals.
            </Text>
          </Box>

          {/* Feature 6: Financial Education */}
          <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center" boxShadow="md" _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}>
            <Icon as={FaEnvelope} boxSize={10} color="teal.500" mb={4} />
            <Heading as="h3" fontSize="xl" fontWeight="semibold" mb={2}>
              Financial Education
            </Heading>
            <Text color="gray.600">
              Learn about budgeting, investing, and more with our curated resources.
            </Text>
          </Box>
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box bg="gray.50" width="100%" py={{ base: 8, md: 16 }} zIndex="1">
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" mb={8} color="gray.800" textAlign="center">
          What Our Users Say
        </Heading>
        <Grid
          templateColumns={testimonialGridColumns}
          gap={{ base: 4, md: 8 }}
          maxWidth="1200px"
          mx="auto"
          px={{ base: 4, md: 8 }}
        >
          {/* Testimonial 1 */}
          <Box bg="white" p={6} borderRadius="lg" textAlign="left">
            <Text color="gray.600" mb={4}>
              "This app has completely changed the way I manage my finances. It's so easy to use and has helped me save so much money!"
            </Text>
            <Text fontWeight="bold" color="gray.800">
              — Johnson K J
            </Text>
          </Box>

          {/* Testimonial 2 */}
          <Box bg="white" p={6} borderRadius="lg" textAlign="left">
            <Text color="gray.600" mb={4}>
              "I love the budgeting feature. It keeps me on track and helps me avoid overspending."
            </Text>
            <Text fontWeight="bold" color="gray.800">
              — Emma Watson
            </Text>
          </Box>
        </Grid>
      </Box>

      {/* Call-to-Action Section */}
      <Box bg="teal.500" width="100%" py={{ base: 8, md: 16 }} zIndex="1">
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          maxWidth="1200px"
          mx="auto"
          px={{ base: 4, md: 8 }}
        >
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" mb={4} color="white">
            Ready to Take Control of Your Finances?
          </Heading>
          <Text fontSize={textSize} color="white" mb={8}>
            Sign up today and start managing your money like a pro.
          </Text>
          <Button
            as={RouterLink}
            to="/signup"
            colorScheme="whiteAlpha"
            size={buttonSize}
            px={8}
          >
            Get Started
          </Button>
        </Flex>
      </Box>

      {/* Footer Section */}
      <Box bg="gray.800" width="100%" py={8} zIndex="1">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          maxWidth="1200px"
          mx="auto"
          px={{ base: 4, md: 8 }}
          color="white"
        >
          {/* Contact Information */}
          <Stack spacing={2} mb={{ base: 4, md: 0 }}>
            <Flex align="center">
              <Icon as={FaEnvelope} boxSize={5} mr={2} />
              <Text>Email: support@finbridge.com</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaPhone} boxSize={5} mr={2} />
              <Text>Phone: 8596741233</Text>
            </Flex>
          </Stack>

          {/* Copyright Notice */}
          <Flex align="center">
            <Icon as={FaCopyright} boxSize={5} mr={2} />
            <Text>2025 FinBridge. All rights reserved.</Text>
          </Flex>

          {/* Links to Privacy Policy and Terms of Service */}
          <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 2, md: 4 }}>
            <ChakraLink as={RouterLink} to="/privacy-policy" color="teal.300">
              Privacy Policy
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/terms-of-service" color="teal.300">
              Terms of Service
            </ChakraLink>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default GuestHome;