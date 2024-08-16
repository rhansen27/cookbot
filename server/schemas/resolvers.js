
require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { User, Ingredient, Recipe } = require("../models");
const { signToken, AuthenticationError } = require('../utils/auth');
// const {OpenAI} = require('openai')
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })


const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // getRecipeFromAi: async (parent, {ingredients}) => {
    //   const response = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //         {
    //         role: 'system',
    //         content: 'You are a recipe expert.You will recieve ingredients and based on those information.You will find a recipe.In the response i want to see the title, description and steps to make that recipe.'
    //       },
    //       {
    //         role: 'user',
    //         content: `Ingredients: ${ingredients}`
    //       }
    //     ],
    //     temperature: 0.7,
    //     max_tokens: 350,
    //     top_p: 1
    // })

    // console.log(response.choices[0].message)
    // return response.choices[0].message
    // }

    // ingredients: async () => {
    //   return Ingredient.find();
    // },

    // ingredient: async (parent, { ingredientId }) => {
    //   return Ingredient.findOne({ _id: ingredientId });
    // },
    },

    // getFilteredRecipes: async (parent, { cuisineType, mealType, diet, health }) => {
    //   const app_id = process.env.RECIPE_APP_ID_KEY
    //   const app_key = process.env.RECIPE_API_KEY

    //   let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}`

    //   if (cuisineType) url += `&cuisineType=${cuisineType}`;
    //   if (mealType) url += `&mealType=${mealType}`;
    //   if (diet) url += `&diet=${diet}`;
    //   if (health) url += `&health=${health}`;

    //   try {
    //     const response = await fetch(url)
    //     const data = await response.json()
    //     console.log(url)
    //     console.log(data)
    //     return data
    //   } catch (error) {
    //     throw new Error('Failed to fetch recipes')
    //   }
    // }

    // recipes: async () => {
    //   return Recipe.find();
    // },

    // recipe: async (parent, { recipeId }) => {
    //   return Recipe.findOne({ _id: recipeId });
    // },

  // },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    // Set up mutation so a logged in user can only remove their user and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    addIngredient: async (parent, { name, userId, allergies }) => {
      const ingredient = new Ingredient({ name, userId, allergies });
      await ingredient.save();
      return ingredient;
    },

    addRecipe: async (
      parent,
      {
        title,
        ingredients,
        instructions,
        cuisineType,
        dietType,
        createdBy,
        imageURL,
        aiGenerated,
      }
    ) => {
      const recipe = new Recipe({
        title,
        ingredients,
        instructions,
        cuisineType,
        dietType,
        createdBy,
        imageURL,
        aiGenerated,
      });
      await recipe.save();
      return recipe;
    },

    removeIngredient: async (parent, { ingredientId }) => {
      return Ingredient.findOneAndDelete({ _id: ingredientId });
    },

    removeRecipe: async (parent, { recipeId }) => {
      return Recipe.findOneAndDelete({ _id: recipeId });
    },
  },
};

module.exports = resolvers;
