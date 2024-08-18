import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe($recipeId: ID!, $likes: [ID]!, $dislikes: [ID]!) {
    updateRecipe(recipeId: $recipeId, likes: $likes, dislikes: $dislikes) {
      _id
      title
      likes {
        _id
        name
      }
      dislikes {
        _id
        name
      }
    }
  }
`;
