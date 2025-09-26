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
    <Box padding={{ base: "10px", xl: "20px", "2xl": "30px" }} w="100%">
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        spacing={{ base: 6, xl: 8, "2xl": 12 }}
        padding={{ base: "10px", xl: "20px", "2xl": "30px" }}
        w="100%"
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
        <Box padding={{ base: "20px", xl: "40px", "2xl": "60px" }} textAlign="center" w="100%">
          <Text 
            color="gray.500" 
            fontSize={{ base: "md", xl: "lg", "2xl": "xl" }}
          >
            No courses available.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default CourseGrid;
