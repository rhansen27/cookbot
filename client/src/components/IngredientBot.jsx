import React, { useState } from "react";
import { Input, Button } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_RECIPE_FROM_AI } from "../utils/queries";
const { TextArea } = Input;

const IngredientBot = () => {
  const [ingredients, setIngredients] = useState("");

  const [recipe, setRecipe] = useState(null);

  const [getRecipeFromAi, { loading, error }] = useLazyQuery(
    GET_RECIPE_FROM_AI,
    {
      onCompleted: (data) => {
        const content = data.getRecipeFromAi.content;
        const [title, description, ...steps] = content
          .split("\n")
          .filter(Boolean);
        setRecipe({
          title,
          description,
          steps,
        });
      },
    }
  );

  const handleFetchRecipes = async () => {
    if (ingredients.trim()) {
      const response = await getRecipeFromAi({ variables: { ingredients } });
      console.log(response);
    }
  };

  return (
    <>
      <div className="ai-container">
        <TextArea
          className="ai-textarea"
          rows={5}
          placeholder="Enter your ingredients here, separated by commas"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleFetchRecipes}
          className="ai-button"
          disabled={loading}
        >
          Find Recipes
        </Button>
        {error && <p>Error: {error.message}</p>}
        {recipe && (
          <div className="ai-div">
            <h2 className="ai-h2">{recipe.title}</h2>
            <p className="ai-paragraph">{recipe.description}</p>
            <ul className="ai-steps">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default IngredientBot;
