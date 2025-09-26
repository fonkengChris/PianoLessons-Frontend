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
    <Box bg="#000000" minH="100vh" w="100%" p={{ base: 3, md: 4, lg: 5, xl: 8, "2xl": 12 }}>
      <Grid 
        templateColumns={{ base: "1fr", lg: "70% 30%", xl: "75% 25%", "2xl": "80% 20%" }} 
        gap={{ base: 4, md: 6, xl: 8, "2xl": 12 }}
        templateAreas={{
          base: `"main" "sidebar"`,
          lg: `"main sidebar"`
        }}
        w="100%"
        h="100%"
      >
        <Box gridArea="main" w="100%" h="100%">
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
              h={{ base: "300px", md: "400px", xl: "500px", "2xl": "600px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              w="100%"
            >
              <Text color="gray.400" fontSize={{ base: "md", md: "lg", xl: "xl", "2xl": "2xl" }}>
                {!isAuthenticated 
                  ? "Please log in to view course lessons"
                  : lessonsQuery.error?.response?.status === 403
                    ? "Access denied - please contact support"
                    : "No lessons available for this course yet"}
              </Text>
            </Box>
          )}
          <VStack 
            align="start" 
            spacing={{ base: 3, md: 4, xl: 6, "2xl": 8 }} 
            mt={{ base: 3, md: 4, xl: 6, "2xl": 8 }}
            w="100%"
          >
            <Heading 
              color="white" 
              size={{ base: "lg", md: "xl", xl: "2xl", "2xl": "3xl" }}
            >
              Lesson Notes
            </Heading>
            <Text 
              color="gray.300" 
              fontSize={{ base: "sm", md: "md", xl: "lg", "2xl": "xl" }} 
              lineHeight="tall"
              maxW="100%"
            >
              {lessons[selectedLesson]?.description || "No description available for this lesson."}
            </Text>
          </VStack>
        </Box>
        <Box gridArea="sidebar" w="100%" h="100%">
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
              p={{ base: 3, md: 4, xl: 6, "2xl": 8 }}
              borderRadius="md"
              h="100%"
            >
              <Heading 
                color="white" 
                size={{ base: "sm", md: "md", xl: "lg", "2xl": "xl" }} 
                mb={{ base: 3, md: 4, xl: 6, "2xl": 8 }}
              >
                Course Lessons
              </Heading>
              <Text 
                color="gray.400" 
                fontSize={{ base: "sm", md: "md", xl: "lg", "2xl": "xl" }}
              >
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
