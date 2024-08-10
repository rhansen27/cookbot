import React from "react";
import { Select, Space } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const Region = () => (
  <Space wrap>
    <Select
      defaultValue="Region"
      style={{
        width: 120,
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
          value: "Thai",
          label: "Thai",
        },
        {
          value: "Greek",
          label: "Greek",
        },
        {
          value: "American",
          label: "American",
        },
        {
          value: "Korean",
          label: "Korean",
        },
        {
          value: "Vietnamese",
          label: "Vietnamese",
        },
      ]}
    />
  </Space>
);
export default Region;
