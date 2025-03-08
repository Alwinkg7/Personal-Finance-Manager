import React from "react";
import { Box, Heading, Container } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", investment: 4000 },
  { name: "Feb", investment: 3000 },
  { name: "Mar", investment: 5000 },
  { name: "Apr", investment: 7000 },
  { name: "May", investment: 6000 },
];

const InvestorAnalytics = () => {
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
            Investor Analytics
          </Heading>

          {/* Chart Container */}
          <Box w="100%" h={{ base: "300px", md: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                <XAxis dataKey="name" stroke="#48D1CC" />
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
                  dataKey="investment"
                  stroke="#48D1CC"
                  strokeWidth={2}
                  dot={{ fill: "#48D1CC", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InvestorAnalytics;