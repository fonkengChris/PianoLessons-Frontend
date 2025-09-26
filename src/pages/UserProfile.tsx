import React from "react";
import { Box, Heading, VStack, Text, Badge, Avatar, HStack, Card, CardBody, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUsers from "../hooks/useUsers";

const UserProfile = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const { data: users } = useUsers();
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");

  // Find the user to display
  const user = users?.find(u => u._id === id) || auth?.user;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "red";
      case "admin":
        return "orange";
      default:
        return "blue";
    }
  };

  if (!user) {
    return (
      <Box p={8}>
        <Text color="red.400">User not found</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Heading color="blue.500">User Profile</Heading>
        
        <Card bg={cardBg} shadow="md" border="1px" borderColor={borderColor}>
          <CardBody p={6}>
            <VStack spacing={6} align="stretch">
              <HStack spacing={4}>
                <Avatar name={user.name} size="xl" />
                <VStack align="start" spacing={2}>
                  <Heading size="lg" color={textColor}>{user.name}</Heading>
                  <Text color={secondaryTextColor}>{user.email}</Text>
                  <Badge colorScheme={getRoleBadgeColor(user.role)} variant="subtle" size="lg">
                    {user.role}
                  </Badge>
                </VStack>
              </HStack>

              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" color="blue.500" mb={2}>Email</Text>
                  <Text color={textColor}>{user.email}</Text>
                </Box>
                
                <Box>
                  <Text fontWeight="bold" color="blue.500" mb={2}>Role</Text>
                  <Badge colorScheme={getRoleBadgeColor(user.role)} variant="outline">
                    {user.role}
                  </Badge>
                </Box>
                
                <Box>
                  <Text fontWeight="bold" color="blue.500" mb={2}>Subscription Status</Text>
                  <Badge colorScheme={user.subscriptionActive ? "green" : "gray"} variant="outline">
                    {user.subscriptionActive ? "Active" : "Inactive"}
                  </Badge>
                </Box>
                
                <Box>
                  <Text fontWeight="bold" color="blue.500" mb={2}>Member Since</Text>
                  <Text color={textColor}>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </Box>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default UserProfile;
