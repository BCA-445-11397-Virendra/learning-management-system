import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  { id: "next.js", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      handleFilterChange(updated, sortByPrice);
      return updated;
    });
  };

  const selectByPriceHandler = (value) => {
    setSortByPrice(value);
    handleFilterChange(selectedCategories, value);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl md:text-lg">Filter Options</h1>

        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      <h1 className="font-semibold mb-2">CATEGORY</h1>

      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2 my-2">
          <Checkbox
            id={category.id}
            checked={selectedCategories.includes(category.id)} 
            onCheckedChange={() => handleCategoryChange(category.id)}
          />
          <Label>{category.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default Filter;