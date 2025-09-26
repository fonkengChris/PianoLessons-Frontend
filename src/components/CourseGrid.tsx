import { SimpleGrid, Text, Box } from "@chakra-ui/react";
import useCourses from "../hooks/useCourses";
import CourseCard from "./CourseCard";
import PremiumCourseCard from "./PremiumCourseCard";
import CourseCardContainer from "./CourseCardContainer";
import CourseCardSkeleton from "./CourseCardSkeleton";

const CourseGrid = () => {
  const {
    data: courses,
    error,
    isLoading,
  } = useCourses();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  if (error)
    return <Text color="red.500">Error loading courses: {error.message}</Text>;

  // Use courses directly from the API response
  const allCourses = courses || [];

  return (
    <Box padding="10px">
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
        {/* Loading skeletons */}
        {isLoading &&
          skeletons.map((skeleton) => (
            <CourseCardContainer key={skeleton}>
              <CourseCardSkeleton />
            </CourseCardContainer>
          ))}

        {/* Course cards */}
        {allCourses.map((course) => (
          <CourseCardContainer key={course._id}>
            {course.price > 0 ? (
              <PremiumCourseCard course={course} />
            ) : (
              <CourseCard course={course} />
            )}
          </CourseCardContainer>
        ))}
      </SimpleGrid>

      {/* No courses message */}
      {allCourses.length === 0 && !isLoading && (
        <Box padding="20px" textAlign="center">
          <Text color="gray.500">No courses available.</Text>
        </Box>
      )}
    </Box>
  );
};

export default CourseGrid;
