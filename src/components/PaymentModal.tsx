import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast
} from '@chakra-ui/react';
import PaymentMethodSelector from './PaymentMethodSelector';
import useAuth from '../hooks/useAuth';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  onPaymentSuccess?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planId,
  planName,
  amount,
  currency,
  onPaymentSuccess
}) => {
  const { auth } = useAuth();
  const toast = useToast();


  const handlePaymentSuccess = (paymentId: string) => {
    toast({
      title: 'Payment Successful!',
      description: 'Your subscription has been activated.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    onClose();
    if (onPaymentSuccess) {
      onPaymentSuccess();
    }
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: 'Payment Failed',
      description: error,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  if (!auth?.user) {
    return null;
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={{ base: "full", sm: "md", lg: "lg" }}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent 
        maxW={{ base: "100vw", sm: "md", lg: "lg" }}
        maxH={{ base: "100vh", sm: "auto" }}
        m={{ base: 0, sm: "auto" }}
        borderRadius={{ base: 0, sm: "md" }}
      >
        <ModalHeader fontSize={{ base: "lg", md: "xl" }}>Complete Your Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={{ base: 4, md: 6 }} px={{ base: 4, md: 6 }}>
          <PaymentMethodSelector
            planId={planId}
            planName={planName}
            amount={amount}
            currency={currency}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
