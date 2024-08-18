import { useQuery } from "@apollo/client";
import { Carousel } from "antd";
import RecipeCard from "../RecipeCard";
import { GET_RECIPES } from "../../utils/queries";

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

const RecipeCarousel = () => {
  const { loading, error, data, refetch } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes</p>;

  const recipes = data?.recipes || [];

  return (
    <Carousel {...carouselSettings}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          title={recipe.title}
          imageURL={recipe.imageURL}
          createdBy={recipe.createdBy.name}
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
