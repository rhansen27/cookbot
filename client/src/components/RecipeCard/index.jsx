import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import LikeButton from "../Likebutton";
import DislikeButton from "../DislikeButton";

const { Meta } = Card;

const RecipeCard = ({
  title,
  imageURL,
  createdBy,
  recipeId,
  likes,
  dislikes,
  refetchRecipes,
}) => (
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
      <Meta title={title} description={`Created by: ${createdBy}`} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <LikeButton
          recipeId={recipeId}
          likes={likes}
          dislikes={dislikes}
          refetchRecipes={refetchRecipes}
        />
        <DislikeButton
          recipeId={recipeId}
          likes={likes}
          dislikes={dislikes}
          refetchRecipes={refetchRecipes}
        />
      </div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Link to={`/Recipe/${recipeId}`}>
          <Button type="primary">View Recipe</Button>
        </Link>
      </div>
    </Card>
  </div>
);

export default RecipeCard;
