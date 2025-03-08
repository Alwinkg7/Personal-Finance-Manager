import React from "react";
import { Box, Heading, Text, VStack, SimpleGrid, Link } from "@chakra-ui/react";

const FinancialEducation = () => {
  return (
    <Box bg="gray.50" minHeight="100vh" p={{ base: 4, md: 8 }}>
      <VStack spacing={{ base: 4, md: 6 }} align="stretch">
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} color="teal.500" textAlign="center">
          Financial Education
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" textAlign="center">
          Learn how to manage your finances effectively with our curated resources.
        </Text>

        {/* Articles Section */}
        <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="md">
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="teal.500" mb={4}>
            Articles
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box>
              <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} color="teal.500" mb={2}>
                Budgeting 101
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                Learn the basics of budgeting and how to create a plan that works for you.
              </Text>
              <Link href="#" color="teal.500" fontWeight="bold">
                Read More →
              </Link>
            </Box>
            <Box>
              <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} color="teal.500" mb={2}>
                Investing for Beginners
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                A beginner's guide to understanding stocks, bonds, and mutual funds.
              </Text>
              <Link href="#" color="teal.500" fontWeight="bold">
                Read More →
              </Link>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Videos Section */}
        <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="md">
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="teal.500" mb={4}>
            Videos
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box>
              <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} color="teal.500" mb={2}>
                How to Save Money
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                Watch this video to learn practical tips for saving money every month.
              </Text>
              <Link href="#" color="teal.500" fontWeight="bold">
                Watch Now →
              </Link>
            </Box>
            <Box>
              <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} color="teal.500" mb={2}>
                Understanding Credit Scores
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                Learn how credit scores work and how to improve yours.
              </Text>
              <Link href="#" color="teal.500" fontWeight="bold">
                Watch Now →
              </Link>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Quizzes Section */}
        <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" boxShadow="md">
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="teal.500" mb={4}>
            Quizzes
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box>
              <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} color="teal.500" mb={2}>
                Budgeting Quiz
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                Test your knowledge of budgeting basics with this interactive quiz.
              </Text>
              <Link href="#" color="teal.500" fontWeight="bold">
                Take Quiz →
              </Link>
            </Box>
            <Box>
              <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} color="teal.500" mb={2}>
                Investing Quiz
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
                How much do you know about investing? Take this quiz to find out.
              </Text>
              <Link href="#" color="teal.500" fontWeight="bold">
                Take Quiz →
              </Link>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default FinancialEducation;