import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading display="inline-block" size="2xl" mb={2}>
        Oops!
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        {error?.message || "Something went wrong"}
      </Text>
      <Button
        colorScheme="blue"
        onClick={() => navigate("/")}
        mt={4}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorPage; 