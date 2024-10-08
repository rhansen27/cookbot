import React from "react";
import { Select, Space } from "antd";

const Diet = ({ onChange }) => {
  const handleChange = (value) => {
    onChange(value)
  };
  return(
    <Space wrap>
      <Select
        defaultValue="Diet"
        style={{
          width: 130,
          marginTop: 10,
        }}
        onChange={handleChange}
        options={[
          {
            value: "high-protein",
            label: "High-Protein",
          },
          {
            value: "high-fiber",
            label: "High-Fiber",
          },
          {
            value: "balanced",
            label: "Balanced",
          },
          {
            value: "low-carb",
            label: "Low-Carb",
          },
          {
            value: "low-fat",
            label: "Low-Fat",
          },
          {
            value: "low-sodium",
            label: "Low-Sodium",
          },
        ]}
      />
    </Space>)
};
export default Diet;
