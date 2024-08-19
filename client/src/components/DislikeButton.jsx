import React from "react";
import { Avatar, Badge, Space } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_RECIPE, QUERY_ME } from "../utils/queries";
import { UPDATE_RECIPE } from "../utils/mutations";
import dislikeIcon from "../assets/app-icons/dislike.png";

const DislikeButton = ({ recipeId }) => {
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
    const isDisliked = dislikes.some((dislike) => dislike._id === userId);

    const updatedDislikes = isDisliked
      ? dislikes.filter((dislike) => dislike._id !== userId)
      : [...dislikes, { _id: userId, name: userData?.me?.name }];

    const updatedLikes = likes.filter((like) => like._id !== userId);

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
          count={dislikes.length}
          onClick={handleBadgeClick}
          style={{ cursor: "pointer" }}
        >
          <Avatar shape="square" size="large" src={dislikeIcon} />
        </Badge>
      </Space>
    </Space>
  );
};

export default DislikeButton;
