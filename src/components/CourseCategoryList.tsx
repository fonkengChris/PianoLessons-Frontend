import { VStack, Text, Box, Badge } from "@chakra-ui/react";
import { useState } from "react";

const CourseCategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: "beginner", name: "Beginner", count: 12 },
    { id: "intermediate", name: "Intermediate", count: 8 },
    { id: "advanced", name: "Advanced", count: 6 },
    { id: "classical", name: "Classical", count: 10 },
    { id: "jazz", name: "Jazz", count: 7 },
    { id: "pop", name: "Pop", count: 15 },
    { id: "theory", name: "Music Theory", count: 5 },
    { id: "technique", name: "Technique", count: 9 },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // TODO: Implement category filtering
    console.log("Selected category:", categoryId);
  };

  return (
    <VStack spacing={2} align="stretch" p={4}>
      <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
        Categories
      </Text>
      {categories.map((category) => (
        <Box
          key={category.id}
          p={3}
          bg={selectedCategory === category.id ? "blue.700" : "gray.700"}
          borderRadius="md"
          cursor="pointer"
          _hover={{ bg: selectedCategory === category.id ? "blue.600" : "gray.600" }}
          onClick={() => handleCategoryClick(category.id)}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text color="white" fontSize="sm">
              {category.name}
            </Text>
            <Badge colorScheme="blue" variant="subtle" fontSize="xs">
              {category.count}
            </Badge>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default CourseCategoryList; 