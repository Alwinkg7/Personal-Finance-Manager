import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Select,
  Stack,
  useToast,
  Badge,
  Progress,
  VStack,
  List,
  ListItem,
  ListIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from "@/Transactionservice";
import { MdCheckCircle } from "react-icons/md"; // For list icons

const LoggedInHome = ({ onLogout, user }) => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    category: "",
    description: "",
    type: "expense",
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [budget, setBudget] = useState({ category: "", limit: "" });
  const [budgets, setBudgets] = useState([]); // State for storing budgets
  const [challenges, setChallenges] = useState([]);
  const [financialAdvice, setFinancialAdvice] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(token);
        setTransactions(data);
        analyzeSpending(data); // Analyze spending to generate financial advice
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch transactions.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchTransactions();
  }, [token, toast]);

  // Analyze spending patterns and generate financial advice
  const analyzeSpending = (transactions) => {
    const advice = [];

    // Calculate total spending by category
    const spendingByCategory = transactions.reduce((acc, txn) => {
      if (txn.type === "expense") {
        acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
      }
      return acc;
    }, {});

    // Example: Suggest reducing dining out if it exceeds a threshold
    if (spendingByCategory["Dining Out"] > 200) {
      advice.push("You could save $200/month by reducing dining out.");
    }

    // Example: Suggest investing if savings are high
    const totalIncome = transactions
      .filter((txn) => txn.type === "income")
      .reduce((sum, txn) => sum + txn.amount, 0);
    const totalExpenses = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + txn.amount, 0);
    const savings = totalIncome - totalExpenses;

    if (savings > 500) {
      advice.push("Consider investing your savings to grow your wealth.");
    }

    // Example: Suggest creating a budget if expenses are high
    if (totalExpenses > 0.8 * totalIncome) {
      advice.push("Create a budget to better manage your expenses.");
    }

    setFinancialAdvice(advice);
  };

  // Handle adding a transaction
  const handleAddTransaction = async () => {
    if (!newTransaction.date || !newTransaction.amount || !newTransaction.category) {
      toast({
        title: "Error",
        description: "Date, Amount, and Category are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const transactionData = {
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
      };
      const addedTransaction = await addTransaction(transactionData, token);
      setTransactions([...transactions, addedTransaction]);
      setNewTransaction({ date: "", amount: "", category: "", description: "", type: "expense" });

      toast({
        title: "Transaction Added",
        description: "Your transaction has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Re-analyze spending after adding a new transaction
      analyzeSpending([...transactions, addedTransaction]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id, token);
      const updatedTransactions = transactions.filter((txn) => txn._id !== id);
      setTransactions(updatedTransactions);

      toast({
        title: "Transaction Deleted",
        description: "Your transaction has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Re-analyze spending after deleting a transaction
      analyzeSpending(updatedTransactions);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle updating a transaction
  const handleUpdateTransaction = async () => {
    if (!editingTransaction.date || !editingTransaction.amount || !editingTransaction.category) {
      toast({
        title: "Error",
        description: "Date, Amount, and Category are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const updatedTransaction = await updateTransaction(editingTransaction._id, editingTransaction, token);
      const updatedTransactions = transactions.map((txn) =>
        txn._id === updatedTransaction._id ? updatedTransaction : txn
      );
      setTransactions(updatedTransactions);
      setEditingTransaction(null);

      toast({
        title: "Transaction Updated",
        description: "Your transaction has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Re-analyze spending after updating a transaction
      analyzeSpending(updatedTransactions);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update transaction.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle edit button click
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Calculate net profit/loss
  const calculateNetProfitLoss = () => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((txn) => {
      if (txn.type === "income") {
        totalIncome += txn.amount;
      } else if (txn.type === "expense") {
        totalExpenses += txn.amount;
      }
    });

    return totalIncome - totalExpenses;
  };

  // Prepare chart data
  const chartData = transactions.map((txn) => ({
    date: new Date(txn.date).toLocaleDateString(),
    amount: txn.type === "income" ? txn.amount : -txn.amount,
  }));

  // Modal state for creating challenges
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newChallenge, setNewChallenge] = useState({
    name: "",
    targetAmount: "",
    timeframe: "",
  });
  const [errors, setErrors] = useState({});

  // Validate challenge inputs
  const validateChallenge = () => {
    const newErrors = {};
    if (!newChallenge.name) newErrors.name = "Name is required.";
    if (!newChallenge.targetAmount || isNaN(newChallenge.targetAmount) || newChallenge.targetAmount <= 0)
      newErrors.targetAmount = "Target amount must be a positive number.";
    if (!newChallenge.timeframe || isNaN(newChallenge.timeframe) || newChallenge.timeframe <= 0)
      newErrors.timeframe = "Timeframe must be a positive number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add a new challenge
  const handleAddChallenge = () => {
    if (!validateChallenge()) return;

    const newChallengeData = {
      id: challenges.length + 1,
      name: newChallenge.name,
      targetAmount: parseFloat(newChallenge.targetAmount),
      savedAmount: 0,
      timeframe: parseInt(newChallenge.timeframe),
      completed: false,
      inputValue: "", // Initialize inputValue for each challenge
    };

    setChallenges([...challenges, newChallengeData]);
    setNewChallenge({ name: "", targetAmount: "", timeframe: "" });
    onClose();
    toast({
      title: "Challenge Added",
      description: "Your new savings challenge has been created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  
  // Update savings amount and check if challenge is completed
  const addSavings = (challengeId, amount) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              savedAmount: challenge.savedAmount + amount,
              completed: challenge.savedAmount + amount >= challenge.targetAmount,
            }
          : challenge
      )
    );
  };
  // Handle adding savings to a challenge
  const handleAddSavings = (challengeId, inputValue) => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      addSavings(challengeId, amount);
      // Reset the inputValue for the challenge
      setChallenges((prevChallenges) =>
        prevChallenges.map((challenge) =>
          challenge.id === challengeId ? { ...challenge, inputValue: "" } : challenge
        )
      );
    } else {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to add.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Delete a challenge
  const handleDeleteChallenge = (challengeId) => {
    setChallenges(challenges.filter((challenge) => challenge.id !== challengeId));
    toast({
      title: "Challenge Deleted",
      description: "The savings challenge has been removed.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  // Check if a challenge is completed and show a toast
  useEffect(() => {
    challenges.forEach((challenge) => {
      if (challenge.savedAmount >= challenge.targetAmount && !challenge.completed) {
        toast({
          title: "Challenge Completed!",
          description: `You've completed the "${challenge.name}" challenge.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  }, [challenges, toast]);

  return (
    <Box bg="gray.50" minHeight="100vh" p={{ base: 4, md: 8 }}>
      {/* Welcome Section */}
      <Flex align="center" justify="space-between" mb={8}>
        <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} color="teal.500">
          Welcome, {user.name}!
        </Heading>
      </Flex>

      {/* Net Profit/Loss Section */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
          Net Profit/Loss
        </Heading>
        <Text fontSize={{ base: "xl", md: "2xl" }} color={calculateNetProfitLoss() >= 0 ? "green.500" : "red.500"}>
          ₹{calculateNetProfitLoss().toLocaleString()}
        </Text>
      </Box>

      {/* Transaction Table */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
          Transactions
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Type</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((txn) => (
              <Tr key={txn._id}>
                <Td color="teal.700">{new Date(txn.date).toLocaleDateString()}</Td>
                <Td color={txn.type === "income" ? "green.500" : "red.500"}>
                  ₹{txn.amount}
                </Td>
                <Td color="teal.700">{txn.category}</Td>
                <Td color="teal.700">{txn.description || "No description"}</Td>
                <Td color="teal.700">{txn.type}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEditClick(txn)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDeleteTransaction(txn._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Add/Edit Transaction Form */}
        <Box mt={6}>
          <Heading as="h3" fontSize={{ base: "md", md: "lg" }} mb={4} color="teal.500">
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </Heading>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Input
              type="date"
              color="teal.700"
              value={editingTransaction ? editingTransaction.date : newTransaction.date}
              onChange={(e) =>
                editingTransaction
                  ? setEditingTransaction({ ...editingTransaction, date: e.target.value })
                  : setNewTransaction({ ...newTransaction, date: e.target.value })
              }
              _placeholder={{ color: "teal.500" }} // Placeholder text color
            />
            <Input
              type="number"
              placeholder="Amount"
              color="teal.700"
              value={editingTransaction ? editingTransaction.amount : newTransaction.amount}
              onChange={(e) =>
                editingTransaction
                  ? setEditingTransaction({ ...editingTransaction, amount: e.target.value })
                  : setNewTransaction({ ...newTransaction, amount: e.target.value })
              }
              _placeholder={{ color: "teal.700" }} // Placeholder text color
            />
            <Input
              type="text"
              placeholder="Category"
              color="teal.700"
              value={editingTransaction ? editingTransaction.category : newTransaction.category}
              onChange={(e) =>
                editingTransaction
                  ? setEditingTransaction({ ...editingTransaction, category: e.target.value })
                  : setNewTransaction({ ...newTransaction, category: e.target.value })
              }
              _placeholder={{ color: "teal.700" }} // Placeholder text color
            />
            <Input
              type="text"
              placeholder="Description"
              color="teal.700"
              value={editingTransaction ? editingTransaction.description : newTransaction.description}
              onChange={(e) =>
                editingTransaction
                  ? setEditingTransaction({ ...editingTransaction, description: e.target.value })
                  : setNewTransaction({ ...newTransaction, description: e.target.value })
              }
              _placeholder={{ color: "teal.700" }} // Placeholder text color
            />
            <Select
              value={editingTransaction ? editingTransaction.type : newTransaction.type}
              onChange={(e) =>
                editingTransaction
                  ? setEditingTransaction({ ...editingTransaction, type: e.target.value })
                  : setNewTransaction({ ...newTransaction, type: e.target.value })
              }
              placeholder="Select Type"
              _placeholder={{ color: "teal.700" }} // Placeholder text color
            >
              <option color="teal.700" value="income">Income</option>
              <option color="teal.700" value="expense">Expense</option>
            </Select>
            <Flex align="center" gap={2}>
              <Button
                colorScheme="teal"
                onClick={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
              >
                {editingTransaction ? "Update" : "Add"}
              </Button>
              {editingTransaction && (
                <Button colorScheme="gray" onClick={() => setEditingTransaction(null)}>
                  Cancel
                </Button>
              )}
            </Flex>
          </Stack>
        </Box>
      </Box>

      {/* Chart and Financial Advice Sections */}
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={8} mb={8}>
        {/* Chart Section */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" width={{ base: "100%", md: "60%" }}>
          <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
            Spending and Earnings
          </Heading>
          <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </Box>

        {/* Financial Advice Section */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" width={{ base: "100%", md: "35%" }}>
          <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
            Financial Advice
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
      </Flex>

      {/* Budget Planning Section */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
          Budget Planning
        </Heading>

        {/* Budget Input Form */}
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={4} mb={6}>
          <Input
            placeholder="Category (e.g., Groceries)"
            value={budget.category}
            onChange={(e) => setBudget({ ...budget, category: e.target.value })}
            flex={{ base: "1", md: "1" }}
            isInvalid={!budget.category && budget.limit}
          />
          <Input
            type="number"
            placeholder="Limit (e.g., 5000)"
            value={budget.limit}
            onChange={(e) => setBudget({ ...budget, limit: e.target.value })}
            flex={{ base: "1", md: "1" }}
            isInvalid={!budget.limit && budget.category}
          />
          <Button
            colorScheme="teal"
            onClick={() => {
              if (!budget.category || !budget.limit) {
                toast({
                  title: "Error",
                  description: "Category and Limit are required.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }
              setBudgets([...budgets, { ...budget, id: Date.now(), spent: 0, newSpent: "" }]);
              setBudget({ category: "", limit: "" });
              toast({
                title: "Budget Set",
                description: "Your budget has been added successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }}
            flexShrink={0}
            width={{ base: "100%", md: "auto" }}
          >
            Set Budget
          </Button>
        </Flex>

        {/* List of Existing Budgets */}
        <VStack spacing={4} align="stretch">
          {budgets.map((budget, index) => (
            <Box key={budget.id} p={4} borderWidth="1px" borderRadius="lg">
              <Flex justify="space-between" align="center" mb={2}>
                <Heading as="h3" fontSize="lg" color="teal.500">
                  {budget.category}
                </Heading>
                <Flex gap={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => {
                      setBudget({ category: budget.category, limit: budget.limit });
                      setBudgets(budgets.filter((b) => b.id !== budget.id));
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      setBudgets(budgets.filter((b) => b.id !== budget.id));
                      toast({
                        title: "Budget Deleted",
                        description: `The budget for ${budget.category} has been removed.`,
                        status: "info",
                        color: "red",
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>

              <Text fontSize="md" color="gray.700" mb={2}>
                Limit: ₹{budget.limit}
              </Text>
              <Text fontSize="md" color="gray.700" mb={2}>
                Spent: ₹{budget.spent}
              </Text>

              {/* Add Spend Section */}
              <Flex gap={2} align="center" mb={2}>
                <Input
                  type="number"
                  placeholder="Enter amount spent"
                  value={budget.newSpent || ""}
                  onChange={(e) => {
                    const updatedBudgets = [...budgets];
                    updatedBudgets[index].newSpent = e.target.value;
                    setBudgets(updatedBudgets);
                  }}
                  size="sm"
                  width="100px"
                />
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={() => {
                    const amount = parseFloat(budget.newSpent);
                    if (!isNaN(amount) && amount > 0) {
                      const updatedBudgets = [...budgets];
                      updatedBudgets[index].spent += amount;
                      updatedBudgets[index].newSpent = "";
                      setBudgets(updatedBudgets);

                      toast({
                        title: "Amount Added",
                        description: `₹${amount} added to ${budget.category}.`,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    }
                  }}
                >
                  Add Spend
                </Button>
              </Flex>

              <Progress
                value={(budget.spent / budget.limit) * 100}
                size="sm"
                colorScheme={budget.spent > budget.limit ? "red" : "teal"}
                mb={2}
              />
              {budget.spent > budget.limit && (
                <Badge colorScheme="red" fontSize="sm" p={1} borderRadius="md">
                  Over Budget!
                </Badge>
              )}
            </Box>
          ))}
        </VStack>
      </Box>

       {/* Render the Savings Challenges section */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
          Savings Challenges
        </Heading>
        <Text fontSize="md" color="gray.700" mb={6}>
          Create and track your savings goals to achieve financial milestones!
        </Text>

        {/* Button to Add New Challenge */}
        <Button colorScheme="teal" mb={6} onClick={onOpen}>
          Create New Challenge
        </Button>

        {/* List of Challenges */}
        <VStack spacing={6} align="stretch">
          {challenges.map((challenge) => (
            <Box key={challenge.id} p={4} borderWidth="1px" borderRadius="lg">
              <Flex justify="space-between" align="center" mb={2}>
                <Heading as="h3" fontSize="lg" color="teal.500">
                  {challenge.name}
                </Heading>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteChallenge(challenge.id)}
                >
                  Delete
                </Button>
              </Flex>
              <Text fontSize="md" color="gray.700" mb={2}>
                Target: ₹{challenge.targetAmount} in {challenge.timeframe} days
              </Text>
              <Progress
                value={(challenge.savedAmount / challenge.targetAmount) * 100}
                size="sm"
                colorScheme="teal"
                mb={2}
              />
              <Text fontSize="md" color="gray.700" mb={2}>
                Saved: ₹{challenge.savedAmount} / ₹{challenge.targetAmount}
              </Text>
              {challenge.completed ? (
                <Badge colorScheme="green" fontSize="sm" p={1} borderRadius="md">
                  Completed!
                </Badge>
              ) : (
                <Flex gap={2}>
                  <Input
                    type="number"
                    placeholder="Savings"
                    width="100px"
                    value={challenge.inputValue || ""}
                    onChange={(e) => {
                      const updatedChallenges = challenges.map((c) =>
                        c.id === challenge.id
                          ? { ...c, inputValue: e.target.value }
                          : c
                      );
                      setChallenges(updatedChallenges);
                    }}
                  />
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleAddSavings(challenge.id, challenge.inputValue)}
                  >
                    Add
                  </Button>
                </Flex>
              )}
            </Box>
          ))}
        </VStack>

        {/* Modal for Creating New Challenge */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Savings Challenge</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!errors.name} mb={4}>
                <FormLabel>Challenge Name</FormLabel>
                <Input
                  placeholder="e.g., Save $500 in 30 Days"
                  value={newChallenge.name}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, name: e.target.value })
                  }
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.targetAmount} mb={4}>
                <FormLabel>Target Amount</FormLabel>
                <Input
                  type="number"
                  placeholder="e.g., 500"
                  value={newChallenge.targetAmount}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, targetAmount: e.target.value })
                  }
                />
                <FormErrorMessage>{errors.targetAmount}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.timeframe} mb={4}>
                <FormLabel>Timeframe (in days)</FormLabel>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  value={newChallenge.timeframe}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, timeframe: e.target.value })
                  }
                />
                <FormErrorMessage>{errors.timeframe}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() => {
                  if (validateChallenge()) {
                    handleAddChallenge();
                    onClose(); // Close the modal after adding the challenge
                  }
                }}
              >
                Create
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default LoggedInHome;