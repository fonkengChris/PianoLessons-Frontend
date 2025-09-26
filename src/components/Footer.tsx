import React from 'react';
import {
  Box,
  Container,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box bg={bgColor} py={4} mt="auto">
      <Container maxW="7xl">
        <Text textAlign="center" color={textColor} fontSize="sm">
          © {new Date().getFullYear()} Piano Lessons. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
