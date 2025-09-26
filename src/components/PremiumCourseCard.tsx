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
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Course } from "../entities/Course";
import { StarIcon } from "@chakra-ui/icons";

interface Props {
  course: Course;
}

const PremiumCourseCard = ({ course }: Props) => {
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

  return (
    <Card
      bg="blue.700"
      color="white"
      _hover={{ bg: "blue.600" }}
      position="relative"
    >
      {/* Premium badge */}
      <Box position="absolute" top={2} right={2} zIndex={1}>
        <Badge colorScheme="yellow" variant="solid">
          <StarIcon mr={1} />
          Premium
        </Badge>
      </Box>

      <Link to={`/courses/${course._id}`}>
        <Image
          boxSize="200px"
          objectFit="cover"
          src={course.imageUrl || "https://via.placeholder.com/200x200/2B6CB0/FFFFFF?text=Premium+Course"}
          alt={course.title}
        />
      </Link>
      <CardBody>
        <VStack align="start" spacing={3}>
          <Link to={`/courses/${course._id}`}>
            <Heading size="md" color="white" _hover={{ color: "blue.200" }}>
              {course.title}
            </Heading>
          </Link>

          <Text fontSize="sm" color="gray.200" noOfLines={2}>
            {course.description}
          </Text>

          <HStack spacing={2}>
            <Badge colorScheme={getLevelColor(course.level)}>
              {course.level}
            </Badge>
            <Badge colorScheme="cyan">
              {course.category}
            </Badge>
          </HStack>

          <HStack justifyContent="space-between" width="100%">
            <Text fontSize="sm" color="gray.300">
              Premium Course
            </Text>
            <Text color="yellow.400" fontWeight="bold">
              ${course.price}
            </Text>
          </HStack>

          <Button colorScheme="yellow" size="sm" width="100%" variant="solid">
            Enroll Now
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PremiumCourseCard;
