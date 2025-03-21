import React, { useEffect, useState } from "react";
import { Box, Heading, Text, List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import axios from "axios";

const FinancialAdvice = ({ transactions }) => {
  const [financialAdvice, setFinancialAdvice] = useState([]);

  // Fetch AI-generated advice
  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/financial-advice", {
          transactions,
        });
        setFinancialAdvice(response.data.advice);
      } catch (error) {
        console.error("Failed to fetch AI-generated advice:", error);
      }
    };

    fetchAdvice();
  }, [transactions]);

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" width={{ base: "100%", md: "50%" }}>
      <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
        Financial Advice (AI-Powered)
      </Heading>
      <Text fontSize="md" color="gray.700" mb={6}>
        Here are some personalized tips to help you manage your finances better:
      </Text>

      <List spacing={3}>
        {financialAdvice.map((advice, index) => (
          <ListItem key={index}>
            <ListIcon as={MdCheckCircle} color="teal.500" />
            {advice}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FinancialAdvice;