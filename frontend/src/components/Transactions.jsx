import React, { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Badge, Button } from "@chakra-ui/react";
import ParticlesBg from "particles-bg";
import { getTransactions } from "@/Transactionservice"; // Import the service

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(token);
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <Box
      p={{ base: 4, md: 6 }}
      maxW={{ base: "100%", md: "900px" }}
      mx="auto"
      mt={{ base: 10, md: 20 }}
      bg="transparent"
      borderRadius="lg"
      boxShadow="2xl"
      position="relative"
    >
      {/* Background Animation */}
      {/* <Box position="absolute" top={0} left={0} width="100%" height="100%" zIndex={0}>
        <ParticlesBg type="cobweb" bg={true} color={'#48D1CC'} />
      </Box> */}

      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={4} textAlign="center" color="#00a8a8">
        Transaction History
      </Text>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.600">Date</Th>
            <Th fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.600">Amount (₹)</Th>
            <Th fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.600">Category</Th>
            <Th fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.600">Type</Th>
            <Th fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.600">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((tx) => (
            <Tr key={tx._id}>
              <Td fontSize={{ base: "sm", md: "md" }}>{new Date(tx.date).toLocaleDateString()}</Td>
              <Td fontSize={{ base: "sm", md: "md" }}>₹{tx.amount.toLocaleString()}</Td>
              <Td fontSize={{ base: "sm", md: "md" }}>{tx.category}</Td>
              <Td fontSize={{ base: "sm", md: "md" }}>{tx.type}</Td>
              <Td fontSize={{ base: "sm", md: "md" }}>
                <Badge colorScheme={tx.type === "income" ? "green" : "red"}>
                  {tx.type === "income" ? "Success" : "Expense"}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Button mt={4} colorScheme="teal" width="full" size={{ base: "md", md: "lg" }}>
        Export as CSV
      </Button>
    </Box>
  );
};

export default Transactions;