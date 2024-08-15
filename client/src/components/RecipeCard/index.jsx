import React from "react";
import { Card } from "antd";
import LikeButton from "../Likebutton";
import DislikeButton from "../DislikeButton";

const { Meta } = Card;

const RecipeCard = ({ title, imageURL, cuisineType }) => (
  <div style={{ padding: "10px" }}>
    <Card
      hoverable
      cover={<img alt={title} src={imageURL} />}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        margin: "0px 10px",
      }}
    >
      <Meta title={title} description={cuisineType.join(", ")} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <LikeButton />
        <DislikeButton />
      </div>
    </Card>
  </div>
);

export default RecipeCard;
