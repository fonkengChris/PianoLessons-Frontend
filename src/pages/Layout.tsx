import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { auth } = useAuth();

  return (
    <Box minH="100vh" bg="#000000" w="100%">
      <MainNavBar user={auth.user} />
      <Box 
        py={{ base: 4, md: 6, lg: 8 }} 
        w="100%"
        minH="calc(100vh - 80px)"
      >
        <Container 
          maxW={{ base: "container.xl", xl: "100%", "2xl": "100%" }} 
          px={{ base: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }}
          w="100%"
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
