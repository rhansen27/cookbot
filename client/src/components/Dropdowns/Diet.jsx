import React from "react";
import { Select, Space } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const Diet = () => (
  <Space wrap>
    <Select
      defaultValue="Diet"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: "Vegetarian",
          label: "Vegetarian",
        },
        {
          value: "Vegan",
          label: "Vegan",
        },
        {
          value: "Keto",
          label: "Keto",
        },
        {
          value: "Low Carb",
          label: "Low Carb",
        },
        {
          value: "Low Fat",
          label: "Low Fat",
        },
        {
          value: "Gluten-Free",
          label: "Gluten-Free",
        },
        {
          value: "Dairy-Free",
          label: "Dairy-Free",
        },
        {
          value: "Paleo",
          label: "Paleo",
        },
      ]}
    />
  </Space>
);
export default Diet;
