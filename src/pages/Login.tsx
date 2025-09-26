import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  Container,
  Divider,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { GoogleLogin } from "@react-oauth/google";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authApi } from "../services/api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem("token", response.data.accessToken);
      setAuth({
        user: {
          _id: response.data.user?._id || email,
          email: email,
          name: response.data.user?.name || email,
          role: response.data.user?.role || "user",
        },
      });

      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Handle Google OAuth login
      console.log("Google login:", credentialResponse);
      // Add Google OAuth logic here
    } catch (error) {
      toast({
        title: "Google login failed",
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <Container maxW="md" py={10}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading size="lg" color="white">
            Welcome Back
          </Heading>
          <Text mt={2} color="gray.100">
            Sign in to your account
          </Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit} w="100%">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="gray.100">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.100">Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    color="gray.300"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              w="100%"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </VStack>
        </Box>

        <Divider borderColor="gray.600" />

        <VStack spacing={4} w="100%">
          <Text fontSize="sm" color="gray.100">
            Or continue with
          </Text>

          <Box w="100%">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                toast({
                  title: "Google login failed",
                  status: "error",
                  duration: 5000,
                });
              }}
              width="400"
            />
          </Box>
        </VStack>

        <VStack spacing={2}>
          <Link as={RouterLink} to="/register" color="blue.300">
            Don't have an account? Sign up
          </Link>
          <Link as={RouterLink} to="/reset-password" color="blue.300">
            Forgot your password?
          </Link>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Login;
