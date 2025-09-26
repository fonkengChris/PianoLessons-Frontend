import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Flex,
  HStack,
  Icon,
  Text,
  Button,
  Avatar,
  Wrap,
  WrapItem,
  Select,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  FiUsers,
  FiFolder,
  FiMusic,
  FiGlobe,
  FiUserPlus,
  FiArrowLeft,
  FiMenu,
  FiBook,
  FiStar,
  FiDollarSign,
  FiPlay,
} from "react-icons/fi";
// import jwtDecode from "jwt-decode";
import CurrentUser from "../entities/CurrentUser";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const AdminPage: React.FC = () => {
  const auth = useAuth();
  const [selectedRoute, setSelectedRoute] = useState("/admin/courses");
  const [user, setUser] = useState({} as CurrentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Decode the token to get user info
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken) {
          setUser(decodedToken as CurrentUser);
        }
      }
    } catch (error) {
      console.error("Error setting user from token:", error);
    }
  }, []);

  if (!localStorage.getItem("token")) return <Navigate to="/auth" />;

  // Responsive breakpoints
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });

  if (user.role === "user") return <Navigate to="/api/courses" />;

  // Navigation options for Piano Lessons Admin
  const navigationOptions = [
    // User Management (super_admin only)
    ...(user.role === "super_admin"
      ? [
          {
            path: "/admin/users",
            label: "Users",
            icon: FiUsers,
            section: "USER MANAGEMENT",
          },
        ]
      : []),
    
    // Course Management
    {
      path: "/admin/courses",
      label: "Courses",
      icon: FiBook,
      section: "COURSE MANAGEMENT",
    },
    {
      path: "/admin/category",
      label: "Categories",
      icon: FiFolder,
      section: "COURSE MANAGEMENT",
    },
    {
      path: "/admin/lessons",
      label: "Lessons",
      icon: FiPlay,
      section: "COURSE MANAGEMENT",
    },
    
    
    // Subscription Management (super_admin only)
    ...(user.role === "super_admin"
      ? [
          {
            path: "/admin/subscriptions",
            label: "Subscriptions",
            icon: FiDollarSign,
            section: "SUBSCRIPTION MANAGEMENT",
          },
        ]
      : []),
  ];

  // Handle navigation change
  const handleNavigationChange = (path: string) => {
    setSelectedRoute(path);
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  // Get current route label for selector
  const getCurrentRouteLabel = () => {
    const currentOption = navigationOptions.find(
      (option) => option.path === location.pathname
    );
    return currentOption ? currentOption.label : "Select an option";
  };

  // Sidebar component
  const Sidebar = () => (
    <VStack align="stretch" spacing={6}>
      <Button
        leftIcon={<FiArrowLeft />}
        colorScheme="blue"
        variant="outline"
        color="white"
        _hover={{ bg: "blue.800" }}
        mb={6}
        onClick={() => navigate("/courses")}
        w="full"
      >
        Return to Courses
      </Button>

      {/* User Management Section - Only show for super_admin */}
      {user.role === "super_admin" && (
        <Box>
          <Text fontSize="sm" color="whiteAlpha.700" mb={3} fontWeight="medium">
            USER MANAGEMENT
          </Text>
          <VStack align="stretch" spacing={1}>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Icon as={FiUsers} />}
              color="whiteAlpha.900"
              _hover={{ bg: "blue.800" }}
              onClick={() => handleNavigationChange("/admin/users")}
              isActive={location.pathname === "/admin/users"}
            >
              Users
            </Button>
          </VStack>
        </Box>
      )}

      {/* Course Management Section */}
      <Box>
        <Text fontSize="sm" color="whiteAlpha.700" mb={3} fontWeight="medium">
          COURSE MANAGEMENT
        </Text>
        <VStack align="stretch" spacing={1}>
          <Button
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FiBook} />}
            color="whiteAlpha.900"
            _hover={{ bg: "blue.800" }}
            onClick={() => handleNavigationChange("/admin/courses")}
            isActive={location.pathname === "/admin/courses"}
          >
            Courses
          </Button>
          <Button
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FiFolder} />}
            color="whiteAlpha.900"
            _hover={{ bg: "blue.800" }}
            onClick={() => handleNavigationChange("/admin/category")}
            isActive={location.pathname === "/admin/category"}
          >
            Categories
          </Button>
          <Button
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FiPlay} />}
            color="whiteAlpha.900"
            _hover={{ bg: "blue.800" }}
            onClick={() => handleNavigationChange("/admin/lessons")}
            isActive={location.pathname === "/admin/lessons"}
          >
            Lessons
          </Button>
        </VStack>
      </Box>

    

  

      {/* Subscription Management Section - Only show for super_admin */}
      {user.role === "super_admin" && (
        <Box>
          <Text fontSize="sm" color="whiteAlpha.700" mb={3} fontWeight="medium">
            SUBSCRIPTION MANAGEMENT
          </Text>
          <VStack align="stretch" spacing={1}>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Icon as={FiDollarSign} />}
              color="whiteAlpha.900"
              _hover={{ bg: "blue.800" }}
              onClick={() => handleNavigationChange("/admin/subscriptions")}
              isActive={location.pathname === "/admin/subscriptions"}
            >
              Subscriptions
            </Button>
          </VStack>
        </Box>
      )}
    </VStack>
  );

  return (
    <Flex direction="column" minH="100vh">
      <Flex flex="1">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <Box
          w={{ base: "0", lg: "250px" }}
          bg="blue.950"
          p={4}
          display={{ base: "none", lg: "block" }}
        >
          <Heading size="md" mb={8} color="white">
            Piano Lessons Admin
          </Heading>
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Box
          flex={1}
          bg="#000000"
          p={{ base: 4, md: 6, lg: 8 }}
          overflowY="auto"
        >
          {/* Mobile Header with Menu Button and Selector */}
          <Box bg="white" p={4} borderRadius="lg" mb={4} boxShadow="sm">
            {/* First line: Avatar, Welcome message, and Menu button */}
            <Flex
              align="center"
              justify="space-between"
              mb={{ base: 4, lg: 0 }}
            >
              <HStack spacing={4}>
                <Wrap>
                  <WrapItem>
                    <Avatar name={user.name} size="sm" />
                  </WrapItem>
                </Wrap>
                <Heading
                  size="md"
                  color="blue.600"
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                  textAlign="center"
                >
                  Welcome to Piano Lessons Admin, {user.name}
                </Heading>
              </HStack>

              {/* Mobile Menu Button */}
              <IconButton
                aria-label="Open menu"
                icon={<FiMenu />}
                onClick={onOpen}
                display={{ base: "flex", lg: "none" }}
                colorScheme="blue"
                variant="outline"
              />
            </Flex>

            {/* Second line: Navigation Selector for Mobile/Tablet */}
            <Box display={{ base: "block", lg: "none" }} mb={4}>
              <Select
                value={location.pathname}
                onChange={(e) => handleNavigationChange(e.target.value)}
                placeholder="Select an option"
                size="lg"
                bg="white"
                borderColor="blue.200"
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              >
                {navigationOptions.map((option) => (
                  <option key={option.path} value={option.path}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Desktop instruction */}
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.800"
              display={{ base: "none", lg: "block" }}
              mt={4}
            >
              Manage your Piano Lessons platform - select an option from the sidebar to get started
            </Text>
          </Box>

          {/* Main content box */}
          <Box
            bg="white"
            borderRadius="lg"
            p={{ base: 4, md: 6 }}
            boxShadow="sm"
            mb={4}
          >
            <Outlet />
          </Box>
        </Box>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="blue.950">
          <DrawerCloseButton color="white" />
          <DrawerHeader
            color="white"
            borderBottomWidth="1px"
            borderColor="blue.800"
          >
            Piano Lessons Admin
          </DrawerHeader>
          <DrawerBody p={4}>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Footer />
    </Flex>
  );
};

export default AdminPage;
