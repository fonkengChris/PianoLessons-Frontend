import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Container,
  SimpleGrid,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  HStack,
  Icon,
  useColorModeValue,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from "@chakra-ui/react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiHelpCircle,
  FiSend,
} from "react-icons/fi";
import { contactApi } from "../services/api";
import useAuth from "../hooks/useAuth";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const { auth } = useAuth();
  const bgColor = useColorModeValue("white", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");

  // Pre-fill form with current user data if logged in
  useEffect(() => {
    if (auth.user) {
      setFormData(prev => ({
        ...prev,
        name: auth.user.name || "",
        email: auth.user.email || "",
      }));
    }
  }, [auth.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const contactData = {
        ...formData,
      };
      
      // Only include userId if user is logged in
      if (auth.user?._id) {
        contactData.userId = auth.user._id;
      }
      
      const response = await contactApi.submit(contactData);

      toast({
        title: "Message sent successfully!",
        description: `We'll get back to you within 24 hours. Reference ID: ${response.data.referenceId}`,
        status: "success",
        duration: 8000,
        isClosable: true,
      });

      // Reset form but keep user info if logged in
      setFormData(prev => ({
        name: auth.user?.name || "",
        email: auth.user?.email || "",
        subject: "",
        message: "",
      }));
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Failed to send message",
        description: error.response?.data?.error || "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      details: "support@pianolessons.com",
      subtitle: "We respond within 24 hours",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: "(555) 123-4567",
      subtitle: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: "123 Music Street",
      subtitle: "New York, NY 10001",
    },
    {
      icon: FiClock,
      title: "Support Hours",
      details: "24/7 Online Support",
      subtitle: "Live chat available",
    },
  ];

  const faqs = [
    {
      question: "How do I get started with piano lessons?",
      answer: "Simply sign up for a free account, browse our courses, and choose the one that matches your skill level. You can start with our beginner courses and work your way up.",
    },
    {
      question: "Do I need a physical piano to take lessons?",
      answer: "While having access to a piano or keyboard is recommended for practice, you can start learning the theory and basics without one. We provide guidance on choosing the right instrument.",
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "Most of our beginner courses require no prior experience. Intermediate and advanced courses may have prerequisites, which are clearly listed in the course description.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not completely satisfied, contact our support team for a full refund.",
    },
    {
      question: "How long do I have access to the courses?",
      answer: "Once you purchase a course, you have lifetime access to it. You can revisit the lessons anytime and continue learning at your own pace.",
    },
    {
      question: "Do you offer certificates upon completion?",
      answer: "Yes, we provide certificates of completion for all our courses. These certificates can be downloaded from your dashboard once you complete all lessons.",
    },
  ];

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-r, blue.600, purple.600)"
        color="white"
        py={16}
        textAlign="center"
      >
        <Container maxW="container.xl">
          <VStack spacing={6}>
            <Heading size="2xl" fontWeight="bold">
              We're Here to Help! 🎹
            </Heading>
            <Text fontSize="xl" color="gray.100" maxW="2xl">
              Have questions or need support? Our friendly team is ready to assist you
              on your musical journey.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
          {/* Contact Form */}
          <Card bg={cardBg} shadow="lg">
            <CardBody p={8}>
              <VStack spacing={6} align="stretch">
                <VStack spacing={2} align="start">
                  <Heading size="lg" color={textColor}>
                    Send us a Message
                  </Heading>
                  <Text color={secondaryTextColor}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Text>
                  {auth.user && (
                    <Text fontSize="sm" color="green.500" fontWeight="medium">
                      ✓ Form pre-filled with your account information
                    </Text>
                  )}
                </VStack>

                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <FormControl isRequired>
                        <FormLabel color={textColor}>Name</FormLabel>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          bg={useColorModeValue("gray.50", "gray.700")}
                          borderColor={useColorModeValue("gray.200", "gray.600")}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel color={textColor}>Email</FormLabel>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          bg={useColorModeValue("gray.50", "gray.700")}
                          borderColor={useColorModeValue("gray.200", "gray.600")}
                        />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl isRequired>
                      <FormLabel color={textColor}>Subject</FormLabel>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        bg={useColorModeValue("gray.50", "gray.700")}
                        borderColor={useColorModeValue("gray.200", "gray.600")}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color={textColor}>Message</FormLabel>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        bg={useColorModeValue("gray.50", "gray.700")}
                        borderColor={useColorModeValue("gray.200", "gray.600")}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      leftIcon={isSubmitting ? <Spinner size="sm" /> : <Icon as={FiSend} />}
                      _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                      transition="all 0.2s"
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </VStack>
                </form>
              </VStack>
            </CardBody>
          </Card>

          {/* Contact Information */}
          <VStack spacing={8} align="stretch">
            {/* Contact Methods */}
            <VStack spacing={6} align="stretch">
              <Heading size="lg" color={textColor}>
                Get in Touch
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                {contactInfo.map((info, index) => (
                  <Card key={index} bg={cardBg} shadow="md" _hover={{ shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                      <VStack spacing={3} align="center" textAlign="center">
                        <Box
                          p={3}
                          borderRadius="full"
                          bg="blue.100"
                          color="blue.600"
                        >
                          <Icon as={info.icon} boxSize={6} />
                        </Box>
                        <VStack spacing={1}>
                          <Text fontWeight="bold" color={textColor} fontSize="sm">
                            {info.title}
                          </Text>
                          <Text color={textColor} fontSize="md">
                            {info.details}
                          </Text>
                          <Text color={secondaryTextColor} fontSize="xs">
                            {info.subtitle}
                          </Text>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>

            {/* FAQ Section */}
            <Card bg={cardBg} shadow="lg">
              <CardBody p={8}>
                <VStack spacing={6} align="stretch">
                  <HStack spacing={3}>
                    <Icon as={FiHelpCircle} color="blue.500" boxSize={6} />
                    <Heading size="lg" color={textColor}>
                      Frequently Asked Questions
                    </Heading>
                  </HStack>
                  
                  <Accordion allowToggle>
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} borderColor={useColorModeValue("gray.200", "gray.600")}>
                        <AccordionButton _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}>
                          <Box flex="1" textAlign="left" color={textColor} fontWeight="medium">
                            {faq.question}
                          </Box>
                          <AccordionIcon color="blue.500" />
                        </AccordionButton>
                        <AccordionPanel pb={4} color={secondaryTextColor}>
                          {faq.answer}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Contact;
