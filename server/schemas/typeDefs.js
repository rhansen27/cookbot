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
  
  type IngredientFilter {
    text: String
    quantity: Float
    measure: String
    food: String
    weight: Float
  }

  type RecipeFilter {
    _id: ID!
    label: String
    image: String
    url: String
    ingredients: [IngredientFilter]
  }

  type OpenAiResponseChoiceMessage {
    content: String
  }

  type OpenAiResponseChoice {
    message: OpenAiResponseChoiceMessage
  }

  type OpenAiResponse {
    content: String
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
    ingredient: Ingredient
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
    me: User
    getRecipeFromAi(ingredients: String!): OpenAiResponse
    getFilteredRecipes(
      cuisineType: String
      mealType: String
      diet: String
      health: String
      query: String): [RecipeFilter]

    ingredients: [Ingredient]!
    ingredient(ingredientId: ID!): Ingredient

    recipes: [Recipe]!
    recipe(recipeId: ID!): Recipe
  }
  
  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    
    login(email: String!, password: String!): Auth

    removeUser: User

    addIngredient(name: String!, userId: [ID], allergies: [String]!): Ingredient

    addRecipe(
      title: String!
      ingredients: [IngredientInRecipeInput]!
      instructions: [String]!
      cuisineType: [String]
      dietType: [String]
      createdBy: ID!
      imageURL: String
      aiGenerated: Boolean
    ): Recipe

    removeIngredient(ingredientId: ID!): Ingredient

    removeRecipe(recipeId: ID!): Recipe

    updateRecipe(recipeId: ID!, likes: [ID]!, dislikes: [ID]!): Recipe

  }

  input IngredientInRecipeInput {
    ingredientId: ID!
    quantity: String!
  }
`;

module.exports = typeDefs;
