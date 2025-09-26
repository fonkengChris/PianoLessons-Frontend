import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Subscription } from "../entities/Subscription";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PaymentModal from "./PaymentModal";

interface Props {
  plan: Subscription;
  onSubscribe: (planId: string) => void;
}

const PricingCard = ({ plan, onSubscribe }: Props) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleSubscribe = () => {
    if (!auth?.user) {
      navigate("/auth", { state: { from: "/pricing" } });
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    onSubscribe(plan.id);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      bg={plan.isPopular ? "blue.700" : "gray.700"}
      position="relative"
      transform={plan.isPopular ? "scale(1.05)" : "none"}
    >
      {plan.isPopular && (
        <Text
          position="absolute"
          top="-2"
          right="-2"
          bg="green.500"
          px={3}
          py={1}
          borderRadius="md"
          fontSize="sm"
        >
          Most Popular
        </Text>
      )}
      <VStack spacing={4}>
        <Heading size="lg">{plan.name}</Heading>
        <Text fontSize="3xl" fontWeight="bold">
          ${plan.price}
          <Text as="span" fontSize="sm">
            /month
          </Text>
        </Text>
        <List spacing={3} w="100%">
          {plan.features.map((feature, index) => (
            <ListItem key={index}>
              <ListIcon as={CheckIcon} color="green.500" />
              {feature}
            </ListItem>
          ))}
        </List>
        <Button
          colorScheme={plan.isPopular ? "green" : "blue"}
          size="lg"
          w="100%"
          onClick={handleSubscribe}
        >
          Subscribe Now
        </Button>
      </VStack>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        planId={plan.id}
        planName={plan.name}
        amount={plan.price}
        currency="USD"
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Box>
  );
};

export default PricingCard;
