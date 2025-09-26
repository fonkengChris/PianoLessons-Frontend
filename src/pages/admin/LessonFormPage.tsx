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
import { courseApi, userApi, categoryApi, lessonApi } from "../../services/api";
import { LessonFormData } from "../../types/forms";
import useCourses from "../../hooks/useCourses";

const LessonFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const apiClient = lessonApi;
  const { data: courses } = useCourses();

  // Color mode values for consistent styling
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("white", "gray.700");
  const inputColor = useColorModeValue("gray.800", "gray.100");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputFocusBorderColor = useColorModeValue("blue.500", "blue.300");

  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    videoUrl: "",
    duration: 0,
    order: 1,
  });

  useEffect(() => {
    if (id) {
      apiClient
        .getById(id)
        .then((response) => {
          const lesson = response.data;
          setFormData({
            courseId: lesson.courseId,
            title: lesson.title,
            description: lesson.description,
            videoUrl: lesson.videoUrl,
            duration: lesson.duration,
            order: lesson.order,
          });
        })
        .catch((error) => {
          toast({
            title: "Error fetching lesson",
            description: error.message,
            status: "error",
          });
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await lessonApi.update(id, formData);
        toast({
          title: "Lesson updated successfully",
          status: "success",
        });
      } else {
        await lessonApi.create(formData);
        toast({
          title: "Lesson created successfully",
          status: "success",
        });
      }
      navigate("/admin/lessons");
    } catch (error) {
      toast({
        title: "Error saving lesson",
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
          {id ? "Edit Lesson" : "Add New Lesson"}
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
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Course</FormLabel>
                  <Select
                    value={formData.courseId}
                    onChange={(e) =>
                      setFormData({ ...formData, courseId: e.target.value })
                    }
                    placeholder="Select course"
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
                    {courses?.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Lesson Title</FormLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter lesson title"
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
                    placeholder="Enter lesson description"
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
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Video URL</FormLabel>
                  <Input
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                    placeholder="Enter video URL"
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
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Duration (minutes)</FormLabel>
                  <NumberInput
                    value={formData.duration}
                    onChange={(_, valueAsNumber) =>
                      setFormData({ ...formData, duration: valueAsNumber || 0 })
                    }
                    min={0}
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

                <FormControl isRequired>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Order</FormLabel>
                  <NumberInput
                    value={formData.order}
                    onChange={(_, valueAsNumber) =>
                      setFormData({ ...formData, order: valueAsNumber || 1 })
                    }
                    min={1}
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

                <Flex gap={4} pt={4}>
                  <Button
                    onClick={() => navigate("/admin/lessons")}
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
                    {id ? "Update Lesson" : "Create Lesson"}
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

export default LessonFormPage;
