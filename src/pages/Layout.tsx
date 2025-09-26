import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { auth } = useAuth();

  return (
    <Box minH="100vh" bg="#000000">
      <MainNavBar user={auth.user} />
      <Box py={8}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
