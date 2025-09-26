import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { api } from '../services/api';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | 'processing'>('processing');

  const token = searchParams.get('token');
  const payerId = searchParams.get('PayerID');

  useEffect(() => {
    if (token && payerId) {
      processPayPalPayment();
    } else {
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  }, [token, payerId]);

  const processPayPalPayment = async () => {
    try {
      // In a real implementation, you would:
      // 1. Send the token and payerId to your backend
      // 2. Backend would capture the payment with PayPal
      // 3. Backend would create the subscription
      
      // For now, we'll simulate a successful payment
      setTimeout(() => {
        setPaymentStatus('success');
        setIsProcessing(false);
        
        toast({
          title: 'Payment Successful!',
          description: 'Your subscription has been activated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }, 2000);
    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    navigate('/courses');
  };

  if (isProcessing) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>Processing your payment...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
      <VStack spacing={6} maxW="md" w="full">
        {paymentStatus === 'success' ? (
          <>
            <CheckCircleIcon boxSize={16} color="green.500" />
            <Heading size="lg" textAlign="center">
              Payment Successful!
            </Heading>
            <Text textAlign="center" color="gray.600">
              Thank you for your subscription. You now have access to all premium features.
            </Text>
            <Button colorScheme="blue" size="lg" onClick={handleContinue}>
              Continue to Courses
            </Button>
          </>
        ) : (
          <>
            <Alert status="error">
              <AlertIcon />
              Payment processing failed. Please try again.
            </Alert>
            <Button colorScheme="blue" onClick={() => navigate('/pricing')}>
              Back to Pricing
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
