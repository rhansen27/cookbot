import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "../utils/queries";
import LikeButton from "../components/Likebutton";
import DislikeButton from "../components/DislikeButton";

const RecipeDetailPage = () => {
  const { id: recipeId } = useParams();

  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { recipeId },
    skip: !recipeId,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipe</p>;
  if (!data || !data.recipe) return <p>Recipe not found</p>;

  const recipe = data.recipe;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <h2>Created by: {recipe.createdBy?.name || "Unknown"}</h2>
      <LikeButton recipeId={recipeId} />
      <DislikeButton recipeId={recipeId} />
      {recipe.imageURL && <img src={recipe.imageURL} alt={recipe.title} />}
      <h3>Diet Type(s):</h3>
      <p>{recipe.dietType?.length ? recipe.dietType.join(", ") : "None"}</p>
      <h3>Cuisine Type(s):</h3>
      <p>
        {recipe.cuisineType?.length ? recipe.cuisineType.join(", ") : "None"}
      </p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients?.length ? (
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} of{" "}
              {ingredient.ingredient?.name || "Unknown"}
            </li>
          ))
        ) : (
          <li>No ingredients listed.</li>
        )}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {recipe.instructions?.length ? (
          recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))
        ) : (
          <li>No instructions provided.</li>
        )}
      </ol>
    </div>
  );
};

export default RecipeDetailPage;
