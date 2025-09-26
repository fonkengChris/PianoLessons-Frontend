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
        padding="10px"
        wrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        mx="auto"
      >
        {/* Logo and Title Section */}
        <Flex alignItems="center" marginRight={4}>
          <Link to="/">
            <Box
              w="60px"
              h="60px"
              bg="cyan.600"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginRight={2}
            >
              <Text fontSize="2xl" fontWeight="bold" color="white">
                🎹
              </Text>
            </Box>
          </Link>
          <Show above="sm">
            <Link to="/">
              <Text
                as="b"
                color="cyan.400"
                fontSize={{ base: "2xl", md: "4xl" }}
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
        <Flex alignItems="center" gap={4} flex={1} justifyContent="flex-end">
          {/* Mobile Menu */}
          <Show below="md">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                color="white"
                _hover={{ bg: "gray.700" }}
              />
              <MenuList bg="gray.800" borderColor="gray.600">
                <NavLinks />
                {!user?._id && <AuthButtons />}
              </MenuList>
            </Menu>
          </Show>

          {/* Desktop Auth/User Section */}
          <Show above="md">{!user?._id && <AuthButtons />}</Show>

          {user?._id && (
            <Flex alignItems="center" gap={2}>
              <Show above="md">
                <Text color="white" fontWeight="medium">
                  Welcome, {getFirstName(user.name)}
                </Text>
              </Show>
              <Menu>
                <MenuButton>
                  <Avatar name={user.name} size={{ base: "sm", md: "md" }} />
                </MenuButton>
                <MenuList bg="gray.800" borderColor="gray.600">
                  {ListOfActions.map((action) => (
                    <MenuItem
                      key={action.value}
                      bg="gray.800"
                      _hover={{ bg: "gray.700" }}
                    >
                      <NavLink to={action.value}>{action.label}</NavLink>
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={handleLogout}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
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
