import React from "react";
import { VStack, Box, Text, Icon, Button } from "@chakra-ui/react";
import { CheckCircleIcon, LockIcon } from "@chakra-ui/icons";

interface Lesson {
  id: string;
  title: string;
  duration: number;
  order: number;
}

interface Props {
  lessons: Lesson[];
  onSelect: (index: number) => void;
  selectedIndex: number;
  completedLessons?: string[];
  isSubscribed: boolean;
}

const LessonList = ({
  lessons,
  onSelect,
  selectedIndex,
  completedLessons = [],
  isSubscribed,
}: Props) => {
  return (
    <VStack spacing={2} align="stretch">
      <Text fontSize="xl" fontWeight="bold" mb={4} color="white">
        Course Content
      </Text>
      {lessons.map((lesson, index) => (
        <Box
          key={lesson.id}
          p={4}
          bg={selectedIndex === index ? "blue.700" : "gray.700"}
          borderRadius="md"
          cursor={isSubscribed ? "pointer" : "not-allowed"}
          onClick={() => isSubscribed && onSelect(index)}
          position="relative"
          border="1px solid"
          borderColor={selectedIndex === index ? "blue.500" : "gray.600"}
          _hover={
            isSubscribed
              ? {
                  bg: selectedIndex === index ? "blue.600" : "gray.600",
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }
              : {}
          }
          transition="all 0.2s"
        >
          <Text fontWeight="medium" color="white">
            {lesson.title}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Duration: {lesson.duration}
          </Text>
          {completedLessons.includes(lesson.id) && (
            <Icon
              as={CheckCircleIcon}
              color="green.400"
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              boxSize={5}
            />
          )}
          {!isSubscribed && (
            <Icon
              as={LockIcon}
              color="gray.500"
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              boxSize={4}
            />
          )}
        </Box>
      ))}
    </VStack>
  );
};

export default LessonList;
