import React from "react";
import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
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
        lg: "200px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area="aside">
          <CourseCategoryList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <CourseHeading />
        <Box paddingX={8}>
          <Box marginBottom={5}>
            <HStack
              spacing={5}
              marginBottom={3}
              width="100%"
              alignItems="center"
            >
              <CourseLevelSelector />
              <CourseSortSelector />
            </HStack>

            <Box marginBottom={3}>
              <CourseSearchInput />
            </Box>
          </Box>

          <CourseGrid />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default CoursesPage;
