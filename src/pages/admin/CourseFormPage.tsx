import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Flex,
  useColorModeValue,
  Card,
  CardBody,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { courseApi } from "../../services/api";
import { CourseFormData } from "../../types/forms";
import useCourses from "../../hooks/useCourses";

const CourseFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  // Color mode values for consistent styling
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("white", "gray.700");
  const inputColor = useColorModeValue("gray.800", "gray.100");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputFocusBorderColor = useColorModeValue("blue.500", "blue.300");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: 0,
    imageUrl: "",
  });

  const categories = [
    "Classical", "Jazz", "Pop", "Rock", "Blues", 
    "Country", "Folk", "Electronic", "Theory", "Technique"
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    if (id) {
      courseApi
        .getById(id)
        .then((response) => {
          const course = response.data;
          setFormData({
            title: course.title,
            description: course.description,
            category: course.category,
            level: course.level,
            price: course.price,
            imageUrl: course.imageUrl || "",
          });
        })
        .catch((error) => {
          toast({
            title: "Error fetching course",
            description: error.message,
            status: "error",
          });
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Remove empty imageUrl to avoid validation error
      const submitData = { ...formData };
      if (!submitData.imageUrl) {
        delete submitData.imageUrl;
      }
      
      if (id) {
        await courseApi.update(id, submitData);
        toast({
          title: "Course updated successfully",
          status: "success",
        });
      } else {
        await courseApi.create(submitData);
        toast({
          title: "Course created successfully",
          status: "success",
        });
      }
      // Invalidate courses cache to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/admin/courses");
    } catch (error) {
      toast({
        title: "Error saving course",
        description:
          error instanceof Error ? error.message : "An error occurred",
        status: "error",
      });
    }
  };

  return (
    <Box maxW="container.md" mx="auto" py={8} px={6}>
      <VStack spacing={8} align="stretch">
        <Heading color="blue.500" fontWeight="bold" textAlign="center">
          {id ? "Edit Course" : "Add New Course"}
        </Heading>
        
        <Card 
          bg={bgColor} 
          shadow="md" 
          border="1px solid" 
          borderColor={borderColor}
          borderRadius="lg"
        >
          <CardBody p={8}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <FormControl isRequired>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Course Title</FormLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter course title"
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                    _hover={{ borderColor: inputFocusBorderColor }}
                    _focus={{ 
                      borderColor: inputFocusBorderColor, 
                      boxShadow: `0 0 0 1px ${inputFocusBorderColor}` 
                    }}
                    transition="all 0.2s"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Description</FormLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter course description"
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                    _hover={{ borderColor: inputFocusBorderColor }}
                    _focus={{ 
                      borderColor: inputFocusBorderColor, 
                      boxShadow: `0 0 0 1px ${inputFocusBorderColor}` 
                    }}
                    transition="all 0.2s"
                    size="lg"
                    rows={4}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Category</FormLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Select category"
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                    _hover={{ borderColor: inputFocusBorderColor }}
                    _focus={{ 
                      borderColor: inputFocusBorderColor, 
                      boxShadow: `0 0 0 1px ${inputFocusBorderColor}` 
                    }}
                    transition="all 0.2s"
                    size="lg"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Level</FormLabel>
                  <Select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    placeholder="Select level"
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                    _hover={{ borderColor: inputFocusBorderColor }}
                    _focus={{ 
                      borderColor: inputFocusBorderColor, 
                      boxShadow: `0 0 0 1px ${inputFocusBorderColor}` 
                    }}
                    transition="all 0.2s"
                    size="lg"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Price</FormLabel>
                  <NumberInput
                    value={formData.price}
                    onChange={(_, valueAsNumber) =>
                      setFormData({ ...formData, price: valueAsNumber || 0 })
                    }
                    min={0}
                    precision={2}
                    step={0.01}
                    size="lg"
                  >
                    <NumberInputField
                      bg={inputBg}
                      color={inputColor}
                      borderColor={inputBorderColor}
                      _hover={{ borderColor: inputFocusBorderColor }}
                      _focus={{ 
                        borderColor: inputFocusBorderColor, 
                        boxShadow: `0 0 0 1px ${inputFocusBorderColor}` 
                      }}
                      transition="all 0.2s"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Image URL</FormLabel>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="Enter image URL (optional)"
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                    _hover={{ borderColor: inputFocusBorderColor }}
                    _focus={{ 
                      borderColor: inputFocusBorderColor, 
                      boxShadow: `0 0 0 1px ${inputFocusBorderColor}` 
                    }}
                    transition="all 0.2s"
                    size="lg"
                  />
                </FormControl>

                <Flex gap={4} pt={4}>
                  <Button
                    onClick={() => navigate("/admin/courses")}
                    colorScheme="red"
                    flex={1}
                    minW="140px"
                    size="lg"
                    _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
                    transition="all 0.2s"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    colorScheme="blue" 
                    flex={1} 
                    minW="140px"
                    size="lg"
                    _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
                    transition="all 0.2s"
                  >
                    {id ? "Update Course" : "Create Course"}
                  </Button>
                </Flex>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default CourseFormPage;
