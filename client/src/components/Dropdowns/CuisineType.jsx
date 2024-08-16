import React from "react";
import { Select, Space } from "antd";

const CuisineType = ({ onChange }) => {
  const handleChange = (value) => {
    onChange(value)
  };
  return (
    <Space wrap>
      <Select
        defaultValue="Cuisine Type"
        style={{
          width: 130,
          marginTop: 10,
        }}
        onChange={handleChange}
        options={[
          {
            value: "Italian",
            label: "Italian",
          },
          {
            value: "Mexican",
            label: "Mexican",
          },
          {
            value: "Chinese",
            label: "Chinese",
          },
          {
            value: "Indian",
            label: "Indian",
          },
          {
            value: "Mediterranean",
            label: "Mediterranean",
          },
          {
            value: "Japanese",
            label: "Japanese",
          },
          {
            value: "American",
            label: "American",
          },
          {
            value: "Middle Eastern",
            label: "Middle Eastern",
          },
          {
            value: "French",
            label: "French",
          },
        ]}
      />
    </Space>
  );
}
export default CuisineType;
