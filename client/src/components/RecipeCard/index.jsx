import React from "react";
import { Card, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import LikeButton from "../Likebutton";
import DislikeButton from "../DislikeButton";
import Auth from "../../utils/auth";
import { REMOVE_RECIPE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { GET_RECIPES_BY_USERID } from "../../utils/queries";

const { Meta } = Card;


const RecipeCard = ({
  title,
  imageURL,
  createdBy,
  recipeId,
  likes,
  dislikes,
  refetchRecipes,
  userId,
}) => {

  // random colors add more!!!
  const colors = ["#F3C5C5", "#C1A3A3", "#7F78D2", "#364547", "#E3C878", "#F6FDC3", "#293462", "#EEEEEE", "#D195F9", "#1D5B79", "#FFEFEF", "#C24B39"];
  // function will give you random colors
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  // console.log(recipeId)
  let location = useLocation();
  const [removeRecipe] = useMutation(REMOVE_RECIPE)
  function deleteRecipe(recipeId){
    removeRecipe({
      variables: { recipeId }, refetchQueries: [GET_RECIPES_BY_USERID, "getRecipesByUserId"]
    })
  }
// for merge
  const shouldShowDeleteButton = Auth.loggedIn() && Auth.getProfile().data._id === userId && location.pathname === "/me";
  return (
  <div style={{ padding: "10px" }}>
    <Card
      hoverable
      cover={<img alt={title} src={imageURL} />}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        margin: "0px 10px",
        backgroundColor: getRandomColor(),
        marginBottom: '1.5rem'
      }}
    >
      <Meta title={title} description={`Created by: ${createdBy.name}`} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <LikeButton recipeId={recipeId} likes={likes} dislikes={dislikes} />
        <DislikeButton recipeId={recipeId} likes={likes} dislikes={dislikes} />
      </div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>

        <Link to={`/Recipe/${recipeId}`}>
          <Button type="primary">View Recipe</Button>
        </Link>
        {shouldShowDeleteButton && (
          <Button danger style={{ marginTop: "10px" }} onClick={() => deleteRecipe(recipeId)}>
            Delete Recipe
          </Button>
        )}
      </div>
    </Card>
  </div>
)
};

export default RecipeCard;
