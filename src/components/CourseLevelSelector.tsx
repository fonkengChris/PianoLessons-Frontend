import { Select } from "@chakra-ui/react";
import { useState } from "react";

const CourseLevelSelector = () => {
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
    // TODO: Implement filtering logic
  };

  return (
    <Select
      placeholder="All Levels"
      value={selectedLevel}
      onChange={handleLevelChange}
      bg="gray.700"
      color="white"
      borderColor="gray.600"
      _placeholder={{ color: "gray.400" }}
      _hover={{ borderColor: "gray.500" }}
      _focus={{ borderColor: "blue.500", boxShadow: "none" }}
    >
      <option
        value="Beginner"
        style={{ backgroundColor: "#2D3748", color: "white" }}
      >
        Beginner
      </option>
      <option
        value="Intermediate"
        style={{ backgroundColor: "#2D3748", color: "white" }}
      >
        Intermediate
      </option>
      <option
        value="Advanced"
        style={{ backgroundColor: "#2D3748", color: "white" }}
      >
        Advanced
      </option>
    </Select>
  );
};

export default CourseLevelSelector;
