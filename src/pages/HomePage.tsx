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
    <Box w="100%" minH="100vh">
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-r, blue.600, purple.600)"
        color="white"
        py={{ base: 12, md: 16, lg: 20, xl: 24, "2xl": 32 }}
        textAlign="center"
        w="100%"
        minH={{ base: "60vh", lg: "70vh", xl: "80vh", "2xl": "85vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box px={{ base: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }} w="100%" maxW="8xl" mx="auto">
          <VStack spacing={{ base: 6, md: 8, xl: 12, "2xl": 16 }}>
            <Heading 
              size={{ base: "xl", sm: "2xl", md: "3xl", xl: "4xl", "2xl": "5xl" }} 
              fontWeight="bold"
              lineHeight="shorter"
              maxW="6xl"
            >
              🎹 Master the Piano, Master Your Dreams
            </Heading>
            <Text 
              fontSize={{ base: "md", sm: "lg", md: "xl", xl: "2xl", "2xl": "3xl" }} 
              maxW="4xl" 
              color="gray.100"
              px={{ base: 2, md: 0 }}
              lineHeight="relaxed"
            >
              Transform your musical journey with our comprehensive piano lessons.
              From complete beginner to advanced performer, we've got you covered.
            </Text>
            <VStack 
              spacing={{ base: 3, md: 4, xl: 6 }} 
              pt={4}
              direction={{ base: "column", sm: "row" }}
              w={{ base: "100%", sm: "auto" }}
            >
              <Link to="/courses" style={{ width: "100%" }}>
                <Button
                  colorScheme="white"
                  size={{ base: "md", md: "lg", xl: "xl", "2xl": "2xl" }}
                  color="blue.600"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                  w={{ base: "100%", sm: "auto" }}
                  minW={{ base: "200px", sm: "auto", xl: "250px", "2xl": "300px" }}
                  h={{ xl: "60px", "2xl": "70px" }}
                  fontSize={{ xl: "lg", "2xl": "xl" }}
                >
                  Start Learning Now
                </Button>
              </Link>
              <Link to="/pricing" style={{ width: "100%" }}>
                <Button
                  variant="outline"
                  size={{ base: "md", md: "lg", xl: "xl", "2xl": "2xl" }}
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "white", color: "blue.600" }}
                  transition="all 0.2s"
                  w={{ base: "100%", sm: "auto" }}
                  minW={{ base: "200px", sm: "auto", xl: "250px", "2xl": "300px" }}
                  h={{ xl: "60px", "2xl": "70px" }}
                  fontSize={{ xl: "lg", "2xl": "xl" }}
                >
                  View Pricing
                </Button>
              </Link>
            </VStack>
          </VStack>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box py={{ base: 12, md: 16, xl: 20, "2xl": 24 }} bg={bgColor} w="100%">
        <Box px={{ base: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }} w="100%" maxW="8xl" mx="auto">
          <SimpleGrid 
            columns={{ base: 2, md: 4 }} 
            spacing={{ base: 6, md: 8, xl: 12, "2xl": 16 }} 
            textAlign="center"
            w="100%"
          >
            {stats.map((stat, index) => (
              <VStack key={index} spacing={{ base: 2, xl: 4, "2xl": 6 }}>
                <Heading 
                  size={{ base: "lg", md: "xl", xl: "2xl", "2xl": "3xl" }} 
                  color="blue.500" 
                  fontWeight="bold"
                >
                  {stat.number}
                </Heading>
                <Text 
                  color={secondaryTextColor} 
                  fontSize={{ base: "sm", md: "lg", xl: "xl", "2xl": "2xl" }}
                >
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Features Section */}
      <Box py={{ base: 12, md: 16, xl: 20, "2xl": 24 }} bg={useColorModeValue("gray.50", "gray.800")} w="100%">
        <Box px={{ base: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }} w="100%" maxW="8xl" mx="auto">
          <VStack spacing={{ base: 8, md: 12, xl: 16, "2xl": 20 }}>
            <VStack spacing={{ base: 4, xl: 6, "2xl": 8 }} textAlign="center">
              <Heading size={{ base: "xl", md: "2xl", xl: "3xl", "2xl": "4xl" }} color={textColor}>
                Why Choose Our Piano Lessons?
              </Heading>
              <Text 
                fontSize={{ base: "md", md: "lg", xl: "xl", "2xl": "2xl" }} 
                color={secondaryTextColor} 
                maxW="4xl"
                lineHeight="relaxed"
              >
                We provide everything you need to succeed in your musical journey
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 1, sm: 2, lg: 4 }} 
              spacing={{ base: 6, md: 8, xl: 12, "2xl": 16 }}
              w="100%"
            >
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  bg={cardBg} 
                  shadow="md" 
                  _hover={{ shadow: "lg" }} 
                  transition="all 0.2s"
                  h="100%"
                >
                  <CardBody p={{ base: 4, md: 6, xl: 8, "2xl": 10 }} textAlign="center" h="100%">
                    <VStack spacing={{ base: 3, md: 4, xl: 6, "2xl": 8 }} h="100%">
                      <Box
                        p={{ base: 3, md: 4, xl: 6, "2xl": 8 }}
                        borderRadius="full"
                        bg="blue.100"
                        color="blue.600"
                      >
                        <Icon as={feature.icon} boxSize={{ base: 6, md: 8, xl: 10, "2xl": 12 }} />
                      </Box>
                      <Heading size={{ base: "sm", md: "md", xl: "lg", "2xl": "xl" }} color={textColor}>
                        {feature.title}
                      </Heading>
                      <Text 
                        color={secondaryTextColor} 
                        fontSize={{ base: "xs", md: "sm", xl: "md", "2xl": "lg" }}
                        lineHeight="relaxed"
                      >
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
      <Box py={{ base: 12, md: 16, xl: 20, "2xl": 24 }} bg={bgColor} w="100%">
        <Box px={{ base: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }} w="100%" maxW="8xl" mx="auto">
          <VStack spacing={{ base: 8, md: 12, xl: 16, "2xl": 20 }}>
            <VStack spacing={{ base: 4, xl: 6, "2xl": 8 }} textAlign="center">
              <Heading size={{ base: "xl", md: "2xl", xl: "3xl", "2xl": "4xl" }} color={textColor}>
                What Our Students Say
              </Heading>
              <Text 
                fontSize={{ base: "md", md: "lg", xl: "xl", "2xl": "2xl" }} 
                color={secondaryTextColor} 
                maxW="4xl"
                lineHeight="relaxed"
              >
                Join thousands of satisfied students who have transformed their musical skills
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              spacing={{ base: 6, md: 8, xl: 12, "2xl": 16 }}
              w="100%"
            >
              {testimonials.map((testimonial, index) => (
                <Card key={index} bg={cardBg} shadow="md" h="100%">
                  <CardBody p={{ base: 4, md: 6, xl: 8, "2xl": 10 }} h="100%">
                    <VStack spacing={{ base: 3, md: 4, xl: 6, "2xl": 8 }} align="start" h="100%">
                      <HStack spacing={1}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Icon 
                            key={i} 
                            as={FiStar} 
                            color="yellow.400" 
                            boxSize={{ base: 4, md: 5, xl: 6, "2xl": 7 }} 
                          />
                        ))}
                      </HStack>
                      <Text 
                        color={secondaryTextColor} 
                        fontStyle="italic" 
                        fontSize={{ base: "sm", md: "md", xl: "lg", "2xl": "xl" }}
                        lineHeight="relaxed"
                      >
                        "{testimonial.content}"
                      </Text>
                      <VStack align="start" spacing={1} mt="auto">
                        <Text 
                          fontWeight="bold" 
                          color={textColor} 
                          fontSize={{ base: "sm", md: "md", xl: "lg", "2xl": "xl" }}
                        >
                          {testimonial.name}
                        </Text>
                        <Text 
                          fontSize={{ base: "xs", md: "sm", xl: "md", "2xl": "lg" }} 
                          color={secondaryTextColor}
                        >
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
        py={{ base: 12, md: 16, xl: 24, "2xl": 32 }}
        textAlign="center"
        w="100%"
        minH={{ base: "40vh", lg: "50vh", xl: "60vh", "2xl": "70vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box px={{ base: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }} w="100%" maxW="8xl" mx="auto">
          <VStack spacing={{ base: 6, md: 8, xl: 12, "2xl": 16 }}>
            <Heading size={{ base: "xl", md: "2xl", xl: "3xl", "2xl": "4xl" }}>
              Ready to Start Your Musical Journey?
            </Heading>
            <Text 
              fontSize={{ base: "md", sm: "lg", md: "xl", xl: "2xl", "2xl": "3xl" }} 
              color="gray.100" 
              maxW="4xl" 
              px={{ base: 2, md: 0 }}
              lineHeight="relaxed"
            >
              Join our community of passionate learners and unlock your potential today.
              No experience required - we'll guide you every step of the way.
            </Text>
            <VStack 
              spacing={{ base: 3, md: 4, xl: 6 }} 
              pt={4}
              direction={{ base: "column", sm: "row" }}
              w={{ base: "100%", sm: "auto" }}
            >
              <Link to="/register" style={{ width: "100%" }}>
                <Button
                  colorScheme="white"
                  size={{ base: "md", md: "lg", xl: "xl", "2xl": "2xl" }}
                  color="blue.600"
                  leftIcon={<Icon as={FiMusic} />}
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                  w={{ base: "100%", sm: "auto" }}
                  minW={{ base: "200px", sm: "auto", xl: "250px", "2xl": "300px" }}
                  h={{ xl: "60px", "2xl": "70px" }}
                  fontSize={{ xl: "lg", "2xl": "xl" }}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/courses" style={{ width: "100%" }}>
                <Button
                  variant="outline"
                  size={{ base: "md", md: "lg", xl: "xl", "2xl": "2xl" }}
                  borderColor="white"
                  color="white"
                  leftIcon={<Icon as={FiBookOpen} />}
                  _hover={{ bg: "white", color: "blue.600" }}
                  transition="all 0.2s"
                  w={{ base: "100%", sm: "auto" }}
                  minW={{ base: "200px", sm: "auto", xl: "250px", "2xl": "300px" }}
                  h={{ xl: "60px", "2xl": "70px" }}
                  fontSize={{ xl: "lg", "2xl": "xl" }}
                >
                  Browse Courses
                </Button>
              </Link>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
