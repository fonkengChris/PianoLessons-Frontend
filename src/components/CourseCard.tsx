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
    >
      {/* Price Badge at Top */}
      <Box p={4} pb={0}>
        <Flex justify="flex-end">
          <Box
            bg={course.price === 0 ? "green.500" : "blue.500"}
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
            shadow="md"
          >
            {course.price === 0 ? "Free" : `$${course.price}`}
          </Box>
        </Flex>
      </Box>

      {/* Image Section */}
      <Box position="relative" overflow="hidden" px={4}>
        <Link to={`/courses/${course._id}`}>
          <Image
            width="100%"
            height="220px"
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

      <CardBody p={6}>
        <VStack align="start" spacing={4}>
          {/* Title */}
          <Link to={`/courses/${course._id}`}>
            <Heading 
              size="lg" 
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
            fontSize="md" 
            color="gray.600" 
            noOfLines={3}
            lineHeight="1.4"
          >
            {course.description}
          </Text>

          {/* Badges */}
          <HStack spacing={2} flexWrap="wrap">
            <Badge 
              colorScheme={getLevelColor(course.level)}
              px={3}
              py={1}
              borderRadius="md"
              fontSize="sm"
              fontWeight="semibold"
            >
              {course.level}
            </Badge>
            <Badge 
              colorScheme="blue"
              variant="subtle"
              px={3}
              py={1}
              borderRadius="md"
              fontSize="sm"
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
