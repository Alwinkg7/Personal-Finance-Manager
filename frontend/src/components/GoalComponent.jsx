import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Input, Button, Progress, VStack, useToast, Flex } from "@chakra-ui/react";

const GoalComponent = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ name: "", targetAmount: "", deadline: "" });
  const [savingsInput, setSavingsInput] = useState({});
  const toast = useToast();

  // Fetch goals from the backend
  const fetchGoals = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/goals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setGoals(response.data);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch goals.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Add a new goal
  const handleAddGoal = async () => {
    if (!newGoal.name || !newGoal.targetAmount) {
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
      await axios.post("http://localhost:3000/api/goals", newGoal, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Show success toast
      toast({
        title: "Success",
        description: "Budget added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchGoals();
      setNewGoal({ name: "", targetAmount: "", deadline: "" });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add goal.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Add savings to a goal
  const handleAddSavings = async (goalId) => {
    const amount = parseFloat(savingsInput[goalId]);
  
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
        `http://localhost:3000/api/goals/${goalId}`,
        { savedAmount: amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      fetchGoals();
      setSavingsInput({ ...savingsInput, [goalId]: "" });
  
      toast({
        title: "Success",
        description: "Savings added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to add savings.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (goalId) => {
    try {
      await axios.delete(`http://localhost:3000/api/goals/${goalId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchGoals();
      toast({
        title: "Success",
        description: "Goal deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete goal.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Fetch goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <Box>
      <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
        Savings Challenge
      </Heading>
      <Text fontSize="md" color="gray.700" mb={6}>
        Create and track your savings goals to achieve financial milestones!
      </Text>

      {/* Add Goal Form */}
      <VStack spacing={4} mb={8}>
        <Input
          placeholder="Goal Name (e.g., Vacation)"
          value={newGoal.name}
          onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Target Amount (e.g., 5000)"
          value={newGoal.targetAmount}
          onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
        />
        <Input
          type="date"
          placeholder="Deadline (optional)"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
        />
        <Button onClick={handleAddGoal} colorScheme="teal" mb={6}>
        Create New Challenge
        </Button>
      </VStack>

      {/* List of Goals */}
      {goals.map((goal) => (
        <Box key={goal._id} mb={4} p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="lg" fontWeight="bold">
            {goal.name} (₹{goal.savedAmount} / ₹{goal.targetAmount})
          </Text>
          <Progress value={(goal.savedAmount / goal.targetAmount) * 100} size="sm" mb={2} />
          <Input
            type="number"
            placeholder="Add Savings"
            value={savingsInput[goal._id] || ""}
            onChange={(e) => setSavingsInput({ ...savingsInput, [goal._id]: e.target.value })}
            mb={2}
          />
          <Flex gap={2}>
            <Button onClick={() => handleAddSavings(goal._id)} colorScheme="teal" size="sm">
              Add Savings
            </Button>
            <Button onClick={() => handleDeleteGoal(goal._id)} colorScheme="red" size="sm">
              Delete Goal
            </Button>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default GoalComponent;