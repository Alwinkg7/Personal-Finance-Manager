import React from "react";
import { Box, Heading, VStack, Text, Badge, Container } from "@chakra-ui/react";

const notifications = [
  { id: 1, message: "Your investment has been approved!", type: "success" },
  { id: 2, message: "New offer received from an investor.", type: "info" },
  { id: 3, message: "Payment deadline approaching!", type: "warning" },
];

const getBadgeColor = (type) => {
  switch (type) {
    case "success":
      return "green";
    case "info":
      return "blue";
    case "warning":
      return "orange";
    default:
      return "gray";
  }
};

const Notification = () => {
  return (
    <Container
      p={{ base: 4, md: 6 }}
      maxW={{ base: "100%", md: "900px" }}
      mx="auto"
      mt={{ base: 10, md: 20 }}
      bg="transparent"
      borderRadius="lg"
      boxShadow="2xl"
      position="relative"
    >
      {/* Content Box */}
      <Box w="full" p={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <Heading as="h2" size={{ base: "lg", md: "xl" }} color="#00a8a8" mb={4} textAlign="center">
          Notifications
        </Heading>

        <VStack spacing={4} align="stretch">
          {notifications.map((notif) => (
            <Box
              key={notif.id}
              p={4}
              borderRadius="md"
              bg="rgba(0, 0, 0, 0.7)"
              _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
            >
              <Badge colorScheme={getBadgeColor(notif.type)} mr={2}>
                {notif.type.toUpperCase()}
              </Badge>
              <Text color="white" fontSize={{ base: "sm", md: "md" }}>
                {notif.message}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Notification;