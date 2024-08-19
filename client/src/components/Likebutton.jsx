import React from "react";
import { Avatar, Badge, Space } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_RECIPE, QUERY_ME } from "../utils/queries";
import { UPDATE_RECIPE } from "../utils/mutations";
import likeIcon from "../assets/app-icons/like.png";

const LikeButton = ({ recipeId }) => {
  const { data: userData } = useQuery(QUERY_ME);
  const { data: recipeData } = useQuery(GET_RECIPE, {
    variables: { recipeId },
  });

  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  const userId = userData?.me?._id;
  const recipe = recipeData?.recipe;
  const likes = recipe?.likes || [];
  const dislikes = recipe?.dislikes || [];

  const handleBadgeClick = async () => {
    const isLiked = likes.some((like) => like._id === userId);

    const updatedLikes = isLiked
      ? likes.filter((like) => like._id !== userId)
      : [...likes, { _id: userId, name: userData?.me?.name }];

    const updatedDislikes = dislikes.filter(
      (dislike) => dislike._id !== userId
    );

    try {
      await updateRecipe({
        variables: {
          recipeId,
          likes: updatedLikes.map((like) => like._id),
          dislikes: updatedDislikes.map((dislike) => dislike._id),
        },
      });
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <Space direction="vertical">
      <Space size="large">
        <Badge
          count={likes.length}
          onClick={handleBadgeClick}
          style={{ cursor: "pointer" }}
        >
          <Avatar shape="square" size="large" src={likeIcon} />
        </Badge>
      </Space>
    </Space>
  );
};

export default LikeButton;
