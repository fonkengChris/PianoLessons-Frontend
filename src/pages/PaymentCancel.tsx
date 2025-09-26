import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon
} from '@chakra-ui/react';

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
      <VStack spacing={6} maxW="md" w="full">
        <Alert status="warning">
          <AlertIcon />
          Payment was cancelled
        </Alert>
        
        <Heading size="lg" textAlign="center">
          Payment Cancelled
        </Heading>
        
        <Text textAlign="center" color="gray.600">
          Your payment was cancelled. No charges have been made to your account.
        </Text>
        
        <VStack spacing={3} w="full">
          <Button 
            colorScheme="blue" 
            size="lg" 
            w="full"
            onClick={() => navigate('/pricing')}
          >
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            w="full"
            onClick={() => navigate('/courses')}
          >
            Browse Courses
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PaymentCancel;
