import React from "react";
import { Input, Button } from "antd";

const { TextArea } = Input;

export default function TextBox() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>User Information</label>
      <TextArea
        name="userInfo"
        defaultValue="Enter your information here"
        rows={4}
      />
      <Button type="primary">Save</Button>
    </form>
  );
}
