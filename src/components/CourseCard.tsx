import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Badge,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Course } from "../entities/Course";

interface Props {
  course: Course;
}

const CourseCard = ({ course }: Props) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "green";
      case "Intermediate":
        return "yellow";
      case "Advanced":
        return "red";
      default:
        return "gray";
    }
  };

  // Construct proper image URL
  const getImageUrl = () => {
    if (!course.imageUrl) {
      return "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center";
    }
    
    // If it's already a full URL, return as is
    if (course.imageUrl.startsWith('http')) {
      return course.imageUrl;
    }
    
    // If it's a relative path (like /uploads/filename), construct full URL
    if (course.imageUrl.startsWith('/')) {
      return `http://localhost:5000${course.imageUrl}`;
    }
    
    // Fallback
    return course.imageUrl;
  };

  return (
    <Card 
      bg="white" 
      color="gray.800" 
      shadow="lg"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ 
        transform: "translateY(-4px)",
        shadow: "2xl"
      }}
      border="1px"
      borderColor="gray.200"
      w="100%"
      maxW={{ base: "100%", sm: "400px", md: "100%", xl: "100%", "2xl": "100%" }}
      mx="auto"
      h="100%"
    >
      {/* Price Badge at Top */}
      <Box p={{ base: 3, md: 4 }} pb={0}>
        <Flex justify="flex-end">
          <Box
            bg={course.price === 0 ? "green.500" : "blue.500"}
            color="white"
            px={{ base: 2, md: 3 }}
            py={1}
            borderRadius="full"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="bold"
            shadow="md"
          >
            {course.price === 0 ? "Free" : `$${course.price}`}
          </Box>
        </Flex>
      </Box>

      {/* Image Section */}
      <Box position="relative" overflow="hidden" px={{ base: 3, md: 4 }}>
        <Link to={`/courses/${course._id}`}>
          <Image
            width="100%"
            height={{ base: "180px", sm: "200px", md: "220px", xl: "250px", "2xl": "280px" }}
            objectFit="cover"
            src={getImageUrl()}
            alt={course.title}
            fallbackSrc="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=220&fit=crop&crop=center"
            loading="lazy"
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
            borderRadius="lg"
          />
        </Link>
      </Box>

      <CardBody p={{ base: 4, md: 6, xl: 8, "2xl": 10 }} h="100%" display="flex" flexDirection="column">
        <VStack align="start" spacing={{ base: 3, md: 4, xl: 6, "2xl": 8 }} h="100%">
          {/* Title */}
          <Link to={`/courses/${course._id}`}>
            <Heading 
              size={{ base: "md", md: "lg", xl: "xl", "2xl": "2xl" }}
              color="gray.800" 
              _hover={{ color: "blue.500" }}
              transition="color 0.2s ease"
              lineHeight="1.2"
            >
              {course.title}
            </Heading>
          </Link>

          {/* Description */}
          <Text 
            fontSize={{ base: "sm", md: "md", xl: "lg", "2xl": "xl" }}
            color="gray.600" 
            noOfLines={{ base: 2, md: 3, xl: 4, "2xl": 5 }}
            lineHeight="1.4"
            flex="1"
          >
            {course.description}
          </Text>

          {/* Badges */}
          <HStack spacing={2} flexWrap="wrap" mt="auto">
            <Badge 
              colorScheme={getLevelColor(course.level)}
              px={{ base: 2, md: 3, xl: 4, "2xl": 5 }}
              py={{ base: 1, xl: 2, "2xl": 3 }}
              borderRadius="md"
              fontSize={{ base: "xs", md: "sm", xl: "md", "2xl": "lg" }}
              fontWeight="semibold"
            >
              {course.level}
            </Badge>
            <Badge 
              colorScheme="blue"
              variant="subtle"
              px={{ base: 2, md: 3, xl: 4, "2xl": 5 }}
              py={{ base: 1, xl: 2, "2xl": 3 }}
              borderRadius="md"
              fontSize={{ base: "xs", md: "sm", xl: "md", "2xl": "lg" }}
              fontWeight="semibold"
            >
              {course.category}
            </Badge>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CourseCard;
