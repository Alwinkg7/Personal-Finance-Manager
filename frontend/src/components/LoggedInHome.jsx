import React, { useEffect, useState } from "react";
import {Box,Text,Flex,Heading,Table,Thead,Tbody,Tr,Th,Td,Button,Input,Select,Stack,useToast,} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from "@/Transactionservice";
import GoalComponent from "./GoalComponent";
import BudgetComponent from "./BudgetComponent";
import PieChartComponent from "./PieChartComponent";
import FinancialAdvice from "./FinancialAdvice"; // Import the FinancialAdvice component

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
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(token);
        setTransactions(data);
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

  return (
    <Box bg="gray.50" minHeight="100vh" p={{ base: 4, md: 8 }}>
      {/* Welcome Section */}
      <Flex align="center" justify="space-between" mb={8}>
        <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} color="teal.500">
          Welcome, {user.name}!
        </Heading>

        <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} color="teal.500">
          FinBridge
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
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={4} mb={8}>
        {/* Chart Section */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" width={{ base: "100%", md: "50%" }}>
          <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
            Spending and Earnings
          </Heading>
          <PieChartComponent />
        </Box>

        {/* Financial Advice Section */}
        <FinancialAdvice transactions={transactions} />
      </Flex>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={4} mb={8}>
        {/* Budget Planning Section */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" width={{ base: "100%", md: "50%" }}>
          <BudgetComponent />
        </Box>

        {/* Render the Savings Challenges section */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" width={{ base: "100%", md: "50%" }}>
          <GoalComponent />
        </Box>
      </Flex>
    </Box>
  );
};

export default LoggedInHome;