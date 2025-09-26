import { Box, Heading, Text } from "@chakra-ui/react";

const CourseHeading = () => {
  return (
    <Box p={8} textAlign="center">
      <Heading size="xl" color="white" mb={4}>
        Piano Courses
      </Heading>
      <Text fontSize="lg" color="gray.300" maxW="2xl" mx="auto">
        Discover comprehensive piano lessons for all skill levels. From beginner basics to advanced techniques, 
        our expert instructors will guide you through your musical journey.
      </Text>
    </Box>
  );
};

export default CourseHeading; 