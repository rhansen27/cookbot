import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "../utils/queries";
import { Card, Typography, Image, List, Divider, Row, Col } from "antd";
import LikeButton from "../components/Likebutton";
import DislikeButton from "../components/DislikeButton";

const { Title, Text } = Typography;

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
    <Card className="recipe-card" style={{backgroundColor: '#EECEB9'}}>
      <Title level={2}>{recipe.title}</Title>

      <Text type="secondary">
        <Title level={3}>
          Created by: {recipe.createdBy?.name || "Unknown"}
        </Title>
      </Text>

      {recipe.imageURL && (
        <Image
          src={recipe.imageURL}
          alt={recipe.title}
          width={300}
          className="recipe-image"
        />
      )}

      <div className="like-dislike-container">
        <LikeButton recipeId={recipeId} />
        <DislikeButton recipeId={recipeId} />
      </div>

      <Divider />

      <div>
        <Title level={4}>Diet Type(s):</Title>
        <Text>
          {recipe.dietType?.length ? recipe.dietType.join(", ") : "None"}
        </Text>
      </div>

      <Divider />

      <div>
        <Title level={4}>Cuisine Type(s):</Title>
        <Text>
          {recipe.cuisineType?.length ? recipe.cuisineType.join(", ") : "None"}
        </Text>
      </div>

      <Divider />

      <div>
        <Title level={4}>Ingredients</Title>
        <List
          dataSource={recipe.ingredients}
          renderItem={(ingredient) => (
            <List.Item>
              <Text>
                {ingredient.quantity} of{" "}
                {ingredient.ingredient?.name || "Unknown"}
              </Text>
            </List.Item>
          )}
        />
      </div>

      <Divider />

      <div>
        <Title level={4}>Instructions</Title>
        <List
          dataSource={recipe.instructions}
          renderItem={(instruction, index) => (
            <List.Item>
              <Text>
                {index + 1}. {instruction}
              </Text>
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default RecipeDetailPage;
