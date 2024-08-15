import React, { useState } from "react";
import { Button, Space, Card, Row, Col } from "antd";
import { useLazyQuery } from "@apollo/client";
import MealType from "../Dropdowns/MealType";
import Health from "../Dropdowns/Health";
import Diet from "../Dropdowns/Diet";
import CuisineType from "../Dropdowns/CuisineType";
import SearchInput from "../Input/SearchInput";
import { GET_FILTERED_RECIPES } from "../../utils/queries";

const Filter = () => {
  const [cuisineType, setCuisineType] = useState("");
  const [mealType, setMealType] = useState("");
  const [diet, setDiet] = useState("");
  const [health, setHealth] = useState("");
  const [query, setQuery] = useState("")

  const [getFilteredRecipes, { loading, error, data }] = useLazyQuery(GET_FILTERED_RECIPES); 
  
  const handleSearch = () => {
    getFilteredRecipes({ variables: { cuisineType, mealType, diet, health, query } });
  };

  React.useEffect(() => {
    if (data) {
      console.log('Fetched data:', data);
    }
  }, [data]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space direction="horizontal" size="middle" wrap>
        <MealType onChange={setMealType} />
        <Diet onChange={setDiet} />
        <Health onChange={setHealth} />
        <CuisineType onChange={setCuisineType} />
        <SearchInput onChange={setQuery}/>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleSearch} type="primary">Find My Recipe</Button>
      </div>
      {data && data.getFilteredRecipes && (
        <Row gutter={[10, 10]}>
          {data.getFilteredRecipes.map((recipe, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={<img alt={recipe.label} src={recipe.image} style={{ height: '150px', objectFit: 'cover' }} />}
              >
                <Card.Meta
                  title={recipe.label}
                  description={
                    <>
                      <div>
                        {recipe.ingredients.map((ingredient, idx) => (
                          <div key={idx}>
                            <strong>
                            {ingredient.quantity > 0 ? `${ingredient.quantity.toFixed(1)} ${ingredient.measure !== "<unit>" ? ingredient.measure : ""} ` : ""}
                            {ingredient.food}
                            </strong>
                          </div>
                        ))}
                        <a style={{color: 'blue'}} href={recipe.url} target="_blank" rel="noopener noreferrer"><strong>Read More...</strong></a>
                      </div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Space>
  );
};

export default Filter;
