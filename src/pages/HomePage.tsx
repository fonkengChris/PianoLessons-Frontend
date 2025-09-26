import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Flex,
  Badge,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FiPlay,
  FiUsers,
  FiAward,
  FiHeadphones,
  FiClock,
  FiStar,
  FiMusic,
  FiBookOpen,
} from "react-icons/fi";

const HomePage = () => {
  const bgColor = useColorModeValue("white", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("blue.600", "blue.300");
  const secondaryTextColor = useColorModeValue("blue.500", "blue.400");

  const features = [
    {
      icon: FiPlay,
      title: "Interactive Lessons",
      description: "Learn with video tutorials, practice exercises, and real-time feedback.",
    },
    {
      icon: FiUsers,
      title: "Expert Instructors",
      description: "Learn from professional pianists with years of teaching experience.",
    },
    {
      icon: FiAward,
      title: "Certified Courses",
      description: "Get certificates upon completion and track your progress.",
    },
    {
      icon: FiHeadphones,
      title: "Audio Support",
      description: "High-quality audio lessons with downloadable practice materials.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Agbor Eta",
      role: "Beginner Student",
      content: "I never thought I could learn piano online, but this platform made it so easy and fun!",
      rating: 5,
    },
    {
      name: "Michael Che Niba",
      role: "Intermediate Player",
      content: "The structured lessons and expert feedback helped me improve dramatically in just 3 months.",
      rating: 5,
    },
    {
      name: "Emily Emade",
      role: "Advanced Student",
      content: "Finally found a platform that challenges me and helps me reach the next level.",
      rating: 5,
    },
    {
      name: "Brinin Chu",
      role: "Advanced Student",
      content: "Finally found a platform that challenges me and helps me reach the next level.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students" },
    { number: "50+", label: "Courses" },
    { number: "100+", label: "Lessons" },
    { number: "4.9/5", label: "Rating" },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-r, blue.600, purple.600)"
        color="white"
        py={20}
        textAlign="center"
      >
        <Box px={4}>
          <VStack spacing={8}>
            <Heading size="3xl" fontWeight="bold">
              🎹 Master the Piano, Master Your Dreams
            </Heading>
            <Text fontSize="xl" maxW="2xl" color="gray.100">
              Transform your musical journey with our comprehensive piano lessons.
              From complete beginner to advanced performer, we've got you covered.
            </Text>
            <HStack spacing={4} pt={4}>
              <Link to="/courses">
                <Button
                  colorScheme="white"
                  size="lg"
                  color="blue.600"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                >
                  Start Learning Now
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "white", color: "blue.600" }}
                  transition="all 0.2s"
                >
                  View Pricing
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box py={16} bg={bgColor}>
        <Box px={4}>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} textAlign="center">
            {stats.map((stat, index) => (
              <VStack key={index} spacing={2}>
                <Heading size="xl" color="blue.500" fontWeight="bold">
                  {stat.number}
                </Heading>
                <Text color={secondaryTextColor} fontSize="lg">
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Features Section */}
      <Box py={16} bg={useColorModeValue("gray.50", "gray.800")}>
        <Box px={4}>
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color={textColor}>
                Why Choose Our Piano Lessons?
              </Heading>
              <Text fontSize="lg" color={secondaryTextColor} maxW="2xl">
                We provide everything you need to succeed in your musical journey
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {features.map((feature, index) => (
                <Card key={index} bg={cardBg} shadow="md" _hover={{ shadow: "lg" }} transition="all 0.2s">
                  <CardBody p={6} textAlign="center">
                    <VStack spacing={4}>
                      <Box
                        p={4}
                        borderRadius="full"
                        bg="blue.100"
                        color="blue.600"
                      >
                        <Icon as={feature.icon} boxSize={8} />
                      </Box>
                      <Heading size="md" color={textColor}>
                        {feature.title}
                      </Heading>
                      <Text color={secondaryTextColor} fontSize="sm">
                        {feature.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box py={16} bg={bgColor}>
        <Box px={4}>
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color={textColor}>
                What Our Students Say
              </Heading>
              <Text fontSize="lg" color={secondaryTextColor} maxW="2xl">
                Join thousands of satisfied students who have transformed their musical skills
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {testimonials.map((testimonial, index) => (
                <Card key={index} bg={cardBg} shadow="md">
                  <CardBody p={6}>
                    <VStack spacing={4} align="start">
                      <HStack spacing={1}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Icon key={i} as={FiStar} color="yellow.400" />
                        ))}
                      </HStack>
                      <Text color={secondaryTextColor} fontStyle="italic">
                        "{testimonial.content}"
                      </Text>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" color={textColor}>
                          {testimonial.name}
                        </Text>
                        <Text fontSize="sm" color={secondaryTextColor}>
                          {testimonial.role}
                        </Text>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box
        bgGradient="linear(to-r, blue.600, purple.600)"
        color="white"
        py={16}
        textAlign="center"
      >
        <Box px={4}>
          <VStack spacing={8}>
            <Heading size="2xl">
              Ready to Start Your Musical Journey?
            </Heading>
            <Text fontSize="xl" color="gray.100" maxW="2xl">
              Join our community of passionate learners and unlock your potential today.
              No experience required - we'll guide you every step of the way.
            </Text>
            <HStack spacing={4} pt={4}>
              <Link to="/register">
                <Button
                  colorScheme="white"
                  size="lg"
                  color="blue.600"
                  leftIcon={<Icon as={FiMusic} />}
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  borderColor="white"
                  color="white"
                  leftIcon={<Icon as={FiBookOpen} />}
                  _hover={{ bg: "white", color: "blue.600" }}
                  transition="all 0.2s"
                >
                  Browse Courses
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
