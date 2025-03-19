import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Input, Button, Progress, VStack, useToast, Flex } from "@chakra-ui/react";

const BudgetComponent = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: "", limit: "" });
  const [spendingInput, setSpendingInput] = useState({});
  const toast = useToast();

  // Fetch budgets from the backend
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/budgets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBudgets(response.data);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch budgets.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Add a new budget
  const handleAddBudget = async () => {
    if (!newBudget.category || !newBudget.limit) {
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
        "http://localhost:3000/api/budgets",
        newBudget,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Show success toast
      toast({
        title: "Success",
        description: "Budget added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      // Refresh the list of budgets
      fetchBudgets();
  
      // Clear the form
      setNewBudget({ category: "", limit: "" });
    } catch (err) {
      // Show error toast
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to add budget.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Add spending to a budget
  const handleAddSpending = async (budgetId) => {
    const amount = parseFloat(spendingInput[budgetId]);
  
    if (isNaN(amount)) {
      toast({
        title: "Error",
        description: "Please enter a valid amount.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:3000/api/budgets/${budgetId}`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      fetchBudgets();
      setSpendingInput({ ...spendingInput, [budgetId]: "" });
  
      toast({
        title: "Success",
        description: "Spending added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to add spending.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Delete a budget
  const handleDeleteBudget = async (budgetId) => {
    try {
      await axios.delete(`http://localhost:3000/api/budgets/${budgetId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchBudgets();
      toast({
        title: "Success",
        description: "Budget deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete budget.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Fetch budgets on component mount
  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <Box >
      <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
        Budget Planning
      </Heading>
      <Text fontSize="md" color="gray.700" mb={6}>
        Create and track your budget to get control of your spendings!
      </Text>

      {/* Add Budget Form */}
      <VStack direction={{ base: "column", md: "row" }} align="center" gap={4} mb={6}>
        <Input
          placeholder="Category (e.g., Groceries)"
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Limit (e.g., 5000)"
          colorScheme="teal"
          value={newBudget.limit}
          onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
        />
        <Button onClick={handleAddBudget} colorScheme="teal">
          Set Budget
        </Button>
      </VStack>

      {/* List of Budgets */}
      {budgets.map((budget) => (
        <Box key={budget._id} mb={4} p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="lg" fontWeight="bold">
            {budget.category} (₹{budget.spent} / ₹{budget.limit})
          </Text>
          <Progress value={(budget.spent / budget.limit) * 100} size="sm" mb={2} />
          <Input
            type="number"
            placeholder="Add Spending"
            value={spendingInput[budget._id] || ""}
            onChange={(e) => setSpendingInput({ ...spendingInput, [budget._id]: e.target.value })}
            mb={2}
          />
          <Flex gap={2}>
            <Button onClick={() => handleAddSpending(budget._id)} colorScheme="teal" size="sm">
              Add Spending
            </Button>
            <Button onClick={() => handleDeleteBudget(budget._id)} colorScheme="red" size="sm">
              Delete Budget
            </Button>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default BudgetComponent;