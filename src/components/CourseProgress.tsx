import React from "react";
import { Progress, Box, Text, VStack } from "@chakra-ui/react";
import { Course } from "../entities/Course";

interface Props {
  course: Course;
  completedLessons: string[];
}

const CourseProgress = ({ course, completedLessons }: Props) => {
  const progress = (completedLessons.length / course.lessons.length) * 100;

  return (
    <VStack spacing={2} align="stretch" mb={4}>
      <Box display="flex" justifyContent="space-between">
        <Text color="white" fontWeight="medium">
          Course Progress
        </Text>
        <Text color="blue.300" fontWeight="bold">
          {Math.round(progress)}%
        </Text>
      </Box>
      <Progress
        value={progress}
        colorScheme="green"
        size="sm"
        borderRadius="md"
        bg="gray.600"
      />
      <Text fontSize="sm" color="gray.400">
        {completedLessons.length} of {course.lessons.length} lessons completed
      </Text>
    </VStack>
  );
};

export default CourseProgress;
