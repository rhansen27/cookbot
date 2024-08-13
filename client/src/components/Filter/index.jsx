import React, { useState } from "react";
import { Button, Space, Card } from "antd";
import { useLazyQuery } from "@apollo/client";
import MealType from "../Dropdowns/MealType";
import Health from "../Dropdowns/Health";
import Diet from "../Dropdowns/Diet";
import CuisineType from "../Dropdowns/CuisineType";
import { GET_FILTERED_RECIPES } from "../../utils/queries";


const Filter = () => {
  const [cuisineType, setCuisineType] = useState("");
  const [mealType, setMealType] = useState("");
  const [diet, setDiet] = useState("");
  const [health, setHealth] = useState("");

  const [getFilteredRecipes, { loading, error, data }] = useLazyQuery(GET_FILTERED_RECIPES); 
  
  const handleSearch = () => {
    getFilteredRecipes({ variables: { cuisineType, mealType, diet, health } });
  };
  React.useEffect(() => {
    if (data) {
      console.log('Fetched data:', data);
    }
  }, [data]);
  return (
    <Space direction="vertical">
      <MealType onChange={setMealType} />
      <Diet onChange={setDiet} />
      <Health onChange={setHealth} />
      <CuisineType onChange={setCuisineType} />
      <Button onClick={handleSearch} type="primary">Find My Recipe</Button>
      {data && data.getFilteredRecipes && (
        <div>
          {data.getFilteredRecipes.map((recipe, index) => (
            <Card
              key={index}
              hoverable
              cover={<img alt={recipe.label} src={recipe.image} />}
            >
              <Card.Meta
                title={recipe.label}
                description={
                  <>
                    <div>
                      {recipe.ingredients.map((ingredient, idx) => (
                        <div key={idx}>
                          {ingredient.quantity > 0 ? `${ingredient.quantity.toFixed(1)} ${ingredient.measure || ""} ` : ""}
                          {ingredient.measure !== "<unit>" ? ingredient.measure : ""}{" "}
                          {ingredient.food}
                        </div>
                      ))}
                    </div>
                    <div>{recipe.instructions}</div>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </Space>
  );
};

export default Filter;
