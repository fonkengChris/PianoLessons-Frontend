import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import useCourse from "../hooks/useCourse";
import useLessons from "../hooks/useLessons";
import LessonList from "../components/LessonList";
import VideoPlayer from "../components/VideoPlayer";
import useAuth from "../hooks/useAuth";
import { useSubscription } from "../hooks/useSubscription";
import useCourseProgress from "../hooks/useCourseProgress";
import CourseProgress from "../components/CourseProgress";

const CourseDetailPage = () => {
  const { id } = useParams();
  const courseQuery = useCourse(id!);
  const { auth } = useAuth();
  const { subscription, isSubscribed, isLoading: subscriptionLoading } = useSubscription();
  const [selectedLesson, setSelectedLesson] = useState(0);
  // Disable progress for now since the API endpoint doesn't exist
  // const { progress, isLoading: progressLoading } = useCourseProgress(id!);
  const progress: { completedLessons: string[] } | null = null;
  const progressLoading = false;
  
  // Temporarily bypass subscription - fetch lessons for all authenticated users
  const shouldFetchLessons = !!auth?.user;
  const lessonsQuery = useLessons(id, shouldFetchLessons);

  if (courseQuery.isLoading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (courseQuery.error) {
    return (
      <Center minH="50vh">
        <Text color="red.400" fontSize="lg">
          Error: {courseQuery.error.message}
        </Text>
      </Center>
    );
  }

  if (!courseQuery.data) {
    return (
      <Center minH="50vh">
        <Text color="gray.300" fontSize="lg">
          Course not found
        </Text>
      </Center>
    );
  }

  const course = courseQuery.data;
  const lessons = lessonsQuery.data || [];
  const isAuthenticated = !!auth?.user;
  // Temporarily bypass subscription checks - allow all authenticated users
  const hasActiveSubscription = isAuthenticated;

  const handleLessonSelect = (index: number) => {
    if (!isAuthenticated) {
      // Show login prompt
      return;
    }
    setSelectedLesson(index);
  };

  return (
    <Box bg="#000000" minH="100vh" p={5}>
      <Grid templateColumns={{ base: "1fr", lg: "70% 30%" }} gap={6}>
        <Box>
          {!progressLoading && progress && (
            <CourseProgress
              course={course}
              completedLessons={[]}
            />
          )}
          {/* Video Player */}
          {lessons.length > 0 ? (
            <VideoPlayer
              lesson={lessons[selectedLesson]}
              onLessonComplete={() => {
                // Handle lesson completion
                console.log("Lesson completed:", lessons[selectedLesson].title);
              }}
              isSubscribed={hasActiveSubscription}
            />
          ) : (
            <Box
              bg="#000000"
              h="400px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
            >
              <Text color="gray.400" fontSize="lg">
                {!isAuthenticated 
                  ? "Please log in to view course lessons"
                  : lessonsQuery.error?.response?.status === 403
                    ? "Access denied - please contact support"
                    : "No lessons available for this course yet"}
              </Text>
            </Box>
          )}
          <VStack align="start" spacing={4} mt={4}>
            <Heading color="white" size="xl">
              Lesson Notes
            </Heading>
            <Text color="gray.300" fontSize="md" lineHeight="tall">
              {lessons[selectedLesson].description}
            </Text>
          </VStack>
        </Box>
        <Box>
          {/* Lesson List */}
          {lessons.length > 0 ? (
            <LessonList
              lessons={lessons.map(lesson => ({
                id: lesson._id,
                title: lesson.title,
                duration: lesson.duration,
                order: lesson.order,
              }))}
              onSelect={handleLessonSelect}
              selectedIndex={selectedLesson}
              completedLessons={[]}
              isSubscribed={hasActiveSubscription}
            />
          ) : (
            <Box
              bg="gray.700"
              p={4}
              borderRadius="md"
            >
              <Heading color="white" size="md" mb={4}>
                Course Lessons
              </Heading>
              <Text color="gray.400">
                {!isAuthenticated 
                  ? "Please log in to view course lessons"
                  : lessonsQuery.error?.response?.status === 403
                    ? "Access denied - please contact support"
                    : "No lessons available for this course yet"}
              </Text>
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default CourseDetailPage;
