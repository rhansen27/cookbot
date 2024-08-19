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

export const UPDATE_USER_BIO = gql`
  mutation updateUserBio($bio: String!) {
    updateUserBio(bio: $bio) {
      _id
      name
      bio
    }
  }
`;
