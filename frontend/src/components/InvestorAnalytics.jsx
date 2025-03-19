import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Container,
  Flex,
  Input,
  Select,
  Button,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const InvestmentAnalytics = () => {
  const [data, setData] = useState([]);
  const [newInvestment, setNewInvestment] = useState({ month: "", amount: "" });
  const [filter, setFilter] = useState("all");
  const toast = useToast();

  // Get the user's token from local storage
  const token = localStorage.getItem("token");

  // Fetch investments from the backend
  const fetchInvestments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/investments", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      });
      setData(response.data);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch investments.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Add a new investment
  const handleAddInvestment = async () => {
    if (!newInvestment.month || !newInvestment.amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/investments",
        newInvestment,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        }
      );
      setData([...data, response.data]);
      setNewInvestment({ month: "", amount: "" });

      toast({
        title: "Investment Added",
        description: "Your investment has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add investment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Fetch investments on component mount
  useEffect(() => {
    fetchInvestments();
  }, []);

  // Calculate total investment
  const totalInvestment = data.reduce((sum, entry) => sum + entry.amount, 0);

  // Filter data by time period
  const filteredData = filter === "all" ? data : data.slice(-Number(filter));

  return (
    <Box position="relative" minH="100vh" mt={{ base: 10, md: 20 }}>
      {/* Content */}
      <Container maxW="container.lg" centerContent position="relative" zIndex={1}>
        <Box
          w="full"
          p={{ base: 4, md: 6 }}
          borderRadius="lg"
          boxShadow="2xl"
          bg="transparent"
        >
          <Heading
            as="h2"
            size={{ base: "lg", md: "xl" }}
            color="#00a8a8"
            mb={4}
            textAlign="center"
          >
            Investment Analytics
          </Heading>

          {/* Total Investment */}
          <Text fontSize="xl" color="teal.500" mb={6} textAlign="center">
            Total Investment: ₹{totalInvestment.toLocaleString()}
          </Text>

          {/* Filters */}
          <Flex justify="center" mb={6}>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              width="200px"
              color="teal.500"
              borderColor="teal.500"
            >
              <option value="all">All Time</option>
              <option value="3">Last 3 Months</option>
              <option value="6">Last 6 Months</option>
              <option value="12">Last 12 Months</option>
            </Select>
          </Flex>

          {/* Chart Container */}
          <Box w="100%" h={{ base: "300px", md: "400px" }} mb={8}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                <XAxis dataKey="month" stroke="#48D1CC" />
                <YAxis stroke="#48D1CC" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#48D1CC"
                  strokeWidth={2}
                  dot={{ fill: "#48D1CC", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Add Investment Form */}
          <VStack spacing={4} align="stretch" mb={8}>
            <Heading as="h3" size="md" color="teal.500" textAlign="center">
              Add New Investment
            </Heading>
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <Input
                placeholder="Month (e.g., Jun)"
                value={newInvestment.month}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, month: e.target.value })
                }
                color="teal.500"
                borderColor="teal.500"
              />
              <Input
                type="number"
                placeholder="Amount (e.g., 5000)"
                value={newInvestment.amount}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, amount: e.target.value })
                }
                color="teal.500"
                borderColor="teal.500"
              />
              <Button
                colorScheme="teal"
                onClick={handleAddInvestment}
                flexShrink={0}
              >
                Add
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default InvestmentAnalytics;