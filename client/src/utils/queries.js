import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;

export const GET_RECIPE_FROM_AI = gql`
  query GetRecipeFromAi($ingredients: String!) {
    getRecipeFromAi(ingredients: $ingredients) {
        content
    }
  }
`

export const GET_FILTERED_RECIPES = gql`
  query GetFilteredRecipes($cuisineType: String, $mealType: String, $diet: String, $health: String) {
    getFilteredRecipes(cuisineType: $cuisineType, mealType: $mealType, diet: $diet, health: $health) {
      label
      image
      instructions
      ingredients {
        text
        quantity
        measure
        food
        weight
      }
    }
  }
`;
