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
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiEdit, FiTrash2, FiBook, FiDollarSign } from "react-icons/fi";
import useCourses from "../../hooks/useCourses";
import { courseApi, userApi, categoryApi, lessonApi } from "../../services/api";

const CoursesManagementPage = () => {
  const { data: courses, error, refetch, isLoading } = useCourses();
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
    return <Box p={4}>Error loading courses: {String(error)}</Box>;
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?"))
      return;

    try {
      await courseApi.delete(id);
      toast({
        title: "Course deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error deleting course",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "green";
      case "Intermediate":
        return "yellow";
      case "Advanced":
        return "red";
      default:
        return "blue";
    }
  };

  // Mobile card component
  const CourseCard = ({ course }: { course: any }) => (
    <Card shadow="sm" border="1px" borderColor={borderColor} bg={cardBg}>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between" align="start">
            <HStack spacing={3} align="start">
              {course.imageUrl && (
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  boxSize="60px"
                  objectFit="cover"
                  borderRadius="md"
                />
              )}
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" fontSize="lg" color="blue.500">
                  {course.title}
                </Text>
                <Text fontSize="sm" color={secondaryTextColor} noOfLines={2}>
                  {course.description}
                </Text>
                <HStack spacing={2}>
                  <Badge colorScheme={getLevelColor(course.level)} variant="subtle">
                    {course.level}
                  </Badge>
                  <Badge colorScheme="purple" variant="subtle">
                    {course.category}
                  </Badge>
                </HStack>
                <HStack spacing={2}>
                  <FiDollarSign color="#3182CE" />
                  <Text fontWeight="semibold" color="blue.500">
                    ${course.price}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </HStack>

          <HStack spacing={2}>
            <Button
              colorScheme="teal"
              size="sm"
              leftIcon={<FiEdit />}
              as={RouterLink}
              to={`/admin/courses/edit/${course._id}`}
              flex={1}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              leftIcon={<FiTrash2 />}
              onClick={() => handleDelete(course._id)}
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
            Courses Management
          </Heading>
          <Button
            colorScheme="blue"
            as={RouterLink}
            to="/admin/courses/add"
            size={{ base: "md", md: "lg" }}
          >
            Add Course
          </Button>
        </Flex>
      </Box>

      {/* Content */}
      <Box bg={cardBg} shadow="sm" borderRadius="lg" overflow="hidden" border="1px" borderColor={borderColor}>
        {isMobile ? (
          // Mobile layout with cards
          <Box p={4}>
            <SimpleGrid columns={1} spacing={4}>
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <Box textAlign="center" py={8}>
                  <Text color={secondaryTextColor}>No courses found.</Text>
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
                      <FiBook />
                      <Text>Title</Text>
                    </HStack>
                  </Th>
                  <Th color="blue.500">Category</Th>
                  <Th color="blue.500">Level</Th>
                  <Th color="blue.500">
                    <HStack spacing={2}>
                      <FiDollarSign />
                      <Text>Price</Text>
                    </HStack>
                  </Th>
                  <Th color="blue.500">Created</Th>
                  <Th color="blue.500">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <Tr key={course._id}>
                      <Td>
                        <HStack spacing={3}>
                          {course.imageUrl && (
                            <Image
                              src={course.imageUrl}
                              alt={course.title}
                              boxSize="40px"
                              objectFit="cover"
                              borderRadius="md"
                            />
                          )}
                          <VStack align="start" spacing={1}>
                            <Text color="blue.500" fontWeight="medium">
                              {course.title}
                            </Text>
                            <Text fontSize="sm" color={secondaryTextColor} noOfLines={1}>
                              {course.description}
                            </Text>
                          </VStack>
                        </HStack>
                      </Td>
                      <Td>
                        <Badge colorScheme="purple" variant="subtle">
                          {course.category}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge colorScheme={getLevelColor(course.level)} variant="subtle">
                          {course.level}
                        </Badge>
                      </Td>
                      <Td color="blue.500" fontWeight="semibold">
                        ${course.price}
                      </Td>
                      <Td color={secondaryTextColor}>
                        {new Date(course.createdAt).toLocaleDateString()}
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button
                            as={RouterLink}
                            to={`/admin/courses/edit/${course._id}`}
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
                            onClick={() => handleDelete(course._id)}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={6} textAlign="center" py={8}>
                      <Text color={secondaryTextColor}>No courses found.</Text>
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

export default CoursesManagementPage;
