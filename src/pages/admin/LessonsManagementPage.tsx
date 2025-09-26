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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlay, FiClock } from "react-icons/fi";
import { courseApi, userApi, categoryApi, lessonApi } from "../../services/api";

const LessonsManagementPage = () => {
  const [lessons, setLessons] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const toast = useToast();

  // Responsive breakpoints
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Color mode values for better visibility
  const textColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const apiClient = lessonApi;

  React.useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const response = await lessonApi.getAll();
      setLessons(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch lessons");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return <Box p={4}>Error loading lessons: {error}</Box>;
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lesson?"))
      return;

    try {
      await lessonApi.delete(id);
      toast({
        title: "Lesson deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchLessons();
    } catch (error) {
      toast({
        title: "Error deleting lesson",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Mobile card component
  const LessonCard = ({ lesson }: { lesson: any }) => (
    <Card shadow="sm" border="1px" borderColor={borderColor} bg={cardBg}>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={2}>
              <HStack spacing={3}>
                <FiPlay size={20} color="#3182CE" />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="lg" color="blue.500">
                    {lesson.title}
                  </Text>
                  <Text fontSize="sm" color={secondaryTextColor} noOfLines={2}>
                    {lesson.description}
                  </Text>
                </VStack>
              </HStack>
              
              <HStack spacing={4}>
                <HStack spacing={1}>
                  <FiClock size={14} color={secondaryTextColor} />
                  <Text fontSize="sm" color={secondaryTextColor}>
                    {lesson.duration} min
                  </Text>
                </HStack>
                <Badge colorScheme="blue" variant="subtle">
                  Order: {lesson.order}
                </Badge>
              </HStack>
              
              {lesson.courseId && typeof lesson.courseId === 'object' && (
                <Text fontSize="xs" color={secondaryTextColor}>
                  Course: {lesson.courseId.title}
                </Text>
              )}
            </VStack>
          </HStack>

          <HStack spacing={2}>
            <Button
              colorScheme="teal"
              size="sm"
              leftIcon={<FiEdit />}
              as={RouterLink}
              to={`/admin/lessons/edit/${lesson._id}`}
              flex={1}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              leftIcon={<FiTrash2 />}
              onClick={() => handleDelete(lesson._id)}
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
            Lessons Management
          </Heading>
          <Button
            colorScheme="blue"
            as={RouterLink}
            to="/admin/lessons/add"
            size={{ base: "md", md: "lg" }}
          >
            Add Lesson
          </Button>
        </Flex>
      </Box>

      {/* Content */}
      <Box bg={cardBg} shadow="sm" borderRadius="lg" overflow="hidden" border="1px" borderColor={borderColor}>
        {isMobile ? (
          // Mobile layout with cards
          <Box p={4}>
            <SimpleGrid columns={1} spacing={4}>
              {lessons && lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <LessonCard key={lesson._id} lesson={lesson} />
                ))
              ) : (
                <Box textAlign="center" py={8}>
                  <Text color={secondaryTextColor}>No lessons found.</Text>
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
                      <FiPlay />
                      <Text>Title</Text>
                    </HStack>
                  </Th>
                  <Th color="blue.500">Course</Th>
                  <Th color="blue.500">
                    <HStack spacing={2}>
                      <FiClock />
                      <Text>Duration</Text>
                    </HStack>
                  </Th>
                  <Th color="blue.500">Order</Th>
                  <Th color="blue.500">Created</Th>
                  <Th color="blue.500">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {lessons && lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <Tr key={lesson._id}>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text color="blue.500" fontWeight="medium">
                            {lesson.title}
                          </Text>
                          <Text fontSize="sm" color={secondaryTextColor} noOfLines={1}>
                            {lesson.description}
                          </Text>
                        </VStack>
                      </Td>
                      <Td color={textColor}>
                        {lesson.courseId && typeof lesson.courseId === 'object' 
                          ? lesson.courseId.title 
                          : "Unknown Course"}
                      </Td>
                      <Td color={textColor}>
                        {lesson.duration} min
                      </Td>
                      <Td>
                        <Badge colorScheme="blue" variant="subtle">
                          {lesson.order}
                        </Badge>
                      </Td>
                      <Td color={secondaryTextColor}>
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button
                            as={RouterLink}
                            to={`/admin/lessons/edit/${lesson._id}`}
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
                            onClick={() => handleDelete(lesson._id)}
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
                      <Text color={secondaryTextColor}>No lessons found.</Text>
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

export default LessonsManagementPage;
