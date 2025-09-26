import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

const CourseSearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (ref.current) {
      setSearchText(ref.current.value);
      // TODO: Implement course search functionality
      console.log("Searching for courses:", ref.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search courses..."
          variant="filled"
          height="50px"
          minH="50px"
          bg="gray.700"
          borderColor="gray.600"
          color="white"
          _placeholder={{ color: "gray.400" }}
          _hover={{ borderColor: "gray.500" }}
          _focus={{ borderColor: "blue.500", boxShadow: "none" }}
        />
      </InputGroup>
    </form>
  );
};

export default CourseSearchInput;
