import React, { useState } from "react";
import { Input, Button } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_BIO } from "../../utils/mutations";

const { TextArea } = Input;

export default function UserBio(props) {
  const [bio, setBio] = useState(props.bio || "");

  const [updateUserBio] = useMutation(UPDATE_USER_BIO);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(bio);
    updateUserBio({
      variables: { bio },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{fontSize: '1.5rem'}}>User Information</label>
      <TextArea
        style={{backgroundColor: '#F1DEC6'}}
        name="userInfo"
        defaultValue={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={4}
      />
      <button className="submit-button" type="submit">Save</button>
    </form>
  );
}
