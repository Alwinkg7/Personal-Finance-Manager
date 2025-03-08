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
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      name: "Save $500 in 30 Days",
      targetAmount: 500,
      savedAmount: 0,
      timeframe: 30,
      completed: false,
    },
    {
      id: 2,
      name: "Save $1000 in 60 Days",
      targetAmount: 1000,
      savedAmount: 0,
      timeframe: 60,
      completed: false,
    },
    {
      id: 3,
      name: "Save 10% of Your Income This Month",
      targetAmount: null, // Dynamic target based on user's income
      savedAmount: 0,
      timeframe: 30,
      completed: false,
    },
  ]);
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

  // Handle adding savings to a challenge
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
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={4}>
          <Input
            placeholder="Category"
            value={budget.category}
            onChange={(e) => setBudget({ ...budget, category: e.target.value })}
            flex={{ base: "1", md: "1" }}
          />
          <Input
            type="number"
            placeholder="Limit"
            value={budget.limit}
            onChange={(e) => setBudget({ ...budget, limit: e.target.value })}
            flex={{ base: "1", md: "1" }}
          />
          <Button
            colorScheme="teal"
            onClick={() => setBudget({ category: "", limit: "" })}
            flexShrink={0}
            width={{ base: "100%", md: "auto" }}
          >
            Set Budget
          </Button>
        </Flex>
      </Box>

      {/* Savings Challenges Section */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
          Savings Challenges
        </Heading>
        <Text fontSize="md" color="gray.700" mb={6}>
          Participate in savings challenges to achieve your financial goals and earn badges!
        </Text>

        <VStack spacing={6} align="stretch">
          {challenges.map((challenge) => (
            <Box key={challenge.id} p={4} borderWidth="1px" borderRadius="lg">
              <Heading as="h3" fontSize="lg" color="teal.500" mb={2}>
                {challenge.name}
              </Heading>
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
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => addSavings(challenge.id, 100)} // Example: Add $100 to savings
                >
                  Add Savings
                </Button>
              )}
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default LoggedInHome;