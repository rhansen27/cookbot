import React from "react";
import { Select, Space } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const CuiseneType = () => (
  <Space wrap>
    <Select
      defaultValue="Cuisine Type"
      style={{
        width: 150,
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
export default CuiseneType;
