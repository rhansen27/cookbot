import { useQuery } from "@apollo/client";
import { Carousel } from "antd";
import RecipeCard from "../RecipeCard";
import { GET_RECIPES_BY_USERID, GET_RECIPES } from "../../utils/queries";

export const getRecipes = (userId) => {
  const { loading, error, data } = useQuery(
    userId ? GET_RECIPES_BY_USERID : GET_RECIPES,
    {
      variables: { userId },
    }
  );
  return {
    loading,
    error,
    recipes: data?.recipes || data?.getRecipesByUserId || [],
  };
};

const carouselSettings = {
  dots: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,
  responsive: [
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
  ],
};

const RecipeCarousel = ({ userId }) => {
  const { loading, error, recipes } = getRecipes(userId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes</p>;

  return (
    <Carousel {...carouselSettings}>
      {recipes.map((recipe) => (
        <RecipeCard
          userId={userId}
          key={recipe._id}
          title={recipe.title}
          imageURL={recipe.imageURL}
          createdBy={recipe.createdBy}
          recipeId={recipe._id}
          likes={recipe.likes}
          dislikes={recipe.dislikes}
          refetchRecipes={refetch}
        />
      ))}
    </Carousel>
  );
};

export default RecipeCarousel;
