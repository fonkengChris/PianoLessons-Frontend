import React from "react";
import { Box, Grid, GridItem, HStack, Show, VStack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import CourseHeading from "../components/CourseHeading";
import CourseLevelSelector from "../components/CourseLevelSelector";
import CourseSortSelector from "../components/CourseSortSelector";
import CourseSearchInput from "../components/CourseSearchInput";
import CourseCategoryList from "../components/CourseCategoryList";
import CourseGrid from "../components/CourseGrid";

const CoursesPage = () => {
  const jwt = localStorage.getItem("token");
  if (!jwt) return <Navigate to="/auth" />;

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav"  "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
        xl: "300px 1fr",
        "2xl": "350px 1fr",
      }}
      gap={{ base: 4, md: 6, xl: 8, "2xl": 12 }}
      w="100%"
      minH="100vh"
    >
      <Show above="lg">
        <GridItem area="aside" w="100%">
          <CourseCategoryList />
        </GridItem>
      </Show>
      <GridItem area="main" w="100%">
        <CourseHeading />
        <Box paddingX={{ base: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }} w="100%">
          <Box marginBottom={{ base: 4, md: 5, xl: 6, "2xl": 8 }}>
            <VStack
              spacing={{ base: 3, md: 4, xl: 6, "2xl": 8 }}
              marginBottom={3}
              width="100%"
              align="stretch"
            >
              <HStack
                spacing={{ base: 3, md: 5, xl: 8, "2xl": 12 }}
                width="100%"
                alignItems="center"
                flexWrap={{ base: "wrap", md: "nowrap" }}
              >
                <CourseLevelSelector />
                <CourseSortSelector />
              </HStack>

              <Box w="100%">
                <CourseSearchInput />
              </Box>
            </VStack>
          </Box>

          <CourseGrid />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default CoursesPage;
