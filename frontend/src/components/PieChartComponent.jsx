import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Heading, Select, useToast } from "@chakra-ui/react";

const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("today");
  const toast = useToast();

  // Fetch transactions for the selected period
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/transactions/by-period", {
        params: { period },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const transactions = response.data;

      // Calculate total income and expenses
      const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      // Update the data for the Pie Chart
      setData([
        { name: "Income", value: totalIncome },
        { name: "Expenses", value: totalExpenses },
      ]);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch transactions.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Fetch transactions when the period changes
  useEffect(() => {
    fetchTransactions();
  }, [period]);

  // Modern color palette for the Pie Chart
  const COLORS = ["#4FD1C5", "#F56565"]; // Teal and Red

  return (
    <Box

    >
  

      {/* Period Selector */}
      <Select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        mb={4}
        width="150px"
        color="teal.500"
        borderColor="teal.500"
        _hover={{ borderColor: "teal.600" }}
        _focus={{ borderColor: "teal.600", boxShadow: "none" }}
      >
        <option value="today">Today</option>
        <option value="this-week">This Week</option>
        <option value="this-month">This Month</option>
        <option value="last-3-months">Last 3 Months</option>
        <option value="last-6-months">Last 6 Months</option>
        <option value="last-year">Last Year</option>
      </Select>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Modern label format
            labelLine={false}
            >
            {data.map((entry, index) => (
                <Cell
                key={`cell-${index}`}
                fill={entry.name === "Expenses" ? "red" : "teal"} // Red for Expenses, Teal for Income
                />
            ))}
            </Pie>
            <Tooltip
            contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            />
            <Legend
            iconType="circle"
            wrapperStyle={{
                paddingTop: "10px",
            }}
            />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartComponent;