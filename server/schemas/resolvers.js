require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { User, Ingredient, Recipe, UserRecipe } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
// const { OpenAI } = require("openai");
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const resolvers = {
  Query: {
    // User Queries
    users: async () => {
      return User.find();
    },

    getRecipesByUserId: async (parent, { userId }) => {
      return Recipe.find({ createdBy: userId }).populate("createdBy", "name");
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    me: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        console.log(context.user);
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // // AI-powered recipe generation
    // getRecipeFromAi: async (parent, { ingredients }) => {
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content:
    //           "You are a recipe expert. You will receive ingredients and based on that information, you will find a recipe. In the response, I want to see the title, description, and steps to make that recipe.",
    //       },
    //       {
    //         role: "user",
    //         content: `Ingredients: ${ingredients}`,
    //       },
    //     ],
    //     temperature: 0.7,
    //     max_tokens: 350,
    //     top_p: 1,
    //   });
    //   return response.choices[0].message;
    //   // ingredient: async (parent, { ingredientId }) => {
    //   //   return Ingredient.findOne({ _id: ingredientId });
    //   // },
    // },

    // Ingredient Queries
    ingredients: async () => {
      return Ingredient.find();
    },

    //   let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}`

    // Fetch recipes from external API with filtering options
    getFilteredRecipes: async (
      parent,
      { cuisineType, mealType, diet, health, query }
    ) => {
      const app_id = process.env.RECIPE_APP_ID_KEY;
      const app_key = process.env.RECIPE_API_KEY;

      let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}`;

      if (query) url += `&q=${query}`;
      if (cuisineType) url += `&cuisineType=${cuisineType}`;
      if (mealType) url += `&mealType=${mealType}`;
      if (diet) url += `&diet=${diet}`;
      if (health) url += `&health=${health}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const recipes = data.hits.map((hit) => {
          const recipe = hit.recipe;
          console.log(recipe);
          return {
            label: recipe.label,
            image: recipe.image,
            url: recipe.url,
            ingredients: recipe.ingredients.map((ingredient) => ({
              text: ingredient.text,
              quantity: ingredient.quantity,
              measure: ingredient.measure,
              food: ingredient.food,
              weight: ingredient.weight,
            })),
          };
        });

        return recipes;
      } catch (error) {
        throw new Error("Failed to fetch recipes");
      }
    },

    // Recipe Queries
    recipes: async () => {
      return Recipe.find()
        .populate("createdBy", "name")
        .populate({
          path: "ingredients.ingredientId",
          model: "Ingredient",
          select: "name",
          strictPopulate: false,
        })
        .populate("likes", "name")
        .populate("dislikes", "name");
    },

    recipe: async (parent, { recipeId }) => {
      return Recipe.findOne({ _id: recipeId })
        .populate("createdBy", "name")
        .populate({
          path: "ingredients.ingredientId",
          model: "Ingredient",
          select: "name",
          strictPopulate: false,
        })
        .populate("likes", "name")
        .populate("dislikes", "name");
    },
  },

  Mutation: {
    // User Mutations
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
    },

    updateUserBio: async (parent, { bio }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { bio },
          { new: true }
        );
      }
      throw AuthenticationError;
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

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // Ingredient Mutations
    addIngredient: async (parent, { name, userId, allergies }) => {
      const ingredient = new Ingredient({ name, userId, allergies });
      await ingredient.save();
      return ingredient;
    },

    removeIngredient: async (parent, { ingredientId }) => {
      return Ingredient.findOneAndDelete({ _id: ingredientId });
    },

    // Recipe Mutations
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

    addUserRecipe: async (
      parent, args,
      {
        title,
        ingredients,
        description,
        filter,
        createdBy,
      }
    ) => {
      const recipe = new UserRecipe({
        title,
        ingredients,
        filter,
        description,
        createdBy,
      });
      return (await UserRecipe.create(args)).populate('createdBy')
    },

    removeRecipe: async (parent, { recipeId }) => {
      return Recipe.findOneAndDelete({ _id: recipeId });
    },

    updateRecipe: async (parent, { recipeId, likes, dislikes }) => {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
          likes: likes,
          dislikes: dislikes,
        },
        { new: true }
      )
        .populate("createdBy", "name")
        .populate("likes", "name")
        .populate("dislikes", "name");

      if (!updatedRecipe) {
        throw new Error("Recipe not found");
      }

      return updatedRecipe;
    },
  },
};

module.exports = resolvers;
