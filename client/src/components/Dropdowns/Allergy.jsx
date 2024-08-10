import React from "react";
import { Select, Space } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const Allergy = () => (
  <Space wrap>
    <Select
      defaultValue="Allergy"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: "Dairy",
          label: "Dairy",
        },
        {
          value: "Gluten",
          label: "Gluten",
        },
        {
          value: "Peanuts",
          label: "Peanuts",
        },
        {
          value: "Tree Nuts",
          label: "Tree Nuts",
        },
        {
          value: "Shellfish",
          label: "Shellfish",
        },
        {
          value: "Soy",
          label: "Soy",
        },
        {
          value: "Wheat",
          label: "Wheat",
        },
      ]}
    />
  </Space>
);
export default Allergy;
