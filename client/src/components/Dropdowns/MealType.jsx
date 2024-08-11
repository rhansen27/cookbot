import React from "react";
import { Select, Space } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const MealType = () => (
  <Space wrap>
    <Select
      defaultValue="Meal Type"
      style={{
        width: 150,
        marginTop: 10,
      }}
      onChange={handleChange}
      options={[
        {
          value: "Breakfast",
          label: "Breakfast",
        },
        {
          value: "Lunch",
          label: "Lunch",
        },
        {
          value: "Dinner",
          label: "Dinner",
        },
        {
          value: "Snack",
          label: "Snack",
        },
        {
          value: "Teatime",
          label: "Teatime",
        },
      ]}
    />
  </Space>
);
export default MealType;
