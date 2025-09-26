import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  useToast,
  useBreakpointValue,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  HStack,
  VStack,
  Badge,
  Spinner,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiEdit, FiTrash2, FiUser, FiShield } from "react-icons/fi";
import useUsers from "../../hooks/useUsers";
import { courseApi, userApi, categoryApi, lessonApi } from "../../services/api";
import User from "../../entities/User";

const UsersManagementPage = () => {
  const { data: users, error, refetch, isLoading } = useUsers();
  const toast = useToast();

  // Responsive breakpoints
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Color mode values for better visibility
  const textColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return <Box p={4}>Error loading users: {String(error)}</Box>;
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?"))
      return;

    try {
      await userApi.delete(id);
      toast({
        title: "User deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error deleting user",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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

  // Mobile card component
  const UserCard = ({ user }: { user: User }) => (
    <Card shadow="sm" border="1px" borderColor={borderColor} bg={cardBg}>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <Avatar name={user.name} size="md" />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" fontSize="lg" color="blue.500">
                  {user.name}
                </Text>
                <Text fontSize="sm" color={secondaryTextColor}>
                  {user.email}
                </Text>
                <Badge colorScheme={getRoleBadgeColor(user.role)} variant="subtle">
                  {user.role}
                </Badge>
              </VStack>
            </HStack>
          </HStack>

          <HStack spacing={2}>
            <Button
              colorScheme="teal"
              size="sm"
              leftIcon={<FiEdit />}
              as={RouterLink}
              to={`/admin/users/edit/${user._id}`}
              flex={1}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              leftIcon={<FiTrash2 />}
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Box
        bg={cardBg}
        shadow="sm"
        p={{ base: 4, md: 6 }}
        mb={4}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "stretch", sm: "center" }}
          gap={4}
        >
          <Heading color="blue.500" size="lg">
            Users Management
          </Heading>
          <Button
            colorScheme="blue"
            as={RouterLink}
            to="/admin/users/add"
            size={{ base: "md", md: "lg" }}
          >
            Add User
          </Button>
        </Flex>
      </Box>

      {/* Content */}
      <Box bg={cardBg} shadow="sm" borderRadius="lg" overflow="hidden" border="1px" borderColor={borderColor}>
        {isMobile ? (
          // Mobile layout with cards
          <Box p={4}>
            <SimpleGrid columns={1} spacing={4}>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))
              ) : (
                <Box textAlign="center" py={8}>
                  <Text color={secondaryTextColor}>No users found.</Text>
                </Box>
              )}
            </SimpleGrid>
          </Box>
        ) : (
          // Desktop/Tablet layout with table
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="blue.500">
                    <HStack spacing={2}>
                      <FiUser />
                      <Text>Name</Text>
                    </HStack>
                  </Th>
                  <Th color="blue.500">Email</Th>
                  <Th color="blue.500">
                    <HStack spacing={2}>
                      <FiShield />
                      <Text>Role</Text>
                    </HStack>
                  </Th>
                  <Th color="blue.500">Created</Th>
                  <Th color="blue.500">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <Tr key={user._id}>
                      <Td>
                        <HStack spacing={3}>
                          <Avatar name={user.name} size="sm" />
                          <Text color="blue.500" fontWeight="medium">
                            {user.name}
                          </Text>
                        </HStack>
                      </Td>
                      <Td color={textColor}>{user.email}</Td>
                      <Td>
                        <Badge colorScheme={getRoleBadgeColor(user.role)} variant="subtle">
                          {user.role}
                        </Badge>
                      </Td>
                      <Td color={secondaryTextColor}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button
                            as={RouterLink}
                            to={`/admin/users/edit/${user._id}`}
                            colorScheme="teal"
                            size="sm"
                            leftIcon={<FiEdit />}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            size="sm"
                            leftIcon={<FiTrash2 />}
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={8}>
                      <Text color={secondaryTextColor}>No users found.</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UsersManagementPage;
