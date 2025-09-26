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
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiEdit, FiTrash2, FiFolder } from "react-icons/fi";
import useCategories from "../../hooks/useCategories";
import { courseApi, userApi, categoryApi, lessonApi } from "../../services/api";

const CategoriesManagementPage = () => {
  const { data: categories, error, refetch, isLoading } = useCategories();
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
    return <Box p={4}>Error loading categories: {String(error)}</Box>;
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await categoryApi.delete(id);
      toast({
        title: "Category deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error deleting category",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Mobile card component
  const CategoryCard = ({ category }: { category: any }) => (
    <Card shadow="sm" border="1px" borderColor={borderColor} bg={cardBg}>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <FiFolder size={20} color="#3182CE" />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" fontSize="lg" color="blue.500">
                  {category.name}
                </Text>
                {category.description && (
                  <Text fontSize="sm" color={secondaryTextColor} noOfLines={2}>
                    {category.description}
                  </Text>
                )}
              </VStack>
            </HStack>
          </HStack>

          <HStack spacing={2}>
            <Button
              colorScheme="teal"
              size="sm"
              leftIcon={<FiEdit />}
              as={RouterLink}
              to={`/admin/category/edit/${category.id}`}
              flex={1}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              leftIcon={<FiTrash2 />}
              onClick={() => handleDelete(category.id)}
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
            Categories Management
          </Heading>
          <Button
            colorScheme="blue"
            as={RouterLink}
            to="/admin/category/add"
            size={{ base: "md", md: "lg" }}
          >
            Add Category
          </Button>
        </Flex>
      </Box>

      {/* Content */}
      <Box bg={cardBg} shadow="sm" borderRadius="lg" overflow="hidden" border="1px" borderColor={borderColor}>
        {isMobile ? (
          // Mobile layout with cards
          <Box p={4}>
            <SimpleGrid columns={1} spacing={4}>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))
              ) : (
                <Box textAlign="center" py={8}>
                  <Text color={secondaryTextColor}>No categories found.</Text>
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
                      <FiFolder />
                      <Text>Name</Text>
                    </HStack>
                  </Th>
                  <Th color="blue.500">Description</Th>
                  <Th color="blue.500">Created</Th>
                  <Th color="blue.500">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <Tr key={category.id}>
                      <Td color="blue.500" fontWeight="medium">
                        {category.name}
                      </Td>
                      <Td color={textColor}>
                        {category.description || "No description"}
                      </Td>
                      <Td color={secondaryTextColor}>
                        {new Date(category.createdAt).toLocaleDateString()}
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button
                            as={RouterLink}
                            to={`/admin/category/edit/${category.id}`}
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
                            onClick={() => handleDelete(category.id)}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={4} textAlign="center" py={8}>
                      <Text color={secondaryTextColor}>No categories found.</Text>
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

export default CategoriesManagementPage;
