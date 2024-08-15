import React, { useState, useEffect } from "react";
import { Carousel, Card, Button } from "antd";
import LikeButton from "../Likebutton";
import DislikeButton from "../DislikeButton";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";

const { Meta } = Card;

const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      _id
      title
      imageURL
      cuisineType
    }
  }
`;

const RecipeCarousel = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (data && data.recipes) {
      setRecipes(data.recipes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes</p>;

  return (
    <Carousel
      dots={true}
      slidesToShow={4}
      slidesToScroll={1}
      infinite={true}
      arrows={true}
      responsive={[
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ]}
    >
      {recipes.map((recipe, index) => (
        <div key={index} style={{ padding: "10px" }}>
          <Card
            hoverable
            cover={<img alt={recipe.title} src={recipe.imageURL} />}
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              margin: "0px 10px",
            }}
          >
            <Meta
              title={recipe.title}
              description={recipe.cuisineType.join(", ")}
            />
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
      ))}
    </Carousel>
  );
};

export default RecipeCarousel;
