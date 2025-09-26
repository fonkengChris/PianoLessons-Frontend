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
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { courseApi, userApi, categoryApi, lessonApi } from "../../services/api";
import User from "../../entities/User";
import { UserPayload } from "../../types/forms";

const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const apiClient = userApi;

  // Color mode values for consistent styling
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("white", "gray.700");
  const inputColor = useColorModeValue("gray.800", "gray.100");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputFocusBorderColor = useColorModeValue("blue.500", "blue.300");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (id) {
      apiClient
        .getById(id)
        .then((user) =>
          setFormData({
            name: user.name,
            email: user.email,
            password: "", // Don't populate password for security
            role: user.role,
          })
        )
        .catch((error) => {
          toast({
            title: "Error fetching user",
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
        // For updates, don't send password if it's empty
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        await courseApi.update(id, updateData);
        toast({
          title: "User updated successfully",
          status: "success",
        });
      } else {
        await courseApi.create(formData);
        toast({
          title: "User created successfully",
          status: "success",
        });
      }
      navigate("/admin/users");
    } catch (error) {
      toast({
        title: "Error saving user",
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
          {id ? "Edit User" : "Add New User"}
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
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Full Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter full name"
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
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
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

                <FormControl isRequired={!id}>
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>
                    Password {id && "(leave empty to keep current)"}
                  </FormLabel>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter password"
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
                  <FormLabel color="blue.500" fontWeight="semibold" mb={2}>Role</FormLabel>
                  <Select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
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
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </Select>
                </FormControl>

                <Flex gap={4} pt={4}>
                  <Button
                    onClick={() => navigate("/admin/users")}
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
                    {id ? "Update User" : "Create User"}
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

export default UserFormPage;
