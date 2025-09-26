import React from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import PricingCard from "../components/PricingCard";
import useSubscription from "../hooks/useSubscription";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    features: ["Access to all courses", "Basic support", "No ads"],
    isPopular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 19.99,
    features: [
      "Everything in Basic",
      "Priority support",
      "Downloadable content",
    ],
    isPopular: true,
  },
];

const PricingPage = () => {
  const { subscribe } = useSubscription();

  return (
    <Box p={8}>
      <Heading textAlign="center" mb={2} color="white">
        Flexible Plans for Every Pianist
      </Heading>
      <Text textAlign="center" mb={8} fontSize="lg" color="gray.100">
        Select the subscription that fits your learning style and goals.
      </Text>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={8}
        maxW="1200px"
        mx="auto"
      >
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} onSubscribe={subscribe} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PricingPage;
