import React from "react";
import { Input, Button } from "antd";

const { TextArea } = Input;

export default function TextBox() {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = e.target.elements.userInfo.value;
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>User Information</label>
      <TextArea
        name="userInfo"
        defaultValue="Enter your information here"
        rows={4}
      />
      <button type="submit">Save</button>
    </form>
  );
}
