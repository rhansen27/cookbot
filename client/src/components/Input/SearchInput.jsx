import React from "react";
import { Input } from "antd";

const SearchInput = ({ onChange }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <Input
      style={{
        width: 130,
        marginTop: 10,
      }}
      placeholder="Type Ingredient"
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;
