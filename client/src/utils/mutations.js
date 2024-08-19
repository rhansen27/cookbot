import { gql } from '@apollo/client';

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

export const ADD_RECIPE = gql`
  mutation addRecipe($title: String!, $ingredients: [IngredientAmountInput]!, $description: String!, $filter: [String]!, $createdBy: ID!) {
    addUserRecipe(title: $title, ingredients: $ingredients, description: $description, filter: $filter, createdBy: $createdBy) {
      _id
      createdBy {
        _id
        name
      }
      description
      ingredients {
        ingredient
        amount
      }
      filter
      title
    }
  }
`