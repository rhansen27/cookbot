import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

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

export const getRecipes = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  return {
    loading,
    error,
    recipes: data ? data.recipes : [],
  };
};
