import {
  Avatar,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  IconButton,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

interface AuthUser {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "super_admin";
}

interface Props {
  user: AuthUser | null;
}

const MainNavBar = ({ user }: Props) => {
  const ListOfActions = [
    { value: `/users/${user?._id}`, label: "User Profile" },
    { value: "/change_password", label: "Change Password" },
  ];

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenRef");
    navigate("/logout");
    navigate(0);
  };

  const getFirstName = (fullName: string | undefined | null) => {
    if (!fullName) return "User";
    return fullName.split(" ")[0];
  };

  const NavLinks = () => (
    <List>
      <Flex direction={{ base: "column", md: "row" }} gap={2}>
        <ListItem>
          <Button colorScheme="cyan" variant="solid" bg="cyan.600" width="100%">
            <NavLink to="/">Home</NavLink>
          </Button>
        </ListItem>
        <ListItem>
          <Button colorScheme="cyan" variant="solid" bg="cyan.600" width="100%">
            <NavLink to="/courses">Courses</NavLink>
          </Button>
        </ListItem>
        <ListItem>
          <Button colorScheme="cyan" variant="solid" bg="cyan.600" width="100%">
            <NavLink to="/pricing">Pricing</NavLink>
          </Button>
        </ListItem>
        <ListItem>
          <Button colorScheme="cyan" variant="solid" bg="cyan.600" width="100%">
            <NavLink to="/contact">Contact</NavLink>
          </Button>
        </ListItem>

        {(user?.role === "admin" || user?.role === "super_admin") && (
          <ListItem>
            <Button
              colorScheme="cyan"
              variant="solid"
              bg="cyan.600"
              width="100%"
            >
              <NavLink to="/admin">Admin</NavLink>
            </Button>
          </ListItem>
        )}
      </Flex>
    </List>
  );

  const AuthButtons = () => (
    <List>
      <Flex direction={{ base: "column", md: "row" }} gap={2}>
        <ListItem>
          <Button colorScheme="cyan" variant="solid" bg="cyan.600" width="100%">
            <NavLink to="/auth">Login</NavLink>
          </Button>
        </ListItem>
        <ListItem>
          <Button colorScheme="cyan" variant="solid" bg="cyan.600" width="100%">
            <NavLink to="/register">Register</NavLink>
          </Button>
        </ListItem>
      </Flex>
    </List>
  );

  return (
    <Box bg="gray.800" borderBottom="1px" borderColor="gray.700">
      <Flex
        padding={{ base: "8px", md: "10px" }}
        wrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: 1, md: 2 }}
        mx="auto"
        maxW={{ base: "container.xl", xl: "100%", "2xl": "100%" }}
        px={{ base: 4, md: 6, lg: 8, xl: 12, "2xl": 16 }}
      >
        {/* Logo and Title Section */}
        <Flex alignItems="center" marginRight={{ base: 2, md: 4 }}>
          <Link to="/">
            <Box
              w={{ base: "50px", md: "60px" }}
              h={{ base: "50px", md: "60px" }}
              bg="cyan.600"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginRight={{ base: 1, md: 2 }}
            >
              <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="white">
                🎹
              </Text>
            </Box>
          </Link>
          <Show above="sm">
            <Link to="/">
              <Text
                as="b"
                color="cyan.400"
                fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
              >
                Piano Lessons
              </Text>
            </Link>
          </Show>
        </Flex>

        {/* Navigation Section */}
        <Show above="md">
          <NavLinks />
        </Show>

        {/* User Section and Mobile Menu */}
        <Flex alignItems="center" gap={{ base: 2, md: 4 }} flex={1} justifyContent="flex-end">
          {/* Mobile Menu */}
          <Show below="md">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                color="white"
                size={{ base: "sm", sm: "md" }}
                _hover={{ bg: "gray.700" }}
              />
              <MenuList bg="gray.800" borderColor="gray.600" minW={{ base: "200px", sm: "250px" }}>
                <NavLinks />
                {!user?._id && <AuthButtons />}
              </MenuList>
            </Menu>
          </Show>

          {/* Desktop Auth/User Section */}
          <Show above="md">{!user?._id && <AuthButtons />}</Show>

          {user?._id && (
            <Flex alignItems="center" gap={{ base: 1, md: 2 }}>
              <Show above="lg">
                <Text color="white" fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                  Welcome, {getFirstName(user.name)}
                </Text>
              </Show>
              <Menu>
                <MenuButton>
                  <Avatar name={user.name} size={{ base: "sm", md: "md" }} />
                </MenuButton>
                <MenuList bg="gray.800" borderColor="gray.600" minW={{ base: "180px", md: "200px" }}>
                  {ListOfActions.map((action) => (
                    <MenuItem
                      key={action.value}
                      bg="gray.800"
                      _hover={{ bg: "gray.700" }}
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      <NavLink to={action.value}>{action.label}</NavLink>
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={handleLogout}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Text>Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default MainNavBar;
