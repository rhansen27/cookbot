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
        width: 150,
        marginTop: 10,
      }}
      onChange={handleChange}
      options={[
        {
          value: "dairy-free",
          label: "Dairy-Free",
        },
        {
          value: "gluten-free",
          label: "Gluten-Free",
        },
        {
          value: "peanut-free",
          label: "Peanut-Free",
        },
        {
          value: "tree-nut-free",
          label: "Tree-Nut-Free",
        },
        {
          value: "shellfish-free",
          label: "Shellfish-Free",
        },
        {
          value: "soy-free",
          label: "Soy-Free",
        },
        {
          value: "pork-free",
          label: "Pork-free",
        },
      ]}
    />
  </Space>
);
export default Allergy;
