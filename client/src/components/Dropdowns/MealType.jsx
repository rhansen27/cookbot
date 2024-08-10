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
        width: 120,
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
          value: "Appetizer",
          label: "Appetizer",
        },
        {
          value: "Main Course",
          label: "Main Course",
        },
        {
          value: "Side Dish",
          label: "Side Dish",
        },
      ]}
    />
  </Space>
);
export default MealType;
