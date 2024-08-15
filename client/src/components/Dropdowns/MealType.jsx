import React from "react";
import { Select, Space } from "antd";

const MealType = ({ onChange }) => {
  const handleChange = (value) => {
    onChange(value)
  };
  return(
    <Space wrap>
    <Select
      defaultValue="Meal Type"
      style={{
        width: 130,
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
  )
};
export default MealType;
