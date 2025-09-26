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
  Textarea,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { courseApi, userApi, categoryApi, lessonApi } from "../../services/api";
import Category from "../../entities/Category";
import { CategoryFormData } from "../../types/forms";

const CategoryFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const apiClient = categoryApi;

  // Color mode values for consistent styling
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("white", "gray.700");
  const inputColor = useColorModeValue("gray.800", "gray.100");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputFocusBorderColor = useColorModeValue("blue.500", "blue.300");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      apiClient
        .getById(id)
        .then((category) =>
          setFormData({
            name: category.name,
            description: category.description || "",
          })
        )
        .catch((error) => {
          toast({
            title: "Error fetching category",
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
        await courseApi.update(id, formData);
        toast({
          title: "Category updated successfully",
          status: "success",
        });
      } else {
        await courseApi.create(formData);
        toast({
          title: "Category created successfully",
          status: "success",
        });
      }
      navigate("/admin/category");
    } catch (error) {
      toast({
        title: "Error saving category",
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
          {id ? "Edit Category" : "Add New Category"}
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
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Category Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter category name"
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

                <FormControl>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Description</FormLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter category description (optional)"
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

                <Flex gap={4} pt={4}>
                  <Button
                    onClick={() => navigate("/admin/category")}
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
                    {id ? "Update Category" : "Create Category"}
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

export default CategoryFormPage;
