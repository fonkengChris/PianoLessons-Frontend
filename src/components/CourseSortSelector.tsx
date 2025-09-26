import { Select } from "@chakra-ui/react";
import { useState } from "react";

const CourseSortSelector = () => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    // TODO: Implement sorting logic
  };

  return (
    <Select
      placeholder="Sort by"
      value={sortBy}
      onChange={handleSortChange}
      bg="gray.700"
      color="white"
      borderColor="gray.600"
      _placeholder={{ color: "gray.400" }}
      _hover={{ borderColor: "gray.500" }}
      _focus={{ borderColor: "blue.500", boxShadow: "none" }}
    >
      <option value="title" style={{ backgroundColor: "#2D3748", color: "white" }}>
        Title A-Z
      </option>
      <option value="title-desc" style={{ backgroundColor: "#2D3748", color: "white" }}>
        Title Z-A
      </option>
      <option value="level" style={{ backgroundColor: "#2D3748", color: "white" }}>
        Level
      </option>
      <option value="duration" style={{ backgroundColor: "#2D3748", color: "white" }}>
        Duration
      </option>
      <option value="price" style={{ backgroundColor: "#2D3748", color: "white" }}>
        Price
      </option>
      <option value="lessons" style={{ backgroundColor: "#2D3748", color: "white" }}>
        Number of Lessons
      </option>
    </Select>
  );
};

export default CourseSortSelector; 