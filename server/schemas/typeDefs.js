const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Ingredient {
    _id: ID!
    name: String!
    userId: [ID]
    allergies: [String]!
  }

  type IngredientInRecipe {
    ingredientId: ID!
    quantity: String!
  }

  type Recipe {
    _id: ID!
    title: String!
    ingredients: [IngredientInRecipe]!
    instructions: [String]!
    cuisineType: [String]
    dietType: [String]
    createdBy: User
    imageURL: String
    aiGenerated: Boolean
    likes: [User]!
    dislikes: [User]!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User

    ingredients: [Ingredient]!
    ingredient(ingredientId: ID!): Ingredient

    recipes: [Recipe]!
    recipe(recipeId: ID!): Recipe
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeUser: User    
  }
`;

module.exports = typeDefs;
