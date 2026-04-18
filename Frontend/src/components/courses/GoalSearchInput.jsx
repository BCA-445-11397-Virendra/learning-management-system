import React, { useState } from "react";
import Select from "react-select";



const GoalSearchInput = ({examGoals}) => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "42px",
      borderRadius: "12px",
      paddingLeft: "6px",
      boxShadow: "none",
      border: "1px solid #e5e7eb",
      "&:hover": {
        borderColor: "#22c55e",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "15px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#dcfce7" : "#fff",
      color: "#111827",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "12px",
      overflow: "hidden",
    }),
  };

  const handleChange = (goal) => {
    setSelectedGoal(goal);
    console.log("Selected Goal:", goal);
    // navigate(`/courses/${goal.value}`) // later
  };

  return (
    <div className="w-full max-w-md">
      <Select
        value={selectedGoal}
        onChange={handleChange}
        options={examGoals}
        placeholder="Search your goal (UPSC, GATE, SSC...)"
        styles={customStyles}
        isSearchable
      />
    </div>
  );
};

export default GoalSearchInput;
