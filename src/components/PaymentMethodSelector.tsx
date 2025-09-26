import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Badge
} from '@chakra-ui/react';
import { FaPaypal, FaMobile } from 'react-icons/fa';
import { api } from '../services/api';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  supported: boolean;
}

interface PaymentMethodSelectorProps {
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  planId,
  planName,
  amount,
  currency,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  React.useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await api.get('/payments/methods');
      setPaymentMethods(response.data.methods);
    } catch (error) {
      console.error('Failed to fetch payment methods:', error);
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Basic Cameroon phone number validation
    const cleaned = phone.replace(/\D/g, '');
    const patterns = [
      /^2376[0-9]{8}$/, // +237 6XX XXX XXX
      /^2372[0-9]{8}$/, // +237 2XX XXX XXX
      /^6[0-9]{8}$/,    // 6XX XXX XXX (without country code)
      /^2[0-9]{8}$/     // 2XX XXX XXX (without country code)
    ];
    return patterns.some(pattern => pattern.test(cleaned));
  };

  const formatPhoneNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');
    if (!cleaned.startsWith('237')) {
      cleaned = '237' + cleaned;
    }
    return cleaned;
  };

  const handlePayPalPayment = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/payments/paypal/create', {
        planId
      });

      if (response.data.approvalUrl) {
        // Redirect to PayPal for payment
        window.location.href = response.data.approvalUrl;
      } else {
        throw new Error('Failed to create PayPal payment');
      }
    } catch (error: any) {
      console.error('PayPal payment error:', error);
      console.error('Error response:', error.response?.data);
      onPaymentError(error.response?.data?.error || error.response?.data?.message || 'Failed to create PayPal payment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMTNPayment = async () => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid Cameroon phone number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/payments/mtn/create', {
        planId,
        phoneNumber: formatPhoneNumber(phoneNumber)
      });

      if (response.data.paymentId) {
        toast({
          title: 'Payment Request Sent',
          description: `Payment request sent to ${formatPhoneNumber(phoneNumber)}. Please check your phone to complete the payment.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Start polling for payment status
        pollPaymentStatus(response.data.paymentId);
      }
    } catch (error: any) {
      console.error('MTN payment error:', error);
      onPaymentError(error.response?.data?.error || 'Failed to create MTN payment');
    } finally {
      setIsLoading(false);
    }
  };

  const pollPaymentStatus = async (paymentId: string) => {
    const maxAttempts = 30; // 5 minutes with 10-second intervals
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await api.post('/payments/mtn/status', {
          paymentId
        });

        if (response.data.paymentStatus === 'completed') {
          onPaymentSuccess(paymentId);
          return;
        } else if (response.data.paymentStatus === 'failed') {
          onPaymentError('Payment was declined or failed');
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000); // Poll every 10 seconds
        } else {
          onPaymentError('Payment timeout - please check your phone and try again');
        }
      } catch (error) {
        console.error('Payment status check error:', error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000);
        } else {
          onPaymentError('Failed to verify payment status');
        }
      }
    };

    poll();
  };

  const handlePayment = () => {
    if (selectedMethod === 'paypal') {
      handlePayPalPayment();
    } else if (selectedMethod === 'mtn_mobile_money') {
      handleMTNPayment();
    }
  };

  const getMethodIcon = (methodId: string) => {
    switch (methodId) {
      case 'paypal':
        return <FaPaypal size={24} color="#0070ba" />;
      case 'mtn_mobile_money':
        return <FaMobile size={24} color="#ffcc02" />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Box textAlign="center">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Choose Payment Method
          </Text>
          <Text color="gray.600">
            {planName} - {currency} {amount}
          </Text>
        </Box>

        <RadioGroup value={selectedMethod} onChange={setSelectedMethod}>
          <VStack spacing={3} align="stretch">
            {paymentMethods.map((method) => (
              <Box
                key={method.id}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                bg={selectedMethod === method.id ? "blue.50" : "white"}
                borderColor={selectedMethod === method.id ? "blue.500" : "gray.200"}
              >
                <HStack spacing={3}>
                  <Radio value={method.id} />
                  {getMethodIcon(method.id)}
                  <VStack align="start" spacing={1} flex={1}>
                    <HStack>
                      <Text fontWeight="medium">{method.name}</Text>
                      {!method.supported && (
                        <Badge colorScheme="red" size="sm">Coming Soon</Badge>
                      )}
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      {method.description}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </RadioGroup>

        {selectedMethod === 'mtn_mobile_money' && (
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="+237 6XX XXX XXX or 6XX XXX XXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Text fontSize="xs" color="gray.500" mt={1}>
              Enter your MTN Mobile Money phone number
            </Text>
          </FormControl>
        )}

        <Button
          colorScheme="blue"
          size="lg"
          onClick={handlePayment}
          isLoading={isLoading}
          loadingText="Processing..."
          isDisabled={!selectedMethod || (selectedMethod === 'mtn_mobile_money' && !phoneNumber)}
        >
          Pay {currency} {amount}
        </Button>

        <Text fontSize="xs" color="gray.500" textAlign="center">
          Your payment information is secure and encrypted
        </Text>
      </VStack>
    </Box>
  );
};

export default PaymentMethodSelector;
