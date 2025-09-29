import { Text, Box, VStack, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  return (
    <Container maxW="md" py={10}>
      <VStack spacing={8} textAlign="center">
        <Box>
          <Text fontSize="2xl" color="white" fontWeight="bold" mb={4}>
            You have successfully logged out
          </Text>
          <Text color="gray.300" mb={6}>
            Thank you for using Piano Lessons. We hope to see you again soon!
          </Text>
        </Box>
        <Link to="/auth">
          <Text 
            color="cyan.400" 
            fontSize="lg" 
            _hover={{ color: "cyan.300" }}
            textDecoration="underline"
          >
            Sign In Again
          </Text>
        </Link>
      </VStack>
    </Container>
  );
};

export default Logout;
