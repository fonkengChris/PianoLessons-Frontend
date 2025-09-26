import Category from "../entities/Category";

// Default categories data - this can be used as initial data while the API loads
const categories: Category[] = [
  {
    id: "1",
    name: "Classical",
    description: "Classical piano music and techniques",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2", 
    name: "Jazz",
    description: "Jazz piano styles and improvisation",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Pop",
    description: "Popular music and contemporary piano",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Rock",
    description: "Rock piano and keyboard techniques",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Blues",
    description: "Blues piano styles and techniques",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default categories;
